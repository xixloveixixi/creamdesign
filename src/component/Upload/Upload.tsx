// 文件上传需求分析：
// 1、通过AJAX实现异步上传，支持进度显示和预览功能
// 2、支持点击/拖拽两种方式，提供可视化进度条(限制示例)
// 3、生命周期：
// 开始阶段:
// 触发条件: 用户点击按钮选择文件
// beforeUpload: 接收file对象，可进行格式/大小校验(示例)
// 异步处理: 支持返回Promise实现服务端校验
// 传输阶段:
// onProgress: 接收event对象包含上传百分比
// onChange: 无论成功失败都会触发(含file对象)
// 结束阶段:
// onSuccess: 接收response和file对象
// onError: 接收error和file对象(示例)
// 附加阶段:
// onRemoved: 点击删除按钮时触发(示例)

// 属性列表：
// action: 上传接口URL，必填
// children: 自定义上传按钮内容，可选
// beforeUpload: 上传前校验函数，可选
// onProgress: 上传进度回调，可选
// onChange: 上传完成回调，可选
// onSuccess: 上传成功回调，可选
// onError: 上传失败回调，可选
// onRemoved: 删除文件回调，可选
// 拓展功能
// 1、defaultFileList: 默认文件列表，可选
// 2、theme style: 自定义主题样式，可选
