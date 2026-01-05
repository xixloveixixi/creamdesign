// 组件需求：
// 元素多样性：支持Input、Radio、Checkbox、Select等多种表单元素类型
// 布局灵活性：可自定义表单元素的排列方式，支持无label或添加辅助文本
// 提交区域定制：完全自定义提交区域的按钮样式、文本和排列方式
// 单个元素验证：默认在blur事件触发，可配置为input事件实时验证
// 全局验证：点击提交按钮时触发所有表单元素的验证
// 验证规则
// 内置规则：支持非空检查、字符串类型验证、长度限制等常见规则
// 自定义规则：可实现跨字段验证（如密码一致性检查）
// 异步验证：支持发送请求后根据返回结果进行验证
// 多规则组合：单个字段可配置多条验证规则
// 重置功能：支持一键重置所有表单元素到初始状态
// 组件结构设计：
// 最简单的是使用json进行配置，每个表单元素对应一个json对象，包含类型、名称、标签、验证规则等信息。
// 缺点：不够语义化，布局灵活性差，组件属性扩展困难
// 所以使用语义化方案：
// <Form>
//   <FormItem name="username" label="用户名">
//     <Input />
//   </FormItem>
//   <FormItem name="gender" label="性别">
//     <RadioGroup>
//       <Radio value="male">男</Radio>
//       <Radio value="female">女</Radio>
//     </RadioGroup>
//   </FormItem>
//   <FormItem name="hobbies" label="爱好">
//     <CheckboxGroup>
//       <Checkbox value="reading">阅读</Checkbox>
//       <Checkbox value="travel">旅行</Checkbox>
//       <Checkbox value="sports">运动</Checkbox>
//     </CheckboxGroup>
//   </FormItem>
//   <FormItem name="city" label="城市">
//     <Select>
//       <SelectOption value="beijing">北京</SelectOption>
//       <SelectOption value="shanghai">上海</SelectOption>
//       <SelectOption value="guangzhou">广州</SelectOption>
//     </Select>
//    <FormItem/>
// </Form>
// 开发的步骤：
// 实现基础布局和静态展示
// 添加数据初始化和更新功能
// 实现验证功能（包括时机和规则）
// 处理后续衍生需求
// 关于数据交互：
// 表单数据在父子组件间的流转需要解决三个关键问题：
// 表单值存储位置
// 单个输入项的验证触发机制
// 整体表单的验证触发方式
// 方法1：
// 值存储：采用受控组件模式，每个Item组件内部使用useState管理value
// 验证机制：
// 每个Item内部实现validateInput函数
// 在blur等特定时机触发验证
// 验证时结合当前value和rules属性进行校验
// 但是：Form组件无法通过ref获取children中的Item实例
// 无法在onSubmit时调用所有Item的validateInput函数
// 法2：引入中央存储store作为数据中介，统一管理表单状态和验证逻辑
// Form组件初始化store
// store结构：
// {
//     files: {
//         username: {
//             value: '',
//             rules: [],
//             error: '',
//             name: 'username',
//         }
//     },
//     // 整个表单的验证状态
//     form: {
//         isValid: false
//     }
// }
// Item组件注册字段到store
// Item组件在初始化时，将自身的name、value、rules等属性注册到store的files对象中
// 输入的时候，Item组件监听input事件，更新store中对应字段的value
// 在blur事件触发时，调用validateInput函数进行验证，更新error字段
// 两者共享store中的数据和验证方法
// 在Form组件中，监听submit事件，调用validateAllInputs函数进行验证
// 遍历所有fields执行validateInput
// 汇总结果更新form.isValid
// 拓展方法：clearInputs：清空所有字段值
// 自动更新store中的数据：
// 采用受控组件设计模式，每个表单元素的value都由store管理，输入时实时更新store中的数据。
// 因为是受控组件，所以我们是要修改children中的value属性
// 先创建一个新的propsList对象，将value属性和onChange事件添加到其中
// 使用cloneElement进行创建新的元素，将新的propsList合并到其中
