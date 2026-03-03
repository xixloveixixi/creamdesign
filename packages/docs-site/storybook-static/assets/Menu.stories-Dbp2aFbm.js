import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as v,R as x}from"./index-ZH-6pyQh.js";import{c as T}from"./index-Dd5QUkq_.js";import{I as $}from"./Icon-eOIJIk_P.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-B5I2_UfN.js";const k=v.createContext({onSelect:()=>{},activeIndex:0,setActiveIndex:()=>{},childActiveIndex:0}),Y=r=>{const{mode:t="horizontal",onSelect:l,className:m,defaultIndex:h=0,style:g,children:d}=r,[b,c]=v.useState(h||0),[p,M]=v.useState(void 0),I=s=>{c(s),l&&l(s)},C=s=>{M(p===s?void 0:s)},w=T("menu",`menu-${t}`,m),R={onSelect:I,activeIndex:b,setActiveIndex:c,mode:t,expandedIndex:p,onToggleSubMenu:C},z=()=>d?x.Children.map(d,(s,q)=>{if(!x.isValidElement(s))return null;const i=s;if(typeof i.type=="function"){const{displayName:o}=i.type;return o==="MenuItem"||o==="SubMenu"?x.cloneElement(i,{index:i.props.index||q}):(console.warn(`Menu only accepts MenuItem or SubMenu as children, but got ${o}`),null)}else return console.warn(`Menu only accepts MenuItem or SubMenu as children, but got a ${typeof i.type}`),null}):null;return e.jsx("ul",{className:w,style:g,"data-testid":"menu-list",children:e.jsx(k.Provider,{value:R,children:z()})})};Y.__docgenInfo={description:`Menu菜单组件\r
支持水平/垂直布局，菜单项选中，子菜单展开/收起等功能\r
@param {MenuProps} props - 组件属性\r
@returns {JSX.Element} 菜单组件`,methods:[],displayName:"Menu",props:{mode:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"控制菜单布局方向，可选值：'vertical'（垂直）或'horizontal'（水平），默认值：'horizontal'"},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedIndex: string | number) => void",signature:{arguments:[{type:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},name:"selectedIndex"}],return:{name:"void"}}},description:"菜单项选中时的回调函数"},className:{required:!1,tsType:{name:"string"},description:"自定义样式类名"},defaultIndex:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"默认选中菜单项的索引"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"内联样式对象"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"菜单项内容，仅支持MenuItem和SubMenu组件"}}};const n=r=>{const{index:t=0,disabled:l=!1,className:m,style:h,children:g}=r,d=v.useContext(k),{activeIndex:b,onSelect:c,childActiveIndex:p}=d,M=T("menu-item",m,{"menu-item-disabled":l,"menu-item-active":b===t}),I=()=>{!l&&c&&t!==void 0&&c(t)};return e.jsx("li",{className:M,style:h,onClick:I,children:g})};n.displayName="MenuItem";n.__docgenInfo={description:`MenuItem菜单组件的子项组件\r
用于显示单个菜单项，支持禁用和激活状态\r
@param {MenuItemProps} props - 组件属性\r
@returns {JSX.Element} 菜单项组件`,methods:[],displayName:"MenuItem",props:{index:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"菜单项的唯一标识，用于与activeIndex比较确定是否激活"},disabled:{required:!1,tsType:{name:"boolean"},description:"是否禁用该菜单项，禁用状态下点击无效"},className:{required:!1,tsType:{name:"string"},description:"自定义样式类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"内联样式对象"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"菜单项显示的内容"}}};const a=r=>{const{index:t=0,title:l,disabled:m=!1,className:h,style:g,children:d}=r,b=v.useContext(k),{activeIndex:c,setActiveIndex:p,expandedIndex:M,onToggleSubMenu:I,mode:C}=b,w=M===t,R=()=>{t!==void 0&&p&&p(t),!m&&I&&t!==void 0&&I(t)},z=()=>d?x.Children.map(d,(i,E)=>{if(!x.isValidElement(i))return null;const o=i;if(typeof o.type=="function"){const{displayName:P}=o.type;if(P==="MenuItem"||P==="SubMenu"){const _=t!==void 0?`${t}-${E}`:E;return x.cloneElement(o,{key:_,index:_})}else return console.warn(`SubMenu only accepts MenuItem or SubMenu as children, but got ${P}`),null}else return console.warn(`SubMenu only accepts MenuItem or SubMenu as children, but got a ${typeof o.type}`),null}):null,s=T("submenu",{"submenu-expanded":w}),q=T("menu-item",h,{"menu-item-active":c===t,"menu-item-disabled":m});return e.jsxs("li",{className:q,style:g,children:[e.jsxs("div",{className:"menu-item-title",onClick:R,children:[l,e.jsx("span",{className:"submenu-arrow",children:C==="vertical"?e.jsx($,{icon:"caret-right",className:"submenu-arrow-icon"}):e.jsx($,{icon:"caret-down",className:"submenu-arrow-icon"})})]}),e.jsxs("ul",{className:s,children:[z()," "]})]})};a.displayName="SubMenu";a.__docgenInfo={description:`SubMenu菜单组件的子菜单组件\r
用于创建可展开/收起的子菜单，支持嵌套子菜单\r
@param {SubMenuProps} props - 组件属性\r
@returns {JSX.Element} 子菜单组件`,methods:[],displayName:"SubMenu",props:{index:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"子菜单的唯一标识，用于与activeIndex比较确定是否激活"},title:{required:!0,tsType:{name:"ReactNode"},description:"子菜单的标题内容"},disabled:{required:!1,tsType:{name:"boolean"},description:"是否禁用该子菜单，禁用状态下点击无效"},className:{required:!1,tsType:{name:"string"},description:"自定义样式类名"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"内联样式对象"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"子菜单项内容，仅支持MenuItem和SubMenu组件"}}};const u=Y;u.Item=n;u.SubMenu=a;const ie={title:"Menu",component:u,tags:["autodocs"],parameters:{backgrounds:{values:[{name:"red",value:"#f00"},{name:"green",value:"#0f0"},{name:"blue",value:"#00f"},{name:"dark",value:"#333"}]}},decorators:[r=>e.jsxs("div",{style:{margin:"20px",padding:"10px",border:"1px solid #ccc"},children:[e.jsx("h3",{style:{marginBottom:"15px"},children:"Menu组件示例"}),e.jsx(r,{})]})]},N={render:r=>e.jsxs(u,{...r,children:[e.jsx(n,{children:"首页"}),e.jsx(n,{children:"产品中心"}),e.jsx(n,{children:"解决方案"}),e.jsx(n,{children:"关于我们"}),e.jsx(n,{children:"联系我们"})]}),argTypes:{mode:{control:"select",options:["horizontal","vertical"],description:"菜单的布局模式"},defaultIndex:{control:"number",description:"默认选中的菜单项索引"}},args:{mode:"horizontal",defaultIndex:0}},y={render:r=>e.jsxs(u,{...r,children:[e.jsx(n,{children:"首页"}),e.jsxs(a,{title:"产品中心",children:[e.jsx(n,{children:"产品1"}),e.jsx(n,{children:"产品2"}),e.jsx(n,{children:"产品3"})]}),e.jsxs(a,{title:"解决方案",children:[e.jsx(n,{children:"方案1"}),e.jsx(n,{children:"方案2"})]}),e.jsx(n,{children:"联系我们"})]}),parameters:{backgrounds:{default:"light"}},argTypes:{mode:{control:"select",options:["horizontal","vertical"],description:"菜单的布局模式"}},args:{mode:"horizontal"}};y.storyName="带子菜单";const f={render:r=>e.jsxs(u,{...r,children:[e.jsx(n,{children:"首页"}),e.jsx(n,{disabled:!0,children:"产品中心"}),e.jsxs(a,{title:"解决方案",disabled:!0,children:[e.jsx(n,{children:"方案1"}),e.jsx(n,{children:"方案2"})]}),e.jsx(n,{children:"关于我们"}),e.jsx(n,{children:"联系我们"})]}),argTypes:{mode:{control:"select",options:["horizontal","vertical"]}},args:{mode:"horizontal"}};f.storyName="带禁用项";const S={render:r=>e.jsxs(u,{...r,children:[e.jsx(n,{children:"首页"}),e.jsx(n,{children:"产品中心"}),e.jsx(n,{children:"解决方案"}),e.jsx(n,{children:"关于我们"}),e.jsx(n,{children:"联系我们"})]}),args:{mode:"horizontal",defaultIndex:2}};S.storyName="带默认选中";const j={render:r=>e.jsxs(u,{...r,style:{width:200,...r.style},children:[e.jsx(n,{children:"首页"}),e.jsxs(a,{title:"产品中心",children:[e.jsx(n,{children:"产品1"}),e.jsx(n,{children:"产品2"}),e.jsx(n,{children:"产品3"})]}),e.jsxs(a,{title:"解决方案",children:[e.jsx(n,{children:"方案1"}),e.jsx(n,{children:"方案2"}),e.jsxs(a,{title:"方案3",children:[e.jsx(n,{children:"子方案1"}),e.jsx(n,{children:"子方案2"})]})]}),e.jsx(n,{children:"关于我们"}),e.jsx(n,{children:"联系我们"})]}),args:{mode:"vertical",defaultIndex:0}};j.storyName="垂直菜单";var A,J,V;N.parameters={...N.parameters,docs:{...(A=N.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <Menu {...args}>\r
      <MenuItem>首页</MenuItem>\r
      <MenuItem>产品中心</MenuItem>\r
      <MenuItem>解决方案</MenuItem>\r
      <MenuItem>关于我们</MenuItem>\r
      <MenuItem>联系我们</MenuItem>\r
    </Menu>,
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式'
    },
    defaultIndex: {
      control: 'number',
      description: '默认选中的菜单项索引'
    }
  },
  args: {
    mode: 'horizontal',
    defaultIndex: 0
  }
}`,...(V=(J=N.parameters)==null?void 0:J.docs)==null?void 0:V.source}}};var X,B,O;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: args => <Menu {...args}>\r
      <MenuItem>首页</MenuItem>\r
      <SubMenu title="产品中心">\r
        <MenuItem>产品1</MenuItem>\r
        <MenuItem>产品2</MenuItem>\r
        <MenuItem>产品3</MenuItem>\r
      </SubMenu>\r
      <SubMenu title="解决方案">\r
        <MenuItem>方案1</MenuItem>\r
        <MenuItem>方案2</MenuItem>\r
      </SubMenu>\r
      <MenuItem>联系我们</MenuItem>\r
    </Menu>,
  parameters: {
    backgrounds: {
      default: 'light'
    }
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '菜单的布局模式'
    }
  },
  args: {
    mode: 'horizontal'
  }
}`,...(O=(B=y.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var D,F,G;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Menu {...args}>\r
      <MenuItem>首页</MenuItem>\r
      <MenuItem disabled>产品中心</MenuItem>\r
      <SubMenu title="解决方案" disabled>\r
        <MenuItem>方案1</MenuItem>\r
        <MenuItem>方案2</MenuItem>\r
      </SubMenu>\r
      <MenuItem>关于我们</MenuItem>\r
      <MenuItem>联系我们</MenuItem>\r
    </Menu>,
  argTypes: {
    mode: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  },
  args: {
    mode: 'horizontal'
  }
}`,...(G=(F=f.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var H,K,L;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <Menu {...args}>\r
      <MenuItem>首页</MenuItem>\r
      <MenuItem>产品中心</MenuItem>\r
      <MenuItem>解决方案</MenuItem>\r
      <MenuItem>关于我们</MenuItem>\r
      <MenuItem>联系我们</MenuItem>\r
    </Menu>,
  args: {
    mode: 'horizontal',
    defaultIndex: 2
  }
}`,...(L=(K=S.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var Q,U,W;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <Menu {...args} style={{
    width: 200,
    ...args.style
  }}>\r
      <MenuItem>首页</MenuItem>\r
      <SubMenu title="产品中心">\r
        <MenuItem>产品1</MenuItem>\r
        <MenuItem>产品2</MenuItem>\r
        <MenuItem>产品3</MenuItem>\r
      </SubMenu>\r
      <SubMenu title="解决方案">\r
        <MenuItem>方案1</MenuItem>\r
        <MenuItem>方案2</MenuItem>\r
        <SubMenu title="方案3">\r
          <MenuItem>子方案1</MenuItem>\r
          <MenuItem>子方案2</MenuItem>\r
        </SubMenu>\r
      </SubMenu>\r
      <MenuItem>关于我们</MenuItem>\r
      <MenuItem>联系我们</MenuItem>\r
    </Menu>,
  args: {
    mode: 'vertical',
    defaultIndex: 0
  }
}`,...(W=(U=j.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};const oe=["默认菜单","带有子菜单的菜单","带有禁用项的菜单","带有默认选中项的菜单","垂直菜单带有子菜单"];export{oe as __namedExportsOrder,ie as default,j as 垂直菜单带有子菜单,y as 带有子菜单的菜单,f as 带有禁用项的菜单,S as 带有默认选中项的菜单,N as 默认菜单};
