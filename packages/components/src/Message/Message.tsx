import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
} from 'react';
import { createPortal, flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';
import {
  getGlobalThemeCSSVariables,
  subscribeGlobalThemeCSSVariables,
} from '../ConfigProvider/theme';
import './Message.scss';

// 类型定义
export type MessageType = 'success' | 'error' | 'warning' | 'info';
export type MessagePosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface MessageOptions {
  content: React.ReactNode;
  duration?: number;
  closable?: boolean;
  position?: MessagePosition;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export type MessageOpenOptions = Omit<MessageOptions, 'content'>;
export type MessageContent = React.ReactNode | MessageOptions;

export interface MessageConfigOptions {
  duration?: number;
  position?: MessagePosition;
  maxCount?: number;
}

export interface MessageInstance {
  key: string;
  type: MessageType;
  content: React.ReactNode;
  duration?: number;
  closable?: boolean;
  position: MessagePosition;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// Context
interface MessageContextType {
  addMessage: (msg: MessageInstance) => void;
  removeMessage: (key: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within MessageProvider');
  }
  return context;
};

// 单个消息项组件
interface MessageItemProps {
  message: MessageInstance;
  onClose: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onClose }) => {
  const { duration = 3000, closable = false, type = 'info', content } = message;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = (): IconProp => {
    switch (type) {
      case 'success':
        return ['fas', 'circle-check'];
      case 'error':
        return ['fas', 'circle-xmark'];
      case 'warning':
        return ['fas', 'circle-exclamation'];
      case 'info':
      default:
        return ['fas', 'circle-info'];
    }
  };

  return (
    <div
      className={[
        'cream-message__item',
        `cream-message__item--${type}`,
        message.className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={message.style}
    >
      <Icon icon={getIcon()} className="cream-message__icon" />
      <span className="cream-message__content">{content}</span>
      {closable && (
        <button
          type="button"
          className="cream-message__close"
          aria-label="关闭消息"
          onClick={onClose}
        >
          <Icon icon={['fas', 'xmark']} />
        </button>
      )}
    </div>
  );
};

// Message 容器组件
interface MessageContainerProps {
  messages: MessageInstance[];
  onRemove: (key: string) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  onRemove,
}) => {
  const cssVariables = useSyncExternalStore(
    subscribeGlobalThemeCSSVariables,
    getGlobalThemeCSSVariables,
    getGlobalThemeCSSVariables
  );

  // 按位置分组
  const positions: MessagePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  return createPortal(
    <div style={cssVariables}>
      {positions.map(position => {
        const positionMessages = messages.filter(
          msg => msg.position === position
        );
        if (positionMessages.length === 0) return null;

        return (
          <div
            key={position}
            className={`cream-message cream-message--${position}`}
          >
            {positionMessages.map(msg => (
              <MessageItem
                key={msg.key}
                message={msg}
                onClose={() => onRemove(msg.key)}
              />
            ))}
          </div>
        );
      })}
    </div>,
    document.body
  );
};

// 全局状态
let messageKey = 0;
let messageRoot: Root | null = null;
let messageRootElement: HTMLDivElement | null = null;
let messages: MessageInstance[] = [];
let setMessagesFn: ((msgs: MessageInstance[]) => void) | null = null;

// 全局配置
let globalConfig: Required<MessageConfigOptions> = {
  duration: 3000,
  position: 'top-right',
  maxCount: 5,
};

// 更新消息的函数
const updateMessages = (newMessages: MessageInstance[]) => {
  messages = newMessages;
  if (setMessagesFn) {
    flushSync(() => {
      setMessagesFn?.([...messages]);
    });
  }
};

const isMessageOptions = (
  content: MessageContent
): content is MessageOptions => {
  return (
    typeof content === 'object' &&
    content !== null &&
    !React.isValidElement(content) &&
    'content' in content
  );
};

const normalizeMessageArgs = (
  content: MessageContent,
  options?: MessageOpenOptions
): MessageOptions => {
  if (isMessageOptions(content)) {
    return {
      ...content,
      ...options,
    };
  }

  return {
    ...options,
    content,
  };
};

// 渲染容器组件
const MessageRenderContainer: React.FC = () => {
  const [localMessages, setLocalMessages] = useState<MessageInstance[]>(() => [
    ...messages,
  ]);

  useLayoutEffect(() => {
    setMessagesFn = setLocalMessages;
    setLocalMessages([...messages]);
    return () => {
      setMessagesFn = null;
    };
  }, []);

  return <MessageContainer messages={localMessages} onRemove={remove} />;
};

// 创建消息
const createMessage = (type: MessageType) => {
  return (content: MessageContent, options?: MessageOpenOptions) => {
    initContainer();

    const key = `message-${++messageKey}`;
    const normalizedOptions = normalizeMessageArgs(content, options);
    const message: MessageInstance = {
      key,
      type,
      content: normalizedOptions.content,
      duration: normalizedOptions.duration ?? globalConfig.duration,
      closable: normalizedOptions.closable ?? false,
      position: normalizedOptions.position ?? globalConfig.position,
      onClose: normalizedOptions.onClose,
      className: normalizedOptions.className,
      style: normalizedOptions.style,
    };

    // 检查最大数量限制
    const positionMessages = messages.filter(
      msg => msg.position === message.position
    );
    if (positionMessages.length >= globalConfig.maxCount) {
      // 移除最早的消息
      const oldestKey = positionMessages[0].key;
      remove(oldestKey);
    }

    updateMessages([...messages, message]);

    // 返回关闭函数
    return {
      close: () => remove(key),
    };
  };
};

// 移除消息
const remove = (key: string) => {
  const message = messages.find(msg => msg.key === key);
  if (message?.onClose) {
    message.onClose();
  }
  updateMessages(messages.filter(msg => msg.key !== key));
};

// 销毁所有消息
const destroy = () => {
  messages.forEach(msg => {
    if (msg.onClose) {
      msg.onClose();
    }
  });
  updateMessages([]);
  messageRoot?.unmount();
  messageRoot = null;
  setMessagesFn = null;

  if (messageRootElement?.parentNode) {
    messageRootElement.parentNode.removeChild(messageRootElement);
  }
  messageRootElement = null;
};

// 全局配置
const config = (options: MessageConfigOptions) => {
  if (options.duration !== undefined) {
    globalConfig.duration = options.duration;
  }
  if (options.position !== undefined) {
    globalConfig.position = options.position;
  }
  if (options.maxCount !== undefined) {
    globalConfig.maxCount = options.maxCount;
  }
};

// 初始化容器（仅在首次调用时）
const initContainer = () => {
  if (!messageRootElement) {
    messageRootElement = document.createElement('div');
    messageRootElement.className = 'cream-message-root';
    document.body.appendChild(messageRootElement);
  }

  if (!messageRoot) {
    messageRoot = createRoot(messageRootElement);
    flushSync(() => {
      messageRoot?.render(<MessageRenderContainer />);
    });
  }
};

// Message API
export const Message = {
  success: (content: MessageContent, options?: MessageOpenOptions) => {
    return createMessage('success')(content, options);
  },
  error: (content: MessageContent, options?: MessageOpenOptions) => {
    return createMessage('error')(content, options);
  },
  warning: (content: MessageContent, options?: MessageOpenOptions) => {
    return createMessage('warning')(content, options);
  },
  info: (content: MessageContent, options?: MessageOpenOptions) => {
    return createMessage('info')(content, options);
  },
  config,
  destroy,
};

export type MessageProps = MessageOptions & {
  type?: MessageType;
};
