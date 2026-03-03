import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{B as ne,b as ae,a as se}from"./Button-CuTL28oH.js";import{r as s}from"./index-ZH-6pyQh.js";import{I as _}from"./Icon-eOIJIk_P.js";import{v as X,w as Z,x as ee,q as xe}from"./index-Bdtn3t7x.js";import{P as Ie}from"./Pagination-CndB2CSZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-B5I2_UfN.js";import"./index-Dd5QUkq_.js";const pe=()=>{const t=s.useContext(Q),c=(t==null?void 0:t.columns)||[],r=t==null?void 0:t.rowSelection,e=t==null?void 0:t.isAllRowsSelected,o=t==null?void 0:t.isSomeRowsSelected,a=t==null?void 0:t.toggleAllRowsSelection,u=!!r,y=(r==null?void 0:r.type)||"checkbox",h=(r==null?void 0:r.hideSelectAll)||!1,x=(r==null?void 0:r.columnWidth)||80,T=r==null?void 0:r.columnTitle,b=s.useCallback(()=>{if(a){const d=(e==null?void 0:e())||!1;a(!d)}},[a,e]),v=()=>{if(!u||h)return null;const d=(e==null?void 0:e())||!1,l=(o==null?void 0:o())||!1;return n.jsx("th",{className:"cream-table-selection-column",style:{width:`${x}px`,minWidth:`${x}px`,maxWidth:`${x}px`,textAlign:"center",padding:"0.75rem"},children:T||n.jsx("div",{onClick:b,onMouseDown:I=>I.preventDefault(),style:{cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",userSelect:"none",width:"100%",height:"100%",minHeight:"40px",minWidth:"40px"},title:d?"取消全选":"全选",children:y==="checkbox"?l?n.jsx(_,{icon:X,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):d?n.jsx(_,{icon:X,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):n.jsx(_,{icon:Z,style:{color:"#d9d9d9",fontSize:"20px"}}):n.jsx(_,{icon:ee,style:{color:"#d9d9d9",fontSize:"20px"}})})})};return t?n.jsx("thead",{children:n.jsxs("tr",{children:[v(),c.map(d=>{const l=d.align?`text-${d.align==="center"?"center":d.align==="right"?"right":"left"}`:"text-left",I=d.fixed?`fixed-${d.fixed}`:"",w=[l,I].filter(Boolean).join(" ");return n.jsx("th",{className:w||void 0,style:d.width?{width:d.width}:void 0,children:d.title},d.key)})]})}):null};pe.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};const be=s.memo(()=>{const t=s.useContext(Q),c=(t==null?void 0:t.paginatedData)||[],r=(t==null?void 0:t.columns)||[],e=t==null?void 0:t.rowSelection,o=t==null?void 0:t.isRowSelected,a=t==null?void 0:t.toggleRowSelection,u=!!e,y=(e==null?void 0:e.type)||"checkbox",h=(e==null?void 0:e.columnWidth)||80,x=e==null?void 0:e.getCheckboxProps,T=s.useCallback(b=>{if(!u)return null;const v=(o==null?void 0:o(b))||!1,l=((x==null?void 0:x(b))||{}).disabled||!1,I=w=>{w.stopPropagation(),!l&&a&&a(b)};return n.jsx("td",{className:"cream-table-selection-column",style:{width:`${h}px`,minWidth:`${h}px`,maxWidth:`${h}px`,textAlign:"center",padding:"0.75rem",cursor:l?"not-allowed":"pointer",opacity:l?.5:1,position:"relative"},onClick:I,onMouseDown:w=>{l||w.preventDefault()},children:n.jsx("div",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",userSelect:"none",minHeight:"40px",minWidth:"40px"},children:y==="checkbox"?v?n.jsx(_,{icon:X,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):n.jsx(_,{icon:Z,style:{color:"#d9d9d9",fontSize:"20px"}}):v?n.jsx(_,{icon:xe,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):n.jsx(_,{icon:ee,style:{color:"#d9d9d9",fontSize:"20px"}})})})},[u,y,h,o,a,x]);return t?n.jsx("tbody",{children:c.map((b,v)=>{const d=(o==null?void 0:o(b))||!1;return n.jsxs("tr",{className:d?"selected":void 0,children:[T(b),r.map(l=>{const I=l.align?`text-${l.align==="center"?"center":l.align==="right"?"right":"left"}`:"text-left",w=l.fixed?`fixed-${l.fixed}`:"",P=[I,w].filter(Boolean).join(" "),p=((N,B)=>B.dataIndex?Array.isArray(B.dataIndex)?B.dataIndex.reduce((A,m)=>A==null?void 0:A[m],N):N[B.dataIndex]:N[B.key])(b,l),k=l.render?l.render(p,b,v):p;return n.jsx("td",{className:P||void 0,style:l.width?{width:l.width}:void 0,children:k},l.key)})]},b.key||v)})}):null});be.__docgenInfo={description:"",methods:[],displayName:"TableBody"};const ve=()=>{const t=s.useContext(Q),{pagination:c}=t??{},r=c===!1,e=(()=>{if(!r)return c===!0||c===void 0?{}:c})(),o=(t==null?void 0:t.total)??0,a=(e==null?void 0:e.total)??o,u=(e==null?void 0:e.pageSize)??(e==null?void 0:e.defaultPageSize)??10,y=(e==null?void 0:e.current)??(e==null?void 0:e.defaultCurrent)??1,[h,x]=s.useState(y),[T,b]=s.useState(u),v=(e==null?void 0:e.current)!==void 0,d=(e==null?void 0:e.pageSize)!==void 0,l=v?e.current:h,I=d?e.pageSize:T,w=(t==null?void 0:t.tableData)??[],P=s.useMemo(()=>{if(!t)return[];if(r||(e==null?void 0:e.total)!==void 0)return w;const i=(l-1)*I,S=i+I;return w.slice(i,S)},[t,w,l,I,r,e==null?void 0:e.total]),D=s.useRef(t==null?void 0:t.setPaginatedData),p=s.useRef([]),k=s.useRef(0);s.useEffect(()=>{D.current=t==null?void 0:t.setPaginatedData},[t==null?void 0:t.setPaginatedData]),s.useEffect(()=>{const i=p.current,S=k.current,W=P.length;(S!==W||W>0&&i.some((K,O)=>K!==P[O]))&&D.current&&(D.current(P),p.current=P,k.current=W)},[P]);const N=(i,S)=>{const W=S??I;v||x(i),S!==void 0&&!d&&b(S),e!=null&&e.onChange&&e.onChange(i,W)},B=i=>{const S=Math.max(1,Math.ceil(a/i)),W=Math.min(l,S);d||b(i),v||x(W),e!=null&&e.onShowSizeChange&&e.onShowSizeChange(W,i),e!=null&&e.onChange&&e.onChange(W,i)};if(s.useEffect(()=>{v&&(e==null?void 0:e.current)!==void 0&&x(e.current)},[e==null?void 0:e.current,v]),s.useEffect(()=>{d&&(e==null?void 0:e.pageSize)!==void 0&&b(e.pageSize)},[e==null?void 0:e.pageSize,d]),!t||c===!1)return null;const A=(e==null?void 0:e.showTotal)??!0,m=(e==null?void 0:e.showSizeChanger)??!0,R=t.columns,f=!!t.rowSelection?R.length+1:R.length;return n.jsx("tfoot",{className:"cream-table-foot",children:n.jsx("tr",{children:n.jsx("td",{colSpan:f,children:n.jsx("div",{className:"cream-table-foot-content",children:n.jsx(Ie,{total:a,current:l,pageSize:I,showTotal:A,showSizeChanger:m,onChange:(i,S)=>{N(i,S)},onPageSizeChange:i=>{B(i)}})})})})})};ve.__docgenInfo={description:"",methods:[],displayName:"TableFoot"};function ke({data:t,estimateSize:c,containerHeight:r,overscan:e=3,onScroll:o}){const[a,u]=s.useState(0),y=s.useRef(null),h=s.useRef(0),x=s.useRef(null),T=s.useCallback(p=>{const k=Math.floor(p/c);return Math.max(0,k-1)},[c]),{startIndex:b,endIndex:v,startOffset:d,virtualItems:l,totalHeight:I}=s.useMemo(()=>{const p=t.length*c,k=T(a),N=Math.max(0,k-e),B=Math.max(r,1),A=Math.ceil(B/c),m=Math.min(N+A+e*2,t.length),R=t.slice(N,m),H=N*c;return{startIndex:N,endIndex:m,startOffset:H,virtualItems:R,totalHeight:p}},[a,t,c,r,e,T]),w=s.useCallback((p,k)=>{},[]),P=s.useCallback(p=>{const k=p.currentTarget.scrollTop;h.current=k,x.current&&cancelAnimationFrame(x.current),x.current=requestAnimationFrame(()=>{u(k),o==null||o(k)})},[o]),D=s.useCallback(p=>{h.current=p,u(p),o==null||o(p),y.current&&(y.current.scrollTop=p)},[o]);return s.useEffect(()=>()=>{x.current&&cancelAnimationFrame(x.current)},[]),{virtualItems:l,totalHeight:I,startOffset:d,containerRef:y,scrollTop:a,setScrollTop:D,measureElement:w,startIndex:b,endIndex:v,handleScroll:P}}const Se=()=>{const t=s.useContext(Q),c=s.useRef(null),r=s.useCallback((m,R)=>R.dataIndex?Array.isArray(R.dataIndex)?R.dataIndex.reduce((H,f)=>H==null?void 0:H[f],m):m[R.dataIndex]:m[R.key],[]),e=!!t,o=(t==null?void 0:t.columns)||[],a=(t==null?void 0:t.paginatedData)||[],u=t==null?void 0:t.virtual,y=t==null?void 0:t.rowSelection,h=t==null?void 0:t.isRowSelected,x=t==null?void 0:t.toggleRowSelection,T=!!y,b=(y==null?void 0:y.type)||"checkbox",v=(y==null?void 0:y.columnWidth)||80,d=y==null?void 0:y.getCheckboxProps,l=s.useMemo(()=>u?typeof u=="boolean"?{enabled:!0,rowHeight:50,containerHeight:400,overscan:5}:{enabled:!0,rowHeight:50,containerHeight:400,overscan:5,...u}:{enabled:!1},[u]),{virtualItems:I,totalHeight:w,startOffset:P,setScrollTop:D,measureElement:p,startIndex:k}=ke({data:l.enabled?a:[],estimateSize:l.enabled&&"rowHeight"in l&&l.rowHeight||50,containerHeight:l.enabled&&"containerHeight"in l&&l.containerHeight||400,overscan:l.enabled&&"overscan"in l?l.overscan:2}),N=s.useCallback(m=>{D(m.currentTarget.scrollTop)},[D]),B=s.useCallback(m=>{if(!T)return null;const R=(h==null?void 0:h(m))||!1,f=((d==null?void 0:d(m))||{}).disabled||!1,i=S=>{S.stopPropagation(),!f&&x&&x(m)};return n.jsx("td",{className:"cream-table-selection-column",style:{width:`${v}px`,minWidth:`${v}px`,maxWidth:`${v}px`,textAlign:"center",padding:"0.75rem",cursor:f?"not-allowed":"pointer",opacity:f?.5:1,position:"relative"},onClick:i,onMouseDown:S=>{f||S.preventDefault()},children:n.jsx("div",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",userSelect:"none",minHeight:"40px",minWidth:"40px"},children:b==="checkbox"?R?n.jsx(_,{icon:X,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):n.jsx(_,{icon:Z,style:{color:"#d9d9d9",fontSize:"20px"}}):R?n.jsx(_,{icon:xe,style:{color:"var(--color-primary-500)",fontSize:"20px"}}):n.jsx(_,{icon:ee,style:{color:"#d9d9d9",fontSize:"20px"}})})})},[T,b,v,h,x,d]);if(!e)return null;const A=T?o.length+1:o.length;return!a||a.length===0?n.jsx("tbody",{children:n.jsx("tr",{children:n.jsx("td",{colSpan:A,style:{textAlign:"center"},children:"暂无数据"})})}):n.jsx("tbody",{children:n.jsx("tr",{className:"cream-table-virtual-row",children:n.jsx("td",{colSpan:A,style:{padding:0,border:0,height:l.enabled&&"containerHeight"in l&&l.containerHeight||"100%"},children:n.jsxs("div",{ref:c,className:"cream-table-virtual-container",style:{height:"100%",overflow:"auto",position:"relative"},onScroll:N,children:[n.jsx("div",{style:{height:w}}),n.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,transform:`translateY(${P}px)`},children:n.jsx("table",{className:"cream-table",style:{width:"100%",scrollbarWidth:"none"},children:n.jsx("tbody",{children:I.map((m,R)=>{const H=k+R,f=(h==null?void 0:h(m))||!1;return n.jsxs("tr",{ref:i=>p(i,H),"data-index":H,className:f?"selected":void 0,children:[B(m),o.map(i=>{const S=i.align?`text-${i.align==="center"?"center":i.align==="right"?"right":"left"}`:"text-left",W=i.fixed?`fixed-${i.fixed}`:"",U=[S,W].filter(Boolean).join(" "),K=r(m,i),O=i.render?i.render(K,m,H):K;return n.jsx("td",{className:U||void 0,style:i.width?{width:i.width}:void 0,children:O},i.key)})]},m.key||H)})})})})]})})})})};Se.__docgenInfo={description:"",methods:[],displayName:"TableVirtualBody"};const Q=s.createContext(void 0),J=t=>{const{columns:c,dataSource:r,pagination:e,virtual:o,rowSelection:a}=t,[u,y]=s.useState(r??[]),[h,x]=s.useState(r??[]);s.useEffect(()=>{r!==void 0&&y(r)},[r]);const T=s.useRef(null),b=s.useRef(null),[v,d]=s.useState(400),[l,I]=s.useState(0),[w,P]=s.useState(0),D=s.useCallback(()=>{if(!T.current||!b.current)return;const g=T.current,j=b.current,C=j.querySelector("thead"),M=j.querySelector("tfoot"),$=g.clientHeight,E=(C==null?void 0:C.offsetHeight)||0,V=(M==null?void 0:M.offsetHeight)||0,z=Math.max(0,$-E-V);return d(z),I(E),P(V),z},[]);s.useLayoutEffect(()=>{o&&requestAnimationFrame(()=>{D()})},[o,D,c]),s.useEffect(()=>{if(!o||!T.current)return;const g=new ResizeObserver(()=>{D()});return g.observe(T.current),()=>{g.disconnect()}},[o,D]);const p=s.useMemo(()=>{if(!o)return{enabled:!1};const g=Math.max(0,v-l-w),j=g>0?g:400,C={enabled:!0,rowHeight:50,containerHeight:j,overscan:2};return typeof o=="boolean"?C:{...C,...o,containerHeight:o.containerHeight??j}},[o,v,l,w]),k=ke({data:h,estimateSize:p.rowHeight||50,containerHeight:p.containerHeight||400,overscan:p.overscan||2}),N=u.length,B=!!a,A=(a==null?void 0:a.type)||"checkbox",m=(a==null?void 0:a.selectedRowKeys)!==void 0,[R,H]=s.useState((a==null?void 0:a.defaultSelectedRowKeys)||[]),f=m?a.selectedRowKeys:R,i=s.useCallback(g=>{m||H(g);const j=u.filter(C=>{const M=C.key;return g.includes(M)});a!=null&&a.onChange&&a.onChange(g,j)},[m,u,a]),S=s.useCallback(g=>{const j=g.key;return f.includes(j)},[f]),W=s.useCallback((g,j)=>{const C=g.key,M=S(g),$=j!==void 0?j:!M;let E;if(A==="radio"?E=$?[C]:[]:$?E=[...f,C]:E=f.filter(V=>V!==C),i(E),a!=null&&a.onSelect){const V=u.filter(z=>{const q=z.key;return E.includes(q)});a.onSelect(g,$,V)}},[f,A,u,a,S,i]),U=s.useCallback(g=>{if(A==="radio")return;const j=h,C=j.map(z=>z.key),M=C.every(z=>f.includes(z)),$=g!==void 0?g:!M;let E;$?E=Array.from(new Set([...f,...C])):E=f.filter(z=>!C.includes(z));const V=j.filter(z=>{const q=z.key;return $?!f.includes(q):f.includes(q)});if(i(E),a!=null&&a.onSelectAll){const z=u.filter(q=>{const Ce=q.key;return E.includes(Ce)});a.onSelectAll($,z,V)}},[f,h,A,u,a,i]),K=s.useCallback(()=>{if(A==="radio")return!1;const g=h;return g.length===0?!1:g.every(j=>{const C=j.key;return f.includes(C)})},[h,f,A]),O=s.useCallback(()=>{if(A==="radio")return!1;const g=h;if(g.length===0)return!1;const j=g.filter(C=>{const M=C.key;return f.includes(M)}).length;return j>0&&j<g.length},[h,f,A]);s.useEffect(()=>{m&&(a!=null&&a.selectedRowKeys)&&H(a.selectedRowKeys)},[m,a==null?void 0:a.selectedRowKeys]);const je={columns:c,tableData:u,setTableData:y,total:N,paginatedData:h,setPaginatedData:x,pagination:e,virtual:p,virtualItems:k.virtualItems,totalHeight:k.totalHeight,startOffset:k.startOffset,measureRowElement:k.measureElement,containerRef:k.containerRef,handleScroll:k.handleScroll,rowSelection:B?a:void 0,selectedRowKeys:f,setSelectedRowKeys:i,isRowSelected:S,toggleRowSelection:W,toggleAllRowsSelection:U,isAllRowsSelected:K,isSomeRowsSelected:O};return n.jsx(Q.Provider,{value:je,children:n.jsx("div",{ref:T,className:"cream-table-container",style:p.enabled?{overflow:"hidden"}:void 0,children:n.jsxs("table",{ref:b,className:"cream-table",children:[n.jsx(pe,{}),p.enabled?n.jsx(Se,{}):n.jsx(be,{}),n.jsx(ve,{})]})})})};J.__docgenInfo={description:"",methods:[],displayName:"TableContainer",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"ColumnType",elements:[{name:"T"}],raw:"ColumnType<T>"}],raw:"ColumnType<T>[]"},description:""},dataSource:{required:!1,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},pagination:{required:!1,tsType:{name:"union",raw:"PaginationConfig | false | true",elements:[{name:"PaginationConfig"},{name:"literal",value:"false"},{name:"literal",value:"true"}]},description:""},virtual:{required:!1,tsType:{name:"union",raw:"VirtualScrollConfig | boolean",elements:[{name:"VirtualScrollConfig"},{name:"boolean"}]},description:""},rowSelection:{required:!1,tsType:{name:"RowSelectionConfig",elements:[{name:"T"}],raw:"RowSelectionConfig<T>"},description:""}}};const Ee={title:"Table",component:J};function Te(t){const c=["John","Jim","Joe","Jane","Jack","Jill","James","Julia","Jason","Jessica"],r=["Brown","Green","Black","White","Gray","Red","Blue","Smith","Johnson","Williams"],e=["New York","London","Sydney","Tokyo","Paris","Berlin","Beijing","Shanghai","Moscow","Dubai"],o=[["nice","developer"],["loser"],["cool","teacher"],["handsome"],["cool"],["smart"],["friendly"],["professional"]];return Array.from({length:t},(a,u)=>{const y=c[u%c.length],h=r[Math.floor(u/c.length)%r.length],x=e[u%e.length],T=o[u%o.length];return{key:String(u+1),name:`${y} ${h}`,age:20+u%50,address:`${x} No. ${u+1} Lake Park`,tags:T}})}const te=Te(100),F={render:()=>{const t=[{title:"Name",dataIndex:"name",key:"name",render:c=>n.jsx("a",{href:"#",children:c})},{title:"Age",dataIndex:"age",key:"age"},{title:"Address",dataIndex:"address",key:"address"},{title:"Tags",key:"tags",dataIndex:"tags",render:(c,{tags:r})=>n.jsx("div",{children:Array.isArray(r)?r.join(", "):r})},{title:"Action",key:"action",render:(c,r)=>n.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[n.jsx(ne,{btnType:se.Primary,size:ae.Small,onClick:()=>console.log("编辑",r.name),children:"编辑"}),n.jsx(ne,{btnType:se.Danger,size:ae.Small,onClick:()=>console.log("删除",r.name),children:"删除"})]})}];return n.jsx("div",{style:{width:"100%",maxWidth:"1000px",height:"400px",padding:"20px"},children:n.jsx(J,{columns:t,dataSource:te})})}};F.storyName="基础表格";const L={render:()=>{const t=[{title:"Name",dataIndex:"name",key:"name",align:"left"},{title:"Age",dataIndex:"age",key:"age",align:"center"},{title:"Address",dataIndex:"address",key:"address",align:"right"}];return n.jsx("div",{style:{width:"100%",maxWidth:"800px",height:"400px",padding:"20px"},children:n.jsx(J,{columns:t,dataSource:te})})}};L.storyName="对齐方式";const G={render:()=>{const t=[{title:"Name",dataIndex:"name",key:"name",render:c=>n.jsx("strong",{children:c})},{title:"Age",dataIndex:"age",key:"age",align:"center",render:c=>n.jsx("span",{style:{color:c>40?"#4caf50":"#f44336"},children:c})},{title:"Address",dataIndex:"address",key:"address"},{title:"Tags",dataIndex:"tags",key:"tags",render:(c,{tags:r})=>n.jsx("div",{children:Array.isArray(r)?r.join(", "):r})}];return n.jsx("div",{style:{width:"100%",maxWidth:"1000px",height:"400px",padding:"20px"},children:n.jsx(J,{columns:t,dataSource:te})})}};G.storyName="自定义渲染";const Y={render:()=>{const t=Te(1e4),c=[{title:"Name",dataIndex:"name",key:"name"},{title:"Age",dataIndex:"age",key:"age"},{title:"Address",dataIndex:"address",key:"address"},{title:"Tags",key:"tags",dataIndex:"tags",render:(r,{tags:e})=>n.jsx("div",{children:Array.isArray(e)?e.join(", "):e})}];return n.jsx("div",{style:{width:"100%",maxWidth:"1000px",height:"500px",padding:"20px"},children:n.jsx(J,{columns:c,dataSource:t,virtual:!0})})}};Y.storyName="虚拟滚动 (大数据)";var re,le,oe;F.parameters={...F.parameters,docs:{...(re=F.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => {
    const columns: TableProps<DataType>['columns'] = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, {
        tags
      }) => <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
    }, {
      title: 'Action',
      key: 'action',
      render: (_, record) => <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>\r
            <Button btnType={ButtonType.Primary} size={ButtonSize.Small} onClick={() => console.log('编辑', record.name)}>\r
              编辑\r
            </Button>\r
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small} onClick={() => console.log('删除', record.name)}>\r
              删除\r
            </Button>\r
          </div>
    }];
    return <div style={{
      width: '100%',
      maxWidth: '1000px',
      height: '400px',
      padding: '20px'
    }}>\r
        <Table<DataType> columns={columns} dataSource={data} />\r
      </div>;
  }
}`,...(oe=(le=F.parameters)==null?void 0:le.docs)==null?void 0:oe.source}}};var ie,ce,de;L.parameters={...L.parameters,docs:{...(ie=L.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => {
    const alignedColumns: TableProps<DataType>['columns'] = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left'
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'right'
    }];
    return <div style={{
      width: '100%',
      maxWidth: '800px',
      height: '400px',
      padding: '20px'
    }}>\r
        <Table<DataType> columns={alignedColumns} dataSource={data} />\r
      </div>;
  }
}`,...(de=(ce=L.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var ue,he,me;G.parameters={...G.parameters,docs:{...(ue=G.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => {
    const customColumns: TableProps<DataType>['columns'] = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <strong>{text}</strong>
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      render: value => <span style={{
        color: value > 40 ? '#4caf50' : '#f44336'
      }}>\r
            {value}\r
          </span>
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, {
        tags
      }) => <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
    }];
    return <div style={{
      width: '100%',
      maxWidth: '1000px',
      height: '400px',
      padding: '20px'
    }}>\r
        <Table<DataType> columns={customColumns} dataSource={data} />\r
      </div>;
  }
}`,...(me=(he=G.parameters)==null?void 0:he.docs)==null?void 0:me.source}}};var fe,ge,ye;Y.parameters={...Y.parameters,docs:{...(fe=Y.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => {
    const largeData = generateData(10000);
    const columns: TableProps<DataType>['columns'] = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, {
        tags
      }) => <div>{Array.isArray(tags) ? tags.join(', ') : tags}</div>
    }];
    return <div style={{
      width: '100%',
      maxWidth: '1000px',
      height: '500px',
      padding: '20px'
    }}>\r
        <Table<DataType> columns={columns} dataSource={largeData} virtual={true} />\r
      </div>;
  }
}`,...(ye=(ge=Y.parameters)==null?void 0:ge.docs)==null?void 0:ye.source}}};const _e=["BasicTable","AlignedTable","CustomRenderTable","VirtualScrollTable"];export{L as AlignedTable,F as BasicTable,G as CustomRenderTable,Y as VirtualScrollTable,_e as __namedExportsOrder,Ee as default};
