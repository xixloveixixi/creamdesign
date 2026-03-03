import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as F}from"./index-ZH-6pyQh.js";import{F as O}from"./index-B5I2_UfN.js";import{c as A}from"./index-Dd5QUkq_.js";import{u as D}from"./index-Bdtn3t7x.js";import"./_commonjsHelpers-CqkleIqs.js";const u=({size:a="small",disabled:c=!1,icon:r,prefix:f,suffix:m,className:q,...n})=>{const g=c,_=A("input",`input-${a}`,{"input-disabled":g},q),E=p=>typeof p>"u"||p===null?"":p;return"value"in n&&(delete n.defaultValue,n.value=E(n.value)),e.jsxs("div",{className:_,children:[f&&e.jsx("div",{className:"input-prefix",children:f}),e.jsx("input",{...n,disabled:g}),r&&e.jsx(O,{icon:r,className:"input-icon"}),m&&e.jsx("div",{className:"input-suffix",children:m})]})};u.__docgenInfo={description:`输入框组件:通过鼠标和键盘输入内容,是最基础的表单组件\r
\r
 ~~~\r
//这样引用\r
import { Input } from 'creamdesign';\r
~~~\r
支持所有原生input属性`,methods:[],displayName:"Input",props:{size:{required:!1,tsType:{name:"union",raw:"'large' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'small'"}]},description:`输入框尺寸\r
@default 'small'`,defaultValue:{value:"'small'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:`是否禁用输入\r
@default false`,defaultValue:{value:"false",computed:!1}},icon:{required:!1,tsType:{name:"IconProp"},description:"图标"},prefix:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"前缀组件"},suffix:{required:!1,tsType:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"后缀组件"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"子元素"}},composes:["Omit"]};const J={title:"表单组件/Input",component:u,tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["large","small"],description:"输入框尺寸"},disabled:{control:{type:"boolean"},description:"是否禁用输入框"},prefix:{control:{type:"text"},description:"输入框前缀"},suffix:{control:{type:"text"},description:"输入框后缀"},value:{control:{type:"text"},description:"输入框值"},defaultValue:{control:{type:"text"},description:"输入框默认值"},placeholder:{control:{type:"text"},description:"输入框占位符"},onChange:{action:"onChange",description:"输入框值变化时触发"}}},M=()=>{const[a,c]=F.useState(void 0);return e.jsx(u,{value:a,onChange:r=>c(r.target.value),placeholder:"请输入",defaultValue:"初始值"})},s=a=>console.log(a.target.value),o={args:{size:"small",disabled:!1,icon:void 0,prefix:void 0,suffix:void 0,placeholder:"请输入",onChange:s,defaultValue:"初始值"},render:()=>e.jsx(M,{})},i={args:{size:"small",disabled:!0,icon:void 0,prefix:void 0,suffix:void 0,placeholder:"请输入",onChange:s}},t={args:{size:"small",disabled:!1,icon:D,prefix:void 0,suffix:void 0,placeholder:"请输入",onChange:s}},l={args:{size:"small",disabled:!1,icon:void 0,prefix:"https://",suffix:void 0,placeholder:"请输入",onChange:s}},d={args:{size:"small",disabled:!1,icon:void 0,suffix:"@creamdesign",placeholder:"请输入",onChange:s}};var x,h,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange,
    defaultValue: '初始值'
  },
  render: () => <ControlledInput />
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var R,b,C;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    size: 'small',
    disabled: true,
    icon: undefined,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange
  }
}`,...(C=(b=i.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var y,N,z;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    size: 'small',
    disabled: false,
    icon: faSearch,
    prefix: undefined,
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange
  }
}`,...(z=(N=t.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var j,I,V;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    prefix: 'https://',
    suffix: undefined,
    placeholder: '请输入',
    onChange: onChange
  }
}`,...(V=(I=l.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var S,w,T;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    size: 'small',
    disabled: false,
    icon: undefined,
    suffix: '@creamdesign',
    placeholder: '请输入',
    onChange: onChange
  }
}`,...(T=(w=d.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const K=["默认输入框","禁用输入框","图标输入框","前缀输入框","后缀输入框"];export{K as __namedExportsOrder,J as default,l as 前缀输入框,d as 后缀输入框,t as 图标输入框,i as 禁用输入框,o as 默认输入框};
