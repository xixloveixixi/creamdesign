import{P as D}from"./Pagination-CndB2CSZ.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-ZH-6pyQh.js";import"./_commonjsHelpers-CqkleIqs.js";const x={title:"Pagination",component:D,tags:["autodocs"],argTypes:{total:{control:{type:"number"},description:"总数据量"},current:{control:{type:"number"},description:"当前页码"},pageSize:{control:{type:"number"},description:"每页条数"},showTotal:{control:"boolean",description:"是否显示总数"},showSizeChanger:{control:"boolean",description:"是否显示每页条数选择器"},disabled:{control:"boolean",description:"是否禁用"}}},s={args:{total:100,current:1,pageSize:10}},e={args:{total:100,current:1,pageSize:10,showTotal:!0}};e.storyName="显示总数";const r={args:{total:100,current:1,pageSize:10,showSizeChanger:!0}};r.storyName="可切换每页条数";const a={args:{total:100,current:1,pageSize:10,showTotal:!0,showSizeChanger:!0}};a.storyName="完整功能";const t={args:{total:1e3,current:50,pageSize:20,showTotal:!0}};t.storyName="大量数据";const o={args:{total:100,current:5,pageSize:10,disabled:!0,showTotal:!0,showSizeChanger:!0}};o.storyName="禁用状态";var n,c,i;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    total: 100,
    current: 1,
    pageSize: 10
  }
}`,...(i=(c=s.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,p,l;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showTotal: true
  }
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var g,m,d;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showSizeChanger: true
  }
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var h,S,z;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showTotal: true,
    showSizeChanger: true
  }
}`,...(z=(S=a.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var w,T,b;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    total: 1000,
    current: 50,
    pageSize: 20,
    showTotal: true
  }
}`,...(b=(T=t.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var y,C,N;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    total: 100,
    current: 5,
    pageSize: 10,
    disabled: true,
    showTotal: true,
    showSizeChanger: true
  }
}`,...(N=(C=o.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};const B=["Basic","WithTotal","WithSizeChanger","FullFeatures","LargeData","Disabled"];export{s as Basic,o as Disabled,a as FullFeatures,t as LargeData,r as WithSizeChanger,e as WithTotal,B as __namedExportsOrder,x as default};
