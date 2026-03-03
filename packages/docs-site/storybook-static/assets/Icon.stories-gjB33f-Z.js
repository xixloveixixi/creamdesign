import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as i}from"./Icon-eOIJIk_P.js";import{f as m,a as X,b as F,c as J,d as K,e as Q,g as P,h as V,i as Y,j as _,k as $,l as B,m as L,n as Z,o as q,p as g,q as ee,r as re,s as ne,t as ie}from"./index-Bdtn3t7x.js";import"./index-B5I2_UfN.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Dd5QUkq_.js";const ge={title:"Icon",component:i,tags:["autodocs"],argTypes:{theme:{control:{type:"select"},options:["primary","secondary","success","danger","warning","info","light","dark"],description:"图标主题颜色"},size:{control:{type:"select"},options:["xs","sm","1x","lg","2x","3x","4x","5x"],description:"图标大小"},spin:{control:"boolean",description:"旋转动画"},pulse:{control:"boolean",description:"脉冲动画"}}},a={args:{icon:m,theme:"primary",size:"2x"}};a.storyName="默认图标";const ae=[{theme:"primary"},{theme:"secondary"},{theme:"success"},{theme:"danger"},{theme:"warning"},{theme:"info"},{theme:"light",bg:"#333"},{theme:"dark"}],s={render:()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"32px",padding:"24px"},children:ae.map(({theme:r,bg:n})=>e.jsxs("div",{style:{textAlign:"center",padding:"12px",borderRadius:"8px",background:n??"transparent",minWidth:"72px"},children:[e.jsx(i,{icon:_,theme:r,size:"2x"}),e.jsx("div",{style:{marginTop:"10px",fontSize:"12px",color:n?"#fff":"inherit",fontWeight:500},children:r})]},r))})};s.storyName="主题颜色";const se=["xs","sm","1x","lg","2x","3x","4x","5x"],o={render:()=>e.jsx("div",{style:{display:"flex",gap:"32px",alignItems:"flex-end",padding:"24px",flexWrap:"wrap"},children:se.map(r=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:m,size:r,theme:"primary"}),e.jsx("div",{style:{marginTop:"10px",fontSize:"12px",fontWeight:500},children:r})]},r))})};o.storyName="图标尺寸";const oe=[{icon:ee,theme:"success",label:"成功",color:"#4caf50"},{icon:re,theme:"danger",label:"失败",color:"#f44336"},{icon:ne,theme:"warning",label:"警告",color:"#ffc107"},{icon:ie,theme:"info",label:"信息",color:"#2196f3"}],t={render:()=>e.jsx("div",{style:{display:"flex",gap:"40px",padding:"24px",alignItems:"center"},children:oe.map(({icon:r,theme:n,label:x,color:f})=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:r,theme:n,size:"3x"}),e.jsx("div",{style:{marginTop:"10px",fontSize:"13px",color:f,fontWeight:600},children:x})]},x))})};t.storyName="状态图标";const l={render:()=>e.jsx("div",{style:{display:"flex",gap:"24px",padding:"24px",alignItems:"center"},children:[{icon:X,label:"向左"},{icon:F,label:"向右"},{icon:J,label:"向上"},{icon:K,label:"向下"}].map(({icon:r,label:n})=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:r,theme:"primary",size:"2x"}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px"},children:n})]},n))})};l.storyName="方向图标";const p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"40px",padding:"24px",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:g,theme:"primary",size:"3x",spin:!0}),e.jsx("div",{style:{marginTop:"12px",fontSize:"12px"},children:"spin"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:P,theme:"secondary",size:"3x",spin:!0}),e.jsx("div",{style:{marginTop:"12px",fontSize:"12px"},children:"faGear + spin"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(i,{icon:g,theme:"info",size:"3x",pulse:!0}),e.jsx("div",{style:{marginTop:"12px",fontSize:"12px"},children:"pulse"})]})]})};p.storyName="旋转动画";const te=[{icon:m,label:"faUser"},{icon:Q,label:"faHouse"},{icon:P,label:"faGear"},{icon:V,label:"faBell"},{icon:Y,label:"faHeart"},{icon:_,label:"faStar"},{icon:$,label:"faSearch"},{icon:B,label:"faTrash"},{icon:L,label:"faPen"},{icon:Z,label:"faPlus"},{icon:q,label:"faDownload"}],c={render:()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"24px",padding:"24px"},children:te.map(({icon:r,label:n})=>e.jsxs("div",{style:{textAlign:"center",width:"88px",padding:"12px 8px",borderRadius:"8px",border:"1px solid #e0e0e0"},children:[e.jsx(i,{icon:r,size:"2x",theme:"primary"}),e.jsx("div",{style:{marginTop:"10px",fontSize:"10px",color:"#616161"},children:n})]},n))})};c.storyName="常用图标";const d={render:()=>e.jsx("div",{style:{display:"flex",gap:"16px",padding:"24px",flexWrap:"wrap"},children:[{icon:Z,label:"新增",bg:"#9333ea",color:"#fff"},{icon:B,label:"删除",bg:"#f44336",color:"#fff"},{icon:L,label:"编辑",bg:"#2196f3",color:"#fff"},{icon:q,label:"下载",bg:"#4caf50",color:"#fff"}].map(({icon:r,label:n,bg:x,color:f})=>e.jsxs("button",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",borderRadius:"6px",border:"none",background:x,color:f,fontWeight:600,cursor:"pointer",fontSize:"14px"},children:[e.jsx(i,{icon:r}),n]},n))})};d.storyName="图标按钮示例";var y,h,b;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    icon: faUser,
    theme: 'primary',
    size: '2x'
  }
}`,...(b=(h=a.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var v,u,S;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '32px',
    padding: '24px'
  }}>\r
      {THEMES.map(({
      theme,
      bg
    }) => <div key={theme as string} style={{
      textAlign: 'center',
      padding: '12px',
      borderRadius: '8px',
      background: bg ?? 'transparent',
      minWidth: '72px'
    }}>\r
          <Icon icon={faStar} theme={theme as IconTheme} size="2x" />\r
          <div style={{
        marginTop: '10px',
        fontSize: '12px',
        color: bg ? '#fff' : 'inherit',
        fontWeight: 500
      }}>\r
            {theme}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(S=(u=s.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var z,I,j;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-end',
    padding: '24px',
    flexWrap: 'wrap'
  }}>\r
      {SIZES.map(size => <div key={size} style={{
      textAlign: 'center'
    }}>\r
          <Icon icon={faUser} size={size} theme="primary" />\r
          <div style={{
        marginTop: '10px',
        fontSize: '12px',
        fontWeight: 500
      }}>\r
            {size}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(j=(I=o.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var T,w,A;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px',
    padding: '24px',
    alignItems: 'center'
  }}>\r
      {STATUS_ICONS.map(({
      icon,
      theme,
      label,
      color
    }) => <div key={label} style={{
      textAlign: 'center'
    }}>\r
          <Icon icon={icon} theme={theme} size="3x" />\r
          <div style={{
        marginTop: '10px',
        fontSize: '13px',
        color,
        fontWeight: 600
      }}>\r
            {label}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(A=(w=t.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var W,k,C;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '24px',
    padding: '24px',
    alignItems: 'center'
  }}>\r
      {[{
      icon: faArrowLeft,
      label: '向左'
    }, {
      icon: faArrowRight,
      label: '向右'
    }, {
      icon: faArrowUp,
      label: '向上'
    }, {
      icon: faArrowDown,
      label: '向下'
    }].map(({
      icon,
      label
    }) => <div key={label} style={{
      textAlign: 'center'
    }}>\r
          <Icon icon={icon} theme="primary" size="2x" />\r
          <div style={{
        marginTop: '8px',
        fontSize: '12px'
      }}>{label}</div>\r
        </div>)}\r
    </div>
}`,...(C=(k=l.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var N,E,O;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '40px',
    padding: '24px',
    alignItems: 'center'
  }}>\r
      <div style={{
      textAlign: 'center'
    }}>\r
        <Icon icon={faSpinner} theme="primary" size="3x" spin />\r
        <div style={{
        marginTop: '12px',
        fontSize: '12px'
      }}>spin</div>\r
      </div>\r
      <div style={{
      textAlign: 'center'
    }}>\r
        <Icon icon={faGear} theme="secondary" size="3x" spin />\r
        <div style={{
        marginTop: '12px',
        fontSize: '12px'
      }}>faGear + spin</div>\r
      </div>\r
      <div style={{
      textAlign: 'center'
    }}>\r
        <Icon icon={faSpinner} theme="info" size="3x" pulse />\r
        <div style={{
        marginTop: '12px',
        fontSize: '12px'
      }}>pulse</div>\r
      </div>\r
    </div>
}`,...(O=(E=p.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,U,D;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    padding: '24px'
  }}>\r
      {COMMON_ICONS.map(({
      icon,
      label
    }) => <div key={label} style={{
      textAlign: 'center',
      width: '88px',
      padding: '12px 8px',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>\r
          <Icon icon={icon} size="2x" theme="primary" />\r
          <div style={{
        marginTop: '10px',
        fontSize: '10px',
        color: '#616161'
      }}>\r
            {label}\r
          </div>\r
        </div>)}\r
    </div>
}`,...(D=(U=c.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var M,G,H;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    padding: '24px',
    flexWrap: 'wrap'
  }}>\r
      {[{
      icon: faPlus,
      label: '新增',
      bg: '#9333ea',
      color: '#fff'
    }, {
      icon: faTrash,
      label: '删除',
      bg: '#f44336',
      color: '#fff'
    }, {
      icon: faPen,
      label: '编辑',
      bg: '#2196f3',
      color: '#fff'
    }, {
      icon: faDownload,
      label: '下载',
      bg: '#4caf50',
      color: '#fff'
    }].map(({
      icon,
      label,
      bg,
      color
    }) => <button key={label} style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      background: bg,
      color,
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '14px'
    }}>\r
          <Icon icon={icon} />\r
          {label}\r
        </button>)}\r
    </div>
}`,...(H=(G=d.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const ye=["Default","Themes","Sizes","StatusIcons","ArrowIcons","SpinningIcons","CommonIcons","InButtonContext"];export{l as ArrowIcons,c as CommonIcons,a as Default,d as InButtonContext,o as Sizes,p as SpinningIcons,t as StatusIcons,s as Themes,ye as __namedExportsOrder,ge as default};
