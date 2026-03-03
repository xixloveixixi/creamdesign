import React, { useEffect, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon';
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

  const getIcon = () => {
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
    <div className={`cream-message__item cream-message__item--${type}`}>
      <Icon icon={getIcon()} className="cream-message__icon" />
      <span className="cream-message__content">{content}</span>
      {closable && (
        <Icon
          icon={['fas', 'xmark']}
          className="cream-message__close"
          onClick={onClose}
        />
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
  // 按位置分组
  const positions: MessagePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  return createPortal(
    <div>
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
let messageContainer: React.ReactElement | null = null;
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
    setMessagesFn([...messages]);
  }
};

// 渲染容器组件
const MessageRenderContainer: React.FC = () => {
  const [localMessages, setLocalMessages] = useState<MessageInstance[]>([]);

  useEffect(() => {
    setMessagesFn = setLocalMessages;
    return () => {
      setMessagesFn = null;
    };
  }, []);

  return <MessageContainer messages={localMessages} onRemove={remove} />;
};

// 创建消息
const createMessage = (type: MessageType) => {
  return (content: React.ReactNode, options?: MessageOptions) => {
    const key = `message-${++messageKey}`;
    const message: MessageInstance = {
      key,
      type,
      content,
      duration: options?.duration ?? globalConfig.duration,
      closable: options?.closable ?? false,
      position: options?.position ?? globalConfig.position,
      onClose: options?.onClose,
      className: options?.className,
      style: options?.style,
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
  if (!messageContainer) {
    messageContainer = <MessageRenderContainer />;
  }
  return messageContainer;
};

// Message API
export const Message = {
  success: (content: React.ReactNode, options?: MessageOptions) => {
    initContainer();
    return createMessage('success')(content, options);
  },
  error: (content: React.ReactNode, options?: MessageOptions) => {
    initContainer();
    return createMessage('error')(content, options);
  },
  warning: (content: React.ReactNode, options?: MessageOptions) => {
    initContainer();
    return createMessage('warning')(content, options);
  },
  info: (content: React.ReactNode, options?: MessageOptions) => {
    initContainer();
    return createMessage('info')(content, options);
  },
  config,
  destroy,
};

export type MessageProps = MessageOptions & {
  type?: MessageType;
};
