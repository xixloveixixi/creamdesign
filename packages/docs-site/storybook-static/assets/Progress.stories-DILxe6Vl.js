import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as r}from"./Progress-BjnrvYO0.js";import"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-ZH-6pyQh.js";const S={title:"Progress",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{percent:{control:{type:"number",min:0,max:100},description:"进度百分比"},strokeHeight:{control:{type:"number"},description:"进度条高度"},showText:{control:"boolean",description:"是否显示百分比文字"},theme:{control:{type:"select"},options:["primary","secondary","success","info","warning","danger"],description:"主题颜色"}}},a={args:{percent:50}},s={render:()=>e.jsxs("div",{style:{width:300,display:"flex",flexDirection:"column",gap:16},children:[e.jsx(r,{percent:25,theme:"primary"}),e.jsx(r,{percent:50,theme:"success"}),e.jsx(r,{percent:75,theme:"warning"}),e.jsx(r,{percent:100,theme:"danger"})]})};s.storyName="各种颜色";const t={args:{percent:60,showText:!1}};t.storyName="不显示文字";const o={args:{percent:70,strokeHeight:25}};o.storyName="自定义高度";const n={render:()=>e.jsxs("div",{style:{width:300,display:"flex",flexDirection:"column",gap:16},children:[e.jsx(r,{percent:30}),e.jsx(r,{percent:60}),e.jsx(r,{percent:90})]})};n.storyName="动画进度";var c,p,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    percent: 50
  }
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,d,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <Progress percent={25} theme="primary" />\r
      <Progress percent={50} theme="success" />\r
      <Progress percent={75} theme="warning" />\r
      <Progress percent={100} theme="danger" />\r
    </div>
}`,...(l=(d=s.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,u,x;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    percent: 60,
    showText: false
  }
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var h,y,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    percent: 70,
    strokeHeight: 25
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var j,w,P;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <Progress percent={30} />\r
      <Progress percent={60} />\r
      <Progress percent={90} />\r
    </div>
}`,...(P=(w=n.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};const C=["Default","VariousColors","NoText","CustomHeight","Animated"];export{n as Animated,o as CustomHeight,a as Default,t as NoText,s as VariousColors,C as __namedExportsOrder,S as default};
