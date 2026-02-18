// axios:
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { Upload } from './Upload';
// 解决：jest.mock('axios') 只是告诉 Jest 要 mock axios，但是没有提供 mock 实现。在第30行 import axios from 'axios' 时，Jest 会返回一个空的 mock，但是原始 axios 模块（有 import 语句的）已经被加载了，导致语法错误。
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      post: jest.fn(
        () =>
          new Promise(resolve => {
            // 添加 100ms 延迟，让 spinner 有机会显示
            setTimeout(() => resolve({ data: 'cool' }), 100);
          })
      ),
      get: jest.fn(() => Promise.resolve({ data: {} })),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
    post: jest.fn(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ data: 'cool' }), 100);
        })
    ),
  },
  create: jest.fn(() => ({
    post: jest.fn(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ data: 'cool' }), 100);
        })
    ),
    get: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));
// 获取 mock 后的 axios
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('../Icon/Icon', () => {
  return function MockIcon({ icon, className }: any) {
    // 根据 FontAwesome 图标的 iconName 属性返回对应的文字
    // 使用 icon?.iconName 来识别图标，避免引用外部作用域变量
    let iconName = 'icon';
    if (icon?.iconName === 'spinner') {
      iconName = 'spinner';
    } else if (icon?.iconName === 'circle-check') {
      iconName = 'check-circle';
    } else if (icon?.iconName === 'circle-xmark') {
      iconName = 'times-circle';
    }
    return <span data-testid={iconName}>{iconName}</span>;
  };
});
jest.mock('./hooks/useLargeFileUpload', () => ({
  useLargeFileUpload: () => ({
    upload: jest.fn(),
    getProgress: jest.fn(),
  }),
}));

describe('Upload 组件测试', () => {
  // 1. testProps 配置
  const testProps = {
    action: 'fakeurl.com', // 假URL，避免真实网络请求
    onSuccess: jest.fn(), // 使用 jest.fn() 监控是否被正确触发
    onChange: jest.fn(), // 使用 jest.fn() 监控文件变化事件
    name: 'testfile',
    enableLargeFileUpload: false, // 禁用大文件上传，使用普通上传进行测试
  };

  let wrapper: RenderResult;
  let fileInput: HTMLInputElement;
  let uploadArea: HTMLElement;

  beforeEach(() => {
    // 重置所有 mock
    jest.clearAllMocks();

    // 2. 渲染组件
    wrapper = render(
      <Upload {...testProps}>
        <button>点击上传</button>
      </Upload>
    );

    // 获取关键 DOM 元素
    fileInput = wrapper.container.querySelector(
      '.upload-input'
    ) as HTMLInputElement;
    uploadArea = wrapper.container.querySelector(
      '.upload-container'
    ) as HTMLElement;

    // 初始断言
    expect(uploadArea).toBeInTheDocument(); // 验证 uploadArea 在文档中可见
    expect(fileInput).not.toBeVisible(); // 验证 fileInput 不可见
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('应该能够成功上传文件', async () => {
    // 4. axios 模块的 mock（必须在触发事件之前设置）
    // 使用 mockImplementation 来模拟真实的 axios 行为，包括调用 onUploadProgress
    mockedAxios.post.mockImplementation((url, data, config) => {
      // 模拟上传进度更新，这样才会显示 spinner
      if (config?.onUploadProgress) {
        // 异步调用进度回调，确保状态更新
        setTimeout(() => {
          config.onUploadProgress!({
            loaded: 50,
            total: 100,
          } as any);
        }, 10);
      }
      // 延迟返回成功响应，给 spinner 显示的时间
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: 'cool' });
        }, 100);
      });
    });

    // 3. 触发 change 事件
    // 测试文件创建：使用 new File 构造，不需要真实文件
    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    // 事件触发：使用 fireEvent.change 触发 fileInput 的 change 事件
    fireEvent.change(fileInput, {
      target: {
        files: [testFile], // 传入 target.files 包含测试文件对象
      },
    });

    // 5. 等待 spinner 出现
    // 验证点：上传过程中应显示 loading 图标
    await waitFor(
      () => {
        // 查找方式：通过 queryByText 查找 'spinner' 文字
        const spinner = wrapper.queryByText('spinner');
        expect(spinner).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 6. 等待成功图标出现
    await waitFor(() => {
      // 验证点：上传完成后显示成功图标
      // 查找方式：通过 queryByText 查找 'check-circle' 文字
      const checkIcon = wrapper.queryByText('check-circle');
      expect(checkIcon).toBeInTheDocument();

      // 文件显示：同时验证文件名 'test.png' 出现在 DOM 中
      expect(wrapper.getByText('test.png')).toBeInTheDocument();
    });

    // 7. 判断 success 被调用
    // 参数验证：
    // 第一个参数应为响应数据 'cool'
    // 第二个参数应为测试文件对象
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);

    // 8. 判断 onChange 被调用
    // 验证点：onChange 生命周期应被触发
    // 参数验证：应接收到测试文件对象
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);
  });

  it('应该能够处理上传失败', async () => {
    // Mock 上传失败（必须在触发事件之前设置）
    const errorMessage = '上传失败';
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });

    // 等待错误状态显示
    await waitFor(() => {
      const errorIcon = wrapper.queryByText('times-circle');
      expect(errorIcon).toBeInTheDocument();
    });
  });

  it('应该能够显示上传进度', async () => {
    // Mock 带进度回调的上传（必须在触发事件之前设置）
    mockedAxios.post.mockImplementation((url, data, config) => {
      // 模拟进度更新
      if (config?.onUploadProgress) {
        config.onUploadProgress({
          loaded: 50,
          total: 100,
        } as any);
      }
      return Promise.resolve({ data: 'cool' });
    });

    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });

    await waitFor(() => {
      expect(wrapper.queryByText('spinner')).toBeInTheDocument();
    });
  });

  it('应该能够处理 beforeUpload 返回 false', () => {
    const beforeUpload = jest.fn(() => false);
    const wrapper = render(
      <Upload {...testProps} beforeUpload={beforeUpload}>
        <button>点击上传</button>
      </Upload>
    );

    const fileInput = wrapper.container.querySelector(
      '.upload-input'
    ) as HTMLInputElement;
    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });

    // beforeUpload 返回 false，不应该上传
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('应该能够处理 beforeUpload 返回 Promise<File>', async () => {
    // Mock axios（必须在触发事件之前设置）
    mockedAxios.post.mockResolvedValue({
      data: 'cool',
    });

    const modifiedFile = new File(['modified'], 'modified.png', {
      type: 'image/png',
    });
    const beforeUpload = jest.fn(() => Promise.resolve(modifiedFile));

    const wrapper = render(
      <Upload {...testProps} beforeUpload={beforeUpload}>
        <button>点击上传</button>
      </Upload>
    );

    const fileInput = wrapper.container.querySelector(
      '.upload-input'
    ) as HTMLInputElement;
    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });

    await waitFor(() => {
      expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
    });

    // 应该使用修改后的文件上传
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', modifiedFile);
  });

  it('应该能够处理 onRemoved 回调', async () => {
    // Mock onRemoved 回调
    const onRemoved = jest.fn();

    // Mock axios（必须在触发事件之前设置）
    mockedAxios.post.mockResolvedValue({
      data: 'cool',
    });

    const wrapper = render(
      <Upload {...testProps} onRemoved={onRemoved}>
        <button>点击上传</button>
      </Upload>
    );

    const fileInput = wrapper.container.querySelector(
      '.upload-input'
    ) as HTMLInputElement;
    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

    // 1. 上传文件
    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });

    // 2. 等待上传成功
    await waitFor(() => {
      expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
    });

    // 3. 验证文件在列表中
    expect(wrapper.getByText('test.png')).toBeInTheDocument();

    // 4. 等待文件项出现并找到删除按钮
    await waitFor(() => {
      const fileItem = wrapper.container.querySelector(
        '.file-item.status-success'
      );
      expect(fileItem).toBeInTheDocument();
    });

    // 5. 找到删除按钮
    const deleteButton = wrapper.container.querySelector(
      '.status-icon-btn'
    ) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    // 6. 模拟鼠标悬浮（触发 hover 状态，显示删除图标）
    fireEvent.mouseEnter(deleteButton);

    // 7. 点击删除按钮
    fireEvent.click(deleteButton);

    // 8. 验证 onRemoved 被调用
    expect(onRemoved).toHaveBeenCalledTimes(1);
    // 验证 onRemoved 接收到了正确的文件对象
    const removedFile = onRemoved.mock.calls[0][0];
    expect(removedFile.name).toBe('test.png');

    // 9. 验证文件从列表中移除
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).not.toBeInTheDocument();
    });
  });

  describe('拖拽上传测试', () => {
    it('应该能够处理拖拽上传 - dragOver 时添加 is-dragover 类', async () => {
      const wrapper = render(
        <Upload {...testProps} drag={true}>
          <button>点击上传</button>
        </Upload>
      );

      // 找到拖拽区域
      const dragger = wrapper.container.querySelector(
        '.upload-dragger'
      ) as HTMLElement;
      expect(dragger).toBeInTheDocument();

      // 初始状态不应该有 is-dragover 类
      expect(dragger).not.toHaveClass('is-dragover');

      // 创建 dragOver 事件
      const dragOverEvent = createEvent.dragOver(dragger);
      Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: {
          files: [],
        },
        writable: true,
      });

      // 触发 dragOver 事件
      fireEvent(dragger, dragOverEvent);

      // 验证添加了 is-dragover 类
      expect(dragger).toHaveClass('is-dragover');
    });

    it('应该能够处理拖拽上传 - dragLeave 时移除 is-dragover 类', async () => {
      const wrapper = render(
        <Upload {...testProps} drag={true}>
          <button>点击上传</button>
        </Upload>
      );

      const dragger = wrapper.container.querySelector(
        '.upload-dragger'
      ) as HTMLElement;
      expect(dragger).toBeInTheDocument();

      // 先触发 dragOver
      const dragOverEvent = createEvent.dragOver(dragger);
      Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: {
          files: [],
        },
        writable: true,
      });
      fireEvent(dragger, dragOverEvent);
      expect(dragger).toHaveClass('is-dragover');

      // 触发 dragLeave 事件
      const dragLeaveEvent = createEvent.dragLeave(dragger);
      Object.defineProperty(dragLeaveEvent, 'dataTransfer', {
        value: {
          files: [],
        },
        writable: true,
      });
      fireEvent(dragger, dragLeaveEvent);

      // 验证移除了 is-dragover 类
      expect(dragger).not.toHaveClass('is-dragover');
    });

    it('应该能够处理拖拽上传 - drop 时上传文件', async () => {
      // Mock axios（必须在触发事件之前设置）
      mockedAxios.post.mockImplementation((url, data, config) => {
        if (config?.onUploadProgress) {
          setTimeout(() => {
            config.onUploadProgress!({
              loaded: 50,
              total: 100,
            } as any);
          }, 10);
        }
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ data: 'cool' });
          }, 100);
        });
      });

      const wrapper = render(
        <Upload {...testProps} drag={true}>
          <button>点击上传</button>
        </Upload>
      );

      const dragger = wrapper.container.querySelector(
        '.upload-dragger'
      ) as HTMLElement;
      expect(dragger).toBeInTheDocument();

      // 创建测试文件
      const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

      // 创建 FileList 对象（模拟浏览器的 FileList）
      const fileList = {
        0: testFile,
        length: 1,
        item: (index: number) => (index === 0 ? testFile : null),
        [Symbol.iterator]: function* () {
          yield testFile;
        },
      } as any as FileList;

      // ！！！！创建 drop 事件
      const dropEvent = createEvent.drop(dragger);
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
          files: fileList,
        },
        writable: true,
      });

      // 触发 drop 事件
      fireEvent(dragger, dropEvent);

      // 验证移除了 is-dragover 类
      expect(dragger).not.toHaveClass('is-dragover');

      // 等待上传进度显示
      await waitFor(
        () => {
          expect(wrapper.queryByText('spinner')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      // 等待上传成功
      await waitFor(() => {
        expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
      });

      // 验证文件在列表中
      expect(wrapper.getByText('test.png')).toBeInTheDocument();

      // 验证 onSuccess 回调被调用
      expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
    });
  });
});
