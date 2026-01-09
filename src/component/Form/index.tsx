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
// 但是目前还有一个问题，value和onChange事件是手动创建的，需要适应不同的事件和value属性名称
// 我们多添加三个属性：valuePropsName、trgger、getValueFormEvent
// valuePropsName：value属性的名称
// trgger：触发事件
// getValueFormEvent：获取value的函数
// export interface FormItemProps {
//     name?: string;
//     children?: ReactNode;
//     label?: string;
//     required?: boolean;
//     error?: string;
//     labelWidth?: string; // 可选：自定义标签宽度
//     controlWidth?: string; // 可选：自定义控件宽度
//     className?: string;
//     // 添加三个属性来适应不同的事件和value属性名称
//     valuePropsName?: string;
//     trigger?: string;
//     getValueFormEvent?: (e: any) => any;
//   }
// const onValueUpdate = (e: any) => {
//     const value = getValueFormEvent!(e);
//     // console.log('newValue', value);
//     // console.log('newValue e.target', e.target);
//     dispatchFields({
//       type: 'updateField',
//       name: name || 'form',
//       value: {
//         value,
//       },
//     });
//   };
//   // 1.手动创建一个列表,需要有value和onChange属性
//   const propsList: Record<string, any> = {};
//   // Q:需要适应不同的事件和value属性名称
//   // 需要验证children类型并显示警告
//   // 目前仅支持单一表单元素作为children
//   propsList[valuePropsName!] = value;
//   propsList[trigger!] = onValueUpdate;
//   // 2.我们要获取children数组的第一个元素
//   const childList = React.Children.toArray(children);
//   const child = childList[0] as ReactElement<any, string>;
//   // 3.使用cloneElement,混合这个child以及手动的属性列表
//   const clonedChild = React.cloneElement(child, {
//     ...child.props,
//     ...propsList,
//   });
// 初始值：使用initialValue属性来设置初始值
// 单个Form Item添加验证
// 一、验证功能
// 1. 验证的流程
// 核心要素：由规则(rules)和值(value)组成，在特定时机（如onBlur）触发验证逻辑
// 验证场景：
// 单个Item的验证
// 整个Form的验证
// 执行过程：通过规则+值的组合，在特定时机调用验证逻辑处理最终结果
// 2. 第三方库
// 1）第三方库介绍
// 库名称：async-validator（GitHub 7.6k star）
// 特点：
// 被多个主流框架采用（如React、Vue等）
// 提供丰富的预设验证类型
// 支持异步验证
// 基本结构：
// 2）第三方库使用案例
// 预设类型：
// string：字符串类型（默认）
// number：数字类型
// boolean：布尔类型
// regexp：正则表达式
// integer：整数
// float：浮点数
// array：数组
// object：对象
// enum：枚举值

// 验证器创建：
// 验证方式：
// 回调方式：
// Promise方式：
// 规则属性：
// required：是否必填
// pattern：正则匹配
// min/max：范围限制
// len：精确长度
// validator：自定义验证函数

// 多规则验证：
// 二、单个Item验证
// 1. 验证store设计
// 核心字段:
// rules: RuleItem[]; // 验证规则数组，类型为RuleItem[]以便灵活扩展
// isValid: boolean; // 字段验证状态，布尔类型
// errors: ValidateError[]; // 错误信息数组，存储多条验证错误信息
// 2. 验证function编写
// 关键依赖:
// 从async-validator导入Schema、RuleItem和ValidateError类型
// 使用React的useReducer管理表单状态
// 验证流程:
// 创建descriptor对象，将字段名与对应规则关联
// 构建valueMap包含待验证的字段值
// 初始化验证器实例new Schema(descriptor)
// 使用try-catch处理验证结果，更新isValid和errors状态
// const validateField = async (name: string) => {
//     const field = fields[name];
//     if (!field) return;

//     const { value, rules } = field;
//     const descriptor = { [name]: rules };
//     const valueMap = { [name]: value };

//     // 创建 Schema 实例并验证
//     const validator = new Schema(descriptor);
//     let isValid = true;
//     let errors: ValidateError[] = [];

//     try {
//       await validator.validate(valueMap);
//       isValid = true;
//       errors = [];
//     } catch (e: any) {
//       isValid = false;
//       // async-validator 的错误对象有 errors 属性
//       errors = e.errors || [];
//     }

//     dispatchFields({
//       type: 'updateValidateResult',
//       name,
//       value: { isValid, errors },
//     });
//   };
// 3. 验证form编写
// Context设计:
// 通过FormContext传递dispatch、fields和validateField方法
// FormItem组件通过context获取验证能力
// 触发机制:
// 默认在onBlur事件触发验证
// 可通过validateTrigger属性自定义触发事件
// 验证规则rules作为可选属性传递给FormItem

//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0 && validateTrigger) {
//     const existingHandler = child.props[validateTrigger];
//     // 合并事件处理函数，避免覆盖原有的处理函数
//     propsList[validateTrigger] = async (e: any) => {
//       // 先执行原有的事件处理函数
//       if (existingHandler) {
//         existingHandler(e);
//       }
//       // 然后执行验证
//       await validateField(name!);
//     };
//   }
//   // 默认在onBlur事件触发验证
//   // 可通过validateTrigger属性自定义触发事件
//   // 验证规则rules作为可选属性传递给FormItem
//   if (rules && rules.length > 0) {
//     const trigger = validateTrigger;
//     propsList[trigger] = async () => {
//       await validateField(name!);
//     };
//   }
// // FormItem中的控制属性添加
// if (rules) {
//   controlProps[validateTrigger] = async () => {
//     await validateField(name);
//   };
// }
// "username": {
//     "label": "用户名",
//     "name": "username",
//     "value": "",
//     "rules": [
//       {
//         "required": true,
//         "message": "请输入用户名"
//       }
//     ],
//     "isValid": false,
//     "errors": [
//       {
//         "message": "请输入用户名",
//         "fieldValue": "",
//         "field": "username"
//       }
//     ]
//   },
// 添加错误提示，根据fields中的errors数组，显示错误提示
// {/* <div className={controlClassName}>
// <div className="cream-input-wrapper">{clonedChild}</div>
// {errors.length > 0 ? (
//   <div className="cream-form-item-explain">{errors[0].message}</div>
// ) : (
//   error && <div className="cream-form-item-explain">{error}</div>
// )}
// </div> */}
// 现在的rule是这样的：
// rules={[
//     {
//       required: true,
//       message: '请输入用户名',
//     },
//     {
//       min: 3,
//       message: '用户名长度不能小于3位',
//     },
//     {
//       max: 10,
//       message: '用户名长度不能大于10位',
//     },
//   ]}
// 现在我们发现难以处理跨字段验证，比如密码和确认密码的验证
// const password = getFieldValue('password');
// const passwordConfirm = getFieldValue('passwordConfirm');
// console.log('password', password);
// console.log('passwordConfirm', passwordConfirm);
// if (password !== passwordConfirm) {
//    Promise.reject({ message: '密码和确认密码不一致' });
// }
//  Promise.resolve();
// 我们通过函数参数传递getValue方法，实现跨字段验证
// CustomRuleFunc: 接收包含getFieldValue方法的对象，返回RuleItem
// CustomRule: RuleItem与CustomRuleFunc的联合类型
// 使用混合类型就可以了
// 但是这里要注意，descriptor的类型是{ [x: string]: CustomRule[]; }，所以需要转换为{ [x: string]: RuleItem[]; }
// const transformedRules = function (rules: CustomRule[]): RuleItem[] {
//     const result: RuleItem[] = []; // 结果数组
//     rules.forEach(rule => {
//       if (typeof rule === 'function') {
//         const customRule = rule({ getFieldValue });
//         result.push(customRule);
//       } else {
//         // 如果规则是 RuleItem，直接添加
//         result.push(rule);
//       }
//     }); // 遍历规则数组，如果规则是函数，则转换为 RuleItem，否则直接添加到结果数组
//     return result;
//   };
//     // 转换规则并包装成 descriptor 对象格式
//     // 注意！！！而 Schema 需要对象格式的 descriptor
//     const transformedRuleItems = transformedRules(rules);
//     const descriptor = { [name]: transformedRuleItems };
// 测试：
// ({ getFieldValue }) => {
//     return {
//       validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//         const password = getFieldValue('password');
//         const passwordConfirm = getFieldValue('passwordConfirm');
//         if (password !== passwordConfirm) {
//           Promise.reject({ message: '密码和确认密码不一致' });
//         } else {
//           Promise.resolve();
//         }
//       },
//     };
//   },
// 但是现在又有问题了，我们应该是return一个Promise，但是async-validator的validator不支持直接返回Promise，需要使用回调模式，并在内部处理Promise：
// const customRule: CustomRule[] = [
//     { type: 'string', required: true, message: ' 请再次输入密码' },
//     { min: 3, message: '用户名长度不能小于3位' },
//     { max: 10, message: '用户名长度不能大于10位' },
//     ({ getFieldValue }) => {
//       return {
//         validator: (rule: any, value: any, callback: (error?: Error) => void) => {
//           const password = getFieldValue('password');
//           const passwordConfirm = getFieldValue('passwordConfirm');
//           // 使用 Promise 进行验证，但通过 callback 返回结果
//           // 验证逻辑：如果密码不一致，reject；否则 resolve
//           const validationPromise =
//             password !== passwordConfirm
//               ? Promise.reject({ message: '密码和确认密码不一致' })
//               : Promise.resolve();

//           validationPromise
//             .then(() => {
//               // 验证通过
//               callback();
//             })
//             .catch((error: any) => {
//               // 验证失败
//               const message = error?.message || '验证失败';
//               callback(new Error(message));
//             });
//         },
//       };
//     },
//   ];
