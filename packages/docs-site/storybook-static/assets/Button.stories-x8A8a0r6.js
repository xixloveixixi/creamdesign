import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as e,a as n,b as k}from"./Button-CuTL28oH.js";const A={title:"Button",component:e,tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["large","normal","small"],description:"按钮尺寸"},btnType:{control:{type:"select"},options:Object.values(n),description:"按钮类型"}}},d={args:{children:"Default Button"},render:r=>t.jsx(e,{...r})},s={args:{children:"Large Button"},render:r=>t.jsx(e,{size:k.Large,...r})};s.storyName="Large";const a={args:{children:"Small Button"},render:r=>t.jsx(e,{size:k.Small,...r})};a.storyName="Small";const o={args:{children:"Primary Button"},render:r=>t.jsx(e,{btnType:n.Primary,...r})};o.storyName="Primary";const c={args:{children:"Outline Button"},render:r=>t.jsx(e,{btnType:n.Outline,...r})};c.storyName="Outline";const u={args:{children:"Danger Button"},render:r=>t.jsx(e,{btnType:n.Danger,...r})};u.storyName="Danger";const p={args:{children:"Info Button"},render:r=>t.jsx(e,{btnType:n.Info,...r})};p.storyName="Info";const i={args:{children:"Success Button"},render:r=>t.jsx(e,{btnType:n.Success,...r})};i.storyName="Success";var m,l,g;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  },
  render: (args: ButtonProps) => <Button {...args} />
}`,...(g=(l=d.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var B,y,S;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Large Button'
  },
  render: (args: ButtonProps) => <Button size={ButtonSize.Large} {...args} />
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,h,P;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: 'Small Button'
  },
  render: (args: ButtonProps) => <Button size={ButtonSize.Small} {...args} />
}`,...(P=(h=a.parameters)==null?void 0:h.docs)==null?void 0:P.source}}};var b,f,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button'
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Primary} {...args} />
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var j,D,O;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button'
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Outline} {...args} />
}`,...(O=(D=c.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var z,I,L;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    children: 'Danger Button'
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Danger} {...args} />
}`,...(L=(I=u.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var N,E,_;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Info Button'
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Info} {...args} />
}`,...(_=(E=p.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var v,M,R;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Success Button'
  },
  render: (args: ButtonProps) => <Button btnType={ButtonType.Success} {...args} />
}`,...(R=(M=i.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const C=["Default","Large","Small","Primary","Outline","Danger","Info","Success"];export{u as Danger,d as Default,p as Info,s as Large,c as Outline,o as Primary,a as Small,i as Success,C as __namedExportsOrder,A as default};
