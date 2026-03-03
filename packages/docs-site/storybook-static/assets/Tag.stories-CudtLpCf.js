import{j as e}from"./jsx-runtime-D_zvdyIk.js";var D=(r=>(r.Default="default",r.Primary="primary",r.Success="success",r.Warning="warning",r.Danger="danger",r.Info="info",r))(D||{}),L=(r=>(r.Small="small",r.Medium="medium",r.Large="large",r))(L||{});const a=({children:r,color:q="default",size:_="medium",clickable:m=!1,closable:I=!1,onClick:u,onClose:d,className:W})=>{const H=o=>{m&&u&&u(o)},C=o=>{o.stopPropagation(),d==null||d(o)};return e.jsxs("span",{className:`cream-tag cream-tag--${q} cream-tag--${_} ${m?"cream-tag--clickable":""} ${W||""}`,onClick:H,children:[e.jsx("span",{className:"cream-tag__text",children:r}),I&&e.jsx("span",{className:"cream-tag__close",onClick:C,role:"button",tabIndex:0,"aria-label":"关闭",children:"×"})]})};a.__docgenInfo={description:"",methods:[],displayName:"Tag",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"标签内容"},color:{required:!1,tsType:{name:"union",raw:`| TagColor\r
| 'default'\r
| 'primary'\r
| 'success'\r
| 'warning'\r
| 'danger'\r
| 'info'`,elements:[{name:"TagColor"},{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'info'"}]},description:"标签颜色",defaultValue:{value:"TagColor.Default",computed:!0}},size:{required:!1,tsType:{name:"union",raw:"TagSize | 'small' | 'medium' | 'large'",elements:[{name:"TagSize"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"标签尺寸",defaultValue:{value:"TagSize.Medium",computed:!0}},clickable:{required:!1,tsType:{name:"boolean"},description:"是否可点击",defaultValue:{value:"false",computed:!1}},closable:{required:!1,tsType:{name:"boolean"},description:"是否可删除",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.MouseEvent<HTMLSpanElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},name:"e"}],return:{name:"void"}}},description:"点击回调"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.MouseEvent<HTMLSpanElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},name:"e"}],return:{name:"void"}}},description:"删除回调"},className:{required:!1,tsType:{name:"string"},description:"样式类名"}}};const V={title:"Tag",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{color:{control:{type:"select"},options:Object.values(D),description:"标签颜色"},size:{control:{type:"select"},options:Object.values(L),description:"标签尺寸"},clickable:{control:"boolean",description:"是否可点击"},closable:{control:"boolean",description:"是否可删除"}}},t={args:{children:"标签"}},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(a,{color:"default",children:"Default"}),e.jsx(a,{color:"primary",children:"Primary"}),e.jsx(a,{color:"success",children:"Success"}),e.jsx(a,{color:"warning",children:"Warning"}),e.jsx(a,{color:"danger",children:"Danger"}),e.jsx(a,{color:"info",children:"Info"})]})};s.storyName="各种颜色";const l={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx(a,{size:"small",children:"Small"}),e.jsx(a,{size:"medium",children:"Medium"}),e.jsx(a,{size:"large",children:"Large"})]})};l.storyName="各种尺寸";const c={args:{children:"可点击标签",clickable:!0}},i={args:{children:"可删除标签",closable:!0}},n={render:()=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(a,{color:"primary",children:"标签一"}),e.jsx(a,{color:"success",children:"标签二"}),e.jsx(a,{color:"warning",children:"标签三"}),e.jsx(a,{color:"danger",children:"标签四"}),e.jsx(a,{color:"info",children:"标签五"})]})};n.storyName="标签组";var p,g,f;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: '标签'
  }
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var T,y,v;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  }}>\r
      <Tag color="default">Default</Tag>\r
      <Tag color="primary">Primary</Tag>\r
      <Tag color="success">Success</Tag>\r
      <Tag color="warning">Warning</Tag>\r
      <Tag color="danger">Danger</Tag>\r
      <Tag color="info">Info</Tag>\r
    </div>
}`,...(v=(y=s.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,h,j;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>\r
      <Tag size="small">Small</Tag>\r
      <Tag size="medium">Medium</Tag>\r
      <Tag size="large">Large</Tag>\r
    </div>
}`,...(j=(h=l.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var b,S,w;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: '可点击标签',
    clickable: true
  }
}`,...(w=(S=c.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var M,E,z;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: '可删除标签',
    closable: true
  }
}`,...(z=(E=i.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var R,N,k;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  }}>\r
      <Tag color="primary">标签一</Tag>\r
      <Tag color="success">标签二</Tag>\r
      <Tag color="warning">标签三</Tag>\r
      <Tag color="danger">标签四</Tag>\r
      <Tag color="info">标签五</Tag>\r
    </div>
}`,...(k=(N=n.parameters)==null?void 0:N.docs)==null?void 0:k.source}}};const $=["Default","Colors","Sizes","Clickable","Closable","TagsGroup"];export{c as Clickable,i as Closable,s as Colors,t as Default,l as Sizes,n as TagsGroup,$ as __namedExportsOrder,V as default};
