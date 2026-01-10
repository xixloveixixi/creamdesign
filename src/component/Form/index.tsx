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
// 整个表单的验证：
// 最开始的思路应该是遍历所有FormItem上的validate进行一个验证，但是这样做太费性能，也很麻烦
// 验过程当中，验证值和验证规则是很重要的，那我们就可以拿到所有的验证值和验证规则然后进行整体校验
// 添加张泰：
// isValid: 初始值为true，表示表单验证状态
// isSubmitting: 初始值为false，表示表单提交状态
// errors: 初始为空对象，记录所有字段的错误信息
// 函数validateAllFields：验证整体的白哦单
// 我们需要切换格式：
// 将字段对象从{username: {value: 'abc', rules: [...]}}格式
// 转换为{username: 'abc'}和{username: [...]}两种格式
// 借助工具库：
// 工具库选择:
// 使用lodash-es而非原生lodash
// 原因：lodash-es导出ES模块，打包体积更小
// 核心方法:
// mapValues：对对象每个值进行转换

// 进行验证：
// 使用mapValues生成valueMap
// 使用mapValues生成rules描述符
//  // 获取值和规则，我们使用lodash-es的mapValues方法
//  const valueMap = mapValues(fields, field => field.value);
//  // 进行转换：将CustomRule[]转换为RuleItem[]
//  const rulesMap = mapValues(fields, field => transformedRules(field.rules));
// 创建Schema实例进行验证
// 错误处理：
// 定义ValidateErrorType接口
// export interface FormErrors extends Error {
//     fields?: Record<string, ValidateError>;
//     errors?: ValidateError[];
//   }
// 使用类型断言处理错误对象
// catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       }
// dispatch进行更新：
// 字段循环处理：需要循环处理表单中的fields字段，每个字段包含两个关键参数
// 参数说明：
// value：对应字段的当前值
// name：字段的标识名称（字幕中提到的"t"应为name的误读）
// 这里要注意的是，如果errors里面存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
// 如果errors里面不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
// try {
//     await validator.validate(valueMap);
//   } catch (e: any) {
//     isValid = false;
//     const error = e as FormErrors;
//     const errors = error.errors || [];
//     // 开始each进行遍历
//     each(fields, (value, name: string) => {
//       // 如果说errors中存在name，则证明验证没有通过，我们就要进行派发修改fields的状态
//       if (errors[name as any]) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: false,
//             errors: errors[name as any],
//           },
//         });
//         // 如果说errors中不存在name以及没有规则，则证明验证通过，我们就要进行派发修改fields的状态
//       } else if (!errors[name as any] && !value.rules) {
//         dispatchFields({
//           type: 'updateField',
//           name,
//           value: {
//             isValid: true,
//           },
//         });
//       }
//     });
//   } finally {
//     setForm({ ...form, isSubmitting: false, isValid, errors });
//   }
//   最后记得返回一些参数供后面使用
//   return {
//     isValid,
//     errors,
//     values: valueMap,
//   };
// 1、特定时机表单验证
// 提交时机验证: 在表单提交时(onSubmit事件)进行整体验证，这是最关键的验证时机
// <form className="cream-form" style={style} onSubmit={onFormSubmit}>
// 事件处理: 需要阻止默认事件(e.preventDefault())和停止冒泡(e.stopPropagation())
// 验证流程: 通过validateAllFields方法获取验证结果，包含isValid、errors和values三个关键属性
// async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     e.stopPropagation();
//     const { isValid, errors, values } = await validateAllFields();
//     if (isValid) {
//       onFinish?.(values);
//     } else {
//       onFinishFailed?.(values, errors);
//     }
//   }
// 2、添加特定事件
// 在and里面发现有onFinish和onFinishFailed事件，我们可以在onFormSubmit中调用这两个事件
// onFinish事件:
// 触发条件: 表单验证成功后触发
// 参数: 包含所有表单值的values对象(Record<string, any>)
// 返回值: void
// onFinishFailed事件:
// 触发条件: 表单验证失败后触发
// 参数: values对象和errors对象(Record<string, ValidateError[]>)
// 返回值: void
// 事件调用: 根据validateAllFields返回的isValid值决定触发哪个事件

// 基于前面的表单验证体系，我们已经实现了：

// ✅ 完整的验证规则机制（基础规则 + 自定义函数规则）
// ✅ 灵活的状态管理（单独验证 + 整体验证）
// ✅ 智能的错误处理（onFinish/onFinishFailed回调）
// 但存在一个关键限制：UI 展示被硬编码在组件内部。
// // 当前实现：UI 与逻辑耦合
// <FormItem name="username">
//   <Input /> {/* 只能渲染 Input 组件 */}
// </FormItem>
// ReactProps: 我们可以通过ReactProps来实现UI展示，
// 比如可以实现多平台适配：
// // Web 使用 Input
// <FormItem name="username" render={() => <input />} />

// // 移动端使用 TextInput
// <FormItem name="username" render={() => <TextInput />} />

// // 自定义设计系统
// <FormItem name="username" render={() => <MyCustomInput />} />
// 比如可以实现条件渲染：
// <FormItem
//   name="email"
//   render={(fieldProps) => (
//     fieldProps.value.includes('@gmail.com')
//       ? <GmailInput {...fieldProps} />
//       : <NormalInput {...fieldProps} />
//   )}
// />

// 如何实现呢？就是对children进行处理，如果children是函数，则调用函数，如果children是组件，则渲染组件

// export type ReactProps = (formProps: FormState) => ReactNode;
// let childrenNode = null;
// if (typeof children === 'function') {
//   childrenNode = children(form);
// } else {
//   childrenNode = children;
// }
