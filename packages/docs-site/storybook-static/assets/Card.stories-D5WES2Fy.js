import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as t,a as s}from"./Button-CuTL28oH.js";import{c as re}from"./index-Dd5QUkq_.js";import"./_commonjsHelpers-CqkleIqs.js";const r=({title:a,extra:n,cover:x,actions:y,bordered:I=!0,hoverable:J=!1,size:K="default",loading:v=!1,className:M,style:Q,children:U})=>{const X=re("cream-card",{"cream-card--bordered":I,"cream-card--hoverable":J,"cream-card--small":K==="small","cream-card--loading":v},M),Y=a!==void 0||n!==void 0;return e.jsxs("div",{className:X,style:Q,role:"article",children:[x&&e.jsx("div",{className:"cream-card__cover","aria-hidden":"true",children:x}),Y&&e.jsxs("div",{className:"cream-card__header",children:[a&&e.jsx("div",{className:"cream-card__title",children:typeof a=="string"?e.jsx("h4",{className:"cream-card__title-text",children:a}):a}),n&&e.jsx("div",{className:"cream-card__extra",children:n})]}),e.jsx("div",{className:"cream-card__body",children:v?e.jsxs("div",{className:"cream-card__skeleton","aria-label":"加载中",children:[e.jsx("div",{className:"cream-card__skeleton-row cream-card__skeleton-row--title"}),e.jsx("div",{className:"cream-card__skeleton-row"}),e.jsx("div",{className:"cream-card__skeleton-row"}),e.jsx("div",{className:"cream-card__skeleton-row cream-card__skeleton-row--short"})]}):U}),y&&y.length>0&&e.jsx("div",{className:"cream-card__actions",role:"group","aria-label":"卡片操作",children:y.map((Z,ee)=>e.jsx("div",{className:"cream-card__action-item",children:Z},ee))})]})};r.__docgenInfo={description:"",methods:[],displayName:"Card",props:{title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"卡片标题"},extra:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"卡片标题栏右侧的附加内容"},cover:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"卡片封面（渲染在头部上方）"},actions:{required:!1,tsType:{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"},description:"操作按钮列表，渲染在卡片底部"},bordered:{required:!1,tsType:{name:"boolean"},description:"是否有边框",defaultValue:{value:"true",computed:!1}},hoverable:{required:!1,tsType:{name:"boolean"},description:"鼠标悬停时是否显示阴影效果",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'default' | 'small'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'small'"}]},description:"卡片尺寸",defaultValue:{value:"'default'",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"是否显示骨架加载状态",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"自定义类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"自定义内联样式"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"卡片内容"}}};const de={title:"Card",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{title:{control:"text",description:"卡片标题"},extra:{control:!1,description:"标题栏右侧附加内容（ReactNode）"},cover:{control:!1,description:"卡片封面（ReactNode）"},actions:{control:!1,description:"卡片底部操作按钮数组"},bordered:{control:"boolean",description:"是否显示边框"},hoverable:{control:"boolean",description:"鼠标悬停时是否显示阴影"},size:{control:{type:"select"},options:["default","small"],description:"卡片尺寸"},loading:{control:"boolean",description:"是否显示加载骨架屏"}}},u={args:{title:"卡片标题",bordered:!0,hoverable:!1,size:"default",loading:!1},render:a=>e.jsx("div",{style:{width:360},children:e.jsx(r,{...a,children:e.jsx("p",{style:{margin:0},children:"这是卡片的内容区域，可以放置任意内容，例如文字、图片或其他组件。"})})})},d={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(r,{title:"项目卡片",extra:e.jsx("a",{href:"#",children:"查看更多"}),actions:[e.jsx(t,{btnType:s.Primary,size:"small",children:"编辑"},"edit"),e.jsx(t,{btnType:s.Danger,size:"small",children:"删除"},"delete")],children:e.jsx("p",{style:{margin:0},children:"这是一个带有操作按钮和标题右侧附加内容的卡片示例。"})})})};d.storyName="带操作按钮";const i={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(r,{cover:e.jsx("img",{src:"https://picsum.photos/360/200",alt:"封面图",style:{width:"100%",height:200,objectFit:"cover"}}),title:"图文卡片",actions:[e.jsx(t,{btnType:s.Ghost,size:"small",children:"👍 点赞"},"like"),e.jsx(t,{btnType:s.Ghost,size:"small",children:"🔗 分享"},"share")],children:e.jsx("p",{style:{margin:0},children:"带封面图的卡片，常用于文章列表、商品展示等场景。"})})})};i.storyName="带封面图";const l={render:()=>e.jsx("div",{style:{width:360,background:"#f5f3ff",padding:24,borderRadius:8},children:e.jsx(r,{bordered:!1,title:"无边框卡片",children:e.jsx("p",{style:{margin:0},children:"无边框卡片通过阴影区分层级，适合放置在彩色背景上。"})})})};l.storyName="无边框";const o={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(r,{title:"悬停卡片",hoverable:!0,children:e.jsx("p",{style:{margin:0},children:"将鼠标悬停在此卡片上，可以看到上浮和阴影效果。"})})})};o.storyName="悬停效果";const c={render:()=>e.jsx("div",{style:{width:300},children:e.jsx(r,{title:"小尺寸卡片",size:"small",extra:e.jsx("span",{children:"附加"}),actions:[e.jsx(t,{btnType:s.Primary,size:"small",children:"确认"},"ok")],children:e.jsx("p",{style:{margin:0,fontSize:14},children:"小尺寸卡片适用于信息密集的布局场景。"})})})};c.storyName="小尺寸";const m={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(r,{title:"加载中",loading:!0,children:e.jsx("p",{style:{margin:0},children:"该内容不会显示。"})})})};m.storyName="加载骨架屏";const p={render:()=>e.jsx("div",{style:{width:360},children:e.jsx(r,{children:e.jsx("p",{style:{margin:0},children:"这是一张仅有内容区域的简洁卡片，没有标题和操作按钮。"})})})};p.storyName="仅内容";const h={render:()=>e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",width:760},children:["设计","开发","测试"].map((a,n)=>e.jsx("div",{style:{width:220},children:e.jsx(r,{title:`${a}任务`,hoverable:!0,extra:e.jsx("span",{style:{color:"#9333ea",fontSize:12},children:"进行中"}),actions:[e.jsx(t,{btnType:s.Text,size:"small",children:"详情"},"detail")],children:e.jsxs("p",{style:{margin:0,fontSize:14,color:"#616161"},children:["这是 ",a," 阶段的任务说明，点击详情查看更多。"]})})},n))})};h.storyName="卡片列表";var f,g,j;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: '卡片标题',
    bordered: true,
    hoverable: false,
    size: 'default',
    loading: false
  },
  render: args => <div style={{
    width: 360
  }}>\r
      <Card {...args}>\r
        <p style={{
        margin: 0
      }}>\r
          这是卡片的内容区域，可以放置任意内容，例如文字、图片或其他组件。\r
        </p>\r
      </Card>\r
    </div>
}`,...(j=(g=u.parameters)==null?void 0:g.docs)==null?void 0:j.source}}};var b,N,w;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Card title="项目卡片" extra={<a href="#">查看更多</a>} actions={[<Button key="edit" btnType={ButtonType.Primary} size="small">\r
            编辑\r
          </Button>, <Button key="delete" btnType={ButtonType.Danger} size="small">\r
            删除\r
          </Button>]}>\r
        <p style={{
        margin: 0
      }}>\r
          这是一个带有操作按钮和标题右侧附加内容的卡片示例。\r
        </p>\r
      </Card>\r
    </div>
}`,...(w=(N=d.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var _,T,C;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Card cover={<img src="https://picsum.photos/360/200" alt="封面图" style={{
      width: '100%',
      height: 200,
      objectFit: 'cover'
    }} />} title="图文卡片" actions={[<Button key="like" btnType={ButtonType.Ghost} size="small">\r
            👍 点赞\r
          </Button>, <Button key="share" btnType={ButtonType.Ghost} size="small">\r
            🔗 分享\r
          </Button>]}>\r
        <p style={{
        margin: 0
      }}>\r
          带封面图的卡片，常用于文章列表、商品展示等场景。\r
        </p>\r
      </Card>\r
    </div>
}`,...(C=(T=i.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var R,z,B;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360,
    background: '#f5f3ff',
    padding: 24,
    borderRadius: 8
  }}>\r
      <Card bordered={false} title="无边框卡片">\r
        <p style={{
        margin: 0
      }}>\r
          无边框卡片通过阴影区分层级，适合放置在彩色背景上。\r
        </p>\r
      </Card>\r
    </div>
}`,...(B=(z=l.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var S,k,q;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Card title="悬停卡片" hoverable>\r
        <p style={{
        margin: 0
      }}>\r
          将鼠标悬停在此卡片上，可以看到上浮和阴影效果。\r
        </p>\r
      </Card>\r
    </div>
}`,...(q=(k=o.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var P,W,D;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300
  }}>\r
      <Card title="小尺寸卡片" size="small" extra={<span>附加</span>} actions={[<Button key="ok" btnType={ButtonType.Primary} size="small">\r
            确认\r
          </Button>]}>\r
        <p style={{
        margin: 0,
        fontSize: 14
      }}>\r
          小尺寸卡片适用于信息密集的布局场景。\r
        </p>\r
      </Card>\r
    </div>
}`,...(D=(W=c.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var G,L,V;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Card title="加载中" loading>\r
        <p style={{
        margin: 0
      }}>该内容不会显示。</p>\r
      </Card>\r
    </div>
}`,...(V=(L=m.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var A,H,O;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>\r
      <Card>\r
        <p style={{
        margin: 0
      }}>\r
          这是一张仅有内容区域的简洁卡片，没有标题和操作按钮。\r
        </p>\r
      </Card>\r
    </div>
}`,...(O=(H=p.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var E,F,$;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    width: 760
  }}>\r
      {['设计', '开发', '测试'].map((tag, i) => <div key={i} style={{
      width: 220
    }}>\r
          <Card title={\`\${tag}任务\`} hoverable extra={<span style={{
        color: '#9333ea',
        fontSize: 12
      }}>进行中</span>} actions={[<Button key="detail" btnType={ButtonType.Text} size="small">\r
                详情\r
              </Button>]}>\r
            <p style={{
          margin: 0,
          fontSize: 14,
          color: '#616161'
        }}>\r
              这是 {tag} 阶段的任务说明，点击详情查看更多。\r
            </p>\r
          </Card>\r
        </div>)}\r
    </div>
}`,...($=(F=h.parameters)==null?void 0:F.docs)==null?void 0:$.source}}};const ie=["Default","WithActions","WithCover","NoBorder","Hoverable","Small","Loading","ContentOnly","CardList"];export{h as CardList,p as ContentOnly,u as Default,o as Hoverable,m as Loading,l as NoBorder,c as Small,d as WithActions,i as WithCover,ie as __namedExportsOrder,de as default};
