import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as j}from"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const te=({status:t})=>t==="completed"?e.jsx("svg",{viewBox:"0 0 16 16",width:"10",height:"10",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M2.5 8l4 4 7-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):t==="processing"?e.jsx("span",{className:"cream-timeline__processing-dot","aria-hidden":"true"}):null,ne=({title:t,content:s,timestamp:i,status:r="pending",icon:m,color:o,className:y,isLast:a,mode:_,direction:N,index:K})=>{const Q=N==="vertical"&&_==="alternate"&&K%2!==0,Y=j("cream-timeline__item",`cream-timeline__item--${r}`,{"cream-timeline__item--last":a,"cream-timeline__item--alternate-right":Q,"cream-timeline__item--mode-right":N==="vertical"&&_==="right"},y),Z=o?{backgroundColor:o,borderColor:o}:{},ee=r==="completed"?"已完成":r==="processing"?"进行中":"待处理";return e.jsxs("li",{className:Y,"aria-label":`时间节点：${ee}`,children:[!a&&e.jsx("div",{className:"cream-timeline__tail","aria-hidden":"true"}),e.jsx("div",{className:j("cream-timeline__node",{"cream-timeline__node--custom":!!m}),style:Z,"aria-hidden":"true",children:m?e.jsx("span",{className:"cream-timeline__node-inner",children:m}):e.jsx("span",{className:"cream-timeline__node-inner",children:e.jsx(te,{status:r})})}),e.jsxs("div",{className:"cream-timeline__content",children:[i&&e.jsx("time",{className:"cream-timeline__timestamp",dateTime:i,children:i}),t&&e.jsx("div",{className:"cream-timeline__title",children:typeof t=="string"?e.jsx("span",{className:"cream-timeline__title-text",children:t}):t}),s&&e.jsx("div",{className:"cream-timeline__body",children:s})]})]})},n=({items:t=[],direction:s="vertical",mode:i="left",className:r,style:m})=>{const o=j("cream-timeline",`cream-timeline--${s}`,{[`cream-timeline--mode-${i}`]:s==="vertical"},r);return e.jsx("ol",{className:o,style:m,"aria-label":"时间轴",children:t.map((y,a)=>e.jsx(ne,{...y,isLast:a===t.length-1,mode:i,direction:s,index:a},a))})};n.__docgenInfo={description:"",methods:[],displayName:"Timeline",props:{items:{required:!1,tsType:{name:"Array",elements:[{name:"TimelineItemProps"}],raw:"TimelineItemProps[]"},description:"时间轴节点数据列表",defaultValue:{value:"[]",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"排列方向，垂直或水平",defaultValue:{value:"'vertical'",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'alternate'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'alternate'"}]},description:"内容排列模式（仅垂直模式生效）",defaultValue:{value:"'left'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"自定义根元素类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"自定义内联样式"}}};const ae={title:"Timeline",component:n,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{direction:{control:{type:"select"},options:["vertical","horizontal"],description:"排列方向"},mode:{control:{type:"select"},options:["left","right","alternate"],description:"内容排列模式"}}},x=[{title:"需求评审",content:"完成产品需求文档评审，确认功能范围与优先级。",timestamp:"2026-01-10 10:00",status:"completed"},{title:"设计稿完成",content:"完成 UI/UX 设计稿，并通过设计评审。",timestamp:"2026-01-15 14:30",status:"completed"},{title:"开发中",content:"前端组件开发，目前正在进行中。",timestamp:"2026-02-01 09:00",status:"processing"},{title:"测试阶段",content:"功能测试、性能测试与兼容性测试。",timestamp:"2026-02-20 10:00",status:"pending"},{title:"上线发布",content:"部署至生产环境，完成上线。",timestamp:"2026-03-01 18:00",status:"pending"}],l={args:{items:x,direction:"vertical",mode:"left"},render:t=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:x,...t})})};l.storyName="默认时间轴";const c={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:[{title:"已完成（completed）",content:"该步骤已成功完成。",timestamp:"2026-01-10",status:"completed"},{title:"进行中（processing）",content:"该步骤正在进行中，带有脉冲动画。",timestamp:"2026-02-01",status:"processing"},{title:"待处理（pending）",content:"该步骤尚未开始。",timestamp:"2026-03-01",status:"pending"}]})})};c.storyName="三种节点状态";const d={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:[{title:"创建账号",content:"填写基本信息完成注册。",timestamp:"2026-01-01",status:"completed",icon:"👤"},{title:"绑定手机",content:"验证手机号码以保障账号安全。",timestamp:"2026-01-02",status:"completed",icon:"📱"},{title:"实名认证",content:"上传证件完成身份认证，处理中。",timestamp:"2026-01-03",status:"processing",icon:"🪪"},{title:"开通服务",content:"认证完成后即可开通相关服务。",timestamp:"2026-01-10",status:"pending",icon:"🚀"}]})})};d.storyName="自定义图标";const p={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:[{title:"紫色节点",content:"使用品牌主色。",timestamp:"2026-01-01",color:"#a855f7"},{title:"橙色节点",content:"使用警告色。",timestamp:"2026-01-02",color:"#f97316"},{title:"蓝色节点",content:"使用信息色。",timestamp:"2026-01-03",color:"#2196f3"},{title:"红色节点",content:"使用错误色。",timestamp:"2026-01-04",color:"#f44336"}]})})};p.storyName="自定义节点颜色";const u={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:x,direction:"vertical",mode:"right"})})};u.storyName="垂直居右模式";const g={render:()=>e.jsx("div",{style:{width:640},children:e.jsx(n,{items:x,direction:"vertical",mode:"alternate"})})};g.storyName="垂直交替模式";const h={render:()=>e.jsx("div",{style:{width:"100%",maxWidth:720},children:e.jsx(n,{direction:"horizontal",items:[{title:"立项",timestamp:"1月",status:"completed"},{title:"设计",timestamp:"2月",status:"completed"},{title:"开发",timestamp:"3月",status:"processing"},{title:"测试",timestamp:"4月",status:"pending"},{title:"发布",timestamp:"5月",status:"pending"}]})})};h.storyName="水平时间轴";const f={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(n,{items:[{title:"提交申请",timestamp:"周一",status:"completed"},{title:"审核中",timestamp:"周三",status:"processing"},{title:"等待审批",timestamp:"周五",status:"pending"}]})})};f.storyName="仅标题模式";const v={render:()=>e.jsx("div",{style:{width:480},children:e.jsx(n,{items:[{title:e.jsxs("span",{children:["需求评审"," ",e.jsx("span",{style:{fontSize:12,color:"#4caf50",background:"#e8f5e9",borderRadius:4,padding:"1px 6px",marginLeft:6},children:"已完成"})]}),content:"完成产品需求文档评审。",timestamp:"2026-01-10",status:"completed"},{title:e.jsxs("span",{children:["开发阶段"," ",e.jsx("span",{style:{fontSize:12,color:"#9333ea",background:"#f5f3ff",borderRadius:4,padding:"1px 6px",marginLeft:6},children:"进行中"})]}),content:"前端、后端并行开发。",timestamp:"2026-02-01",status:"processing"},{title:"上线发布",content:"生产环境部署。",timestamp:"2026-03-01",status:"pending"}]})})};v.storyName="富文本标题";var T,w,S;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: baseItems,
    direction: 'vertical',
    mode: 'left'
  },
  render: args => <div style={{
    width: 480
  }}>\r
      <Timeline items={baseItems} {...args} />\r
    </div>
}`,...(S=(w=l.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var b,C,I;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>\r
      <Timeline items={[{
      title: '已完成（completed）',
      content: '该步骤已成功完成。',
      timestamp: '2026-01-10',
      status: 'completed'
    }, {
      title: '进行中（processing）',
      content: '该步骤正在进行中，带有脉冲动画。',
      timestamp: '2026-02-01',
      status: 'processing'
    }, {
      title: '待处理（pending）',
      content: '该步骤尚未开始。',
      timestamp: '2026-03-01',
      status: 'pending'
    }]} />\r
    </div>
}`,...(I=(C=c.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var R,z,k;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>\r
      <Timeline items={[{
      title: '创建账号',
      content: '填写基本信息完成注册。',
      timestamp: '2026-01-01',
      status: 'completed',
      icon: '👤'
    }, {
      title: '绑定手机',
      content: '验证手机号码以保障账号安全。',
      timestamp: '2026-01-02',
      status: 'completed',
      icon: '📱'
    }, {
      title: '实名认证',
      content: '上传证件完成身份认证，处理中。',
      timestamp: '2026-01-03',
      status: 'processing',
      icon: '🪪'
    }, {
      title: '开通服务',
      content: '认证完成后即可开通相关服务。',
      timestamp: '2026-01-10',
      status: 'pending',
      icon: '🚀'
    }]} />\r
    </div>
}`,...(k=(z=d.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var L,q,M;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>\r
      <Timeline items={[{
      title: '紫色节点',
      content: '使用品牌主色。',
      timestamp: '2026-01-01',
      color: '#a855f7'
    }, {
      title: '橙色节点',
      content: '使用警告色。',
      timestamp: '2026-01-02',
      color: '#f97316'
    }, {
      title: '蓝色节点',
      content: '使用信息色。',
      timestamp: '2026-01-03',
      color: '#2196f3'
    }, {
      title: '红色节点',
      content: '使用错误色。',
      timestamp: '2026-01-04',
      color: '#f44336'
    }]} />\r
    </div>
}`,...(M=(q=p.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var V,A,P;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>\r
      <Timeline items={baseItems} direction="vertical" mode="right" />\r
    </div>
}`,...(P=(A=u.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var $,D,O;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 640
  }}>\r
      <Timeline items={baseItems} direction="vertical" mode="alternate" />\r
    </div>
}`,...(O=(D=g.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var W,E,H;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '100%',
    maxWidth: 720
  }}>\r
      <Timeline direction="horizontal" items={[{
      title: '立项',
      timestamp: '1月',
      status: 'completed'
    }, {
      title: '设计',
      timestamp: '2月',
      status: 'completed'
    }, {
      title: '开发',
      timestamp: '3月',
      status: 'processing'
    }, {
      title: '测试',
      timestamp: '4月',
      status: 'pending'
    }, {
      title: '发布',
      timestamp: '5月',
      status: 'pending'
    }]} />\r
    </div>
}`,...(H=(E=h.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var U,B,X;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Timeline items={[{
      title: '提交申请',
      timestamp: '周一',
      status: 'completed'
    }, {
      title: '审核中',
      timestamp: '周三',
      status: 'processing'
    }, {
      title: '等待审批',
      timestamp: '周五',
      status: 'pending'
    }]} />\r
    </div>
}`,...(X=(B=f.parameters)==null?void 0:B.docs)==null?void 0:X.source}}};var F,G,J;v.parameters={...v.parameters,docs:{...(F=v.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 480
  }}>\r
      <Timeline items={[{
      title: <span>\r
                需求评审{' '}\r
                <span style={{
          fontSize: 12,
          color: '#4caf50',
          background: '#e8f5e9',
          borderRadius: 4,
          padding: '1px 6px',
          marginLeft: 6
        }}>\r
                  已完成\r
                </span>\r
              </span>,
      content: '完成产品需求文档评审。',
      timestamp: '2026-01-10',
      status: 'completed'
    }, {
      title: <span>\r
                开发阶段{' '}\r
                <span style={{
          fontSize: 12,
          color: '#9333ea',
          background: '#f5f3ff',
          borderRadius: 4,
          padding: '1px 6px',
          marginLeft: 6
        }}>\r
                  进行中\r
                </span>\r
              </span>,
      content: '前端、后端并行开发。',
      timestamp: '2026-02-01',
      status: 'processing'
    }, {
      title: '上线发布',
      content: '生产环境部署。',
      timestamp: '2026-03-01',
      status: 'pending'
    }]} />\r
    </div>
}`,...(J=(G=v.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};const me=["Default","StatusVariants","CustomIcon","CustomColor","ModeRight","ModeAlternate","Horizontal","TitleOnly","RichTitle"];export{p as CustomColor,d as CustomIcon,l as Default,h as Horizontal,g as ModeAlternate,u as ModeRight,v as RichTitle,c as StatusVariants,f as TitleOnly,me as __namedExportsOrder,ae as default};
