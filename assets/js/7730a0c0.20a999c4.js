(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2415],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),c=s(n),m=a,f=c["".concat(u,".").concat(m)]||c[m]||d[m]||l;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=c;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1554:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(7378),a="iconExternalLink_pqex",l=function(e){var t=e.width,n=void 0===t?13.5:t,l=e.height,o=void 0===l?13.5:l;return r.createElement("svg",{width:n,height:o,"aria-hidden":"true",viewBox:"0 0 24 24",className:a},r.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))}},517:function(e,t,n){"use strict";var r=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},4535:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(9603),a=n(7378),l=n(6457),o=n(4956);var i=function(){var e=(0,a.useContext)(o.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},u=n(6792),s=n(8944),p="tabItem_c0e5";function d(e){var t,n,r,l=e.lazy,o=e.block,d=e.defaultValue,c=e.values,m=e.groupId,f=e.className,h=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&"string"==typeof e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),k=null!=c?c:h.map((function(e){var t=e.props;return{value:t.value,label:t.label}})),v=(0,u.duplicates)(k,(function(e,t){return e.value===t.value}));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===d?d:null!=(t=null!=d?d:null==(n=h.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(r=h[0])?void 0:r.props.value;if(null!==y&&!k.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+k.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=i(),g=b.tabGroupChoices,N=b.setTabGroupChoices,x=(0,a.useState)(y),w=x[0],C=x[1],j=[],T=(0,u.useScrollPositionBlocker)().blockElementScrollPositionUntilNextRender;if(null!=m){var E=g[m];null!=E&&E!==w&&k.some((function(e){return e.value===E}))&&C(E)}var S=function(e){var t=e.currentTarget,n=j.indexOf(t),r=k[n].value;r!==w&&(T(t),C(r),null!=m&&N(m,r))},q=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=j.indexOf(e.currentTarget)+1;n=j[r]||j[0];break;case"ArrowLeft":var a=j.indexOf(e.currentTarget)-1;n=j[a]||j[j.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":o},f)},k.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,className:(0,s.Z)("tabs__item",p,{"tabs__item--active":w===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:q,onFocus:S,onClick:S},null!=n?n:t)}))),l?(0,a.cloneElement)(h.filter((function(e){return e.props.value===w}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},h.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==w})}))))}function c(e){var t=(0,l.Z)();return a.createElement(d,(0,r.Z)({key:String(t)},e))}},4956:function(e,t,n){"use strict";var r=(0,n(7378).createContext)(void 0);t.Z=r},297:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(7378);function a(e){var t=e.children,n=e.type;return r.createElement("span",{className:"badge badge--"+n},t)}},7586:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(7378),a=n(4142),l=n(1554),o=n(297),i="badgeGroup_2HOO",u="apiLink_32Vk";function s(e){var t=e.children;return r.createElement("span",{className:i},t)}function p(e){var t=e.api,n=e.backend,i=e.frontend,p=e.tooling;return r.createElement(r.Fragment,null,t&&r.createElement(a.default,{className:u,to:t},"API ",r.createElement(l.Z,null)),r.createElement(s,null,n&&r.createElement(o.Z,{type:"warning"},"Backend"),i&&r.createElement(o.Z,{type:"success"},"Frontend"),p&&r.createElement(o.Z,{type:"primary"},"Tooling")))}},2369:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return d},metadata:function(){return c},toc:function(){return m},default:function(){return h}});var r=n(9603),a=n(120),l=(n(7378),n(5318)),o=n(7586),i=n(4535),u=n(517),s=["components"],p={title:"Modules"},d=void 0,c={unversionedId:"module",id:"module",isDocsHomePage:!1,title:"Modules",description:"Load and resolve custom file types at runtime with a Node.js require replacement or",source:"@site/docs/module.mdx",sourceDirName:".",slug:"/module",permalink:"/docs/module",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/module.mdx",tags:[],version:"current",frontMatter:{title:"Modules"},sidebar:"docs",previous:{title:"Logging",permalink:"/docs/log"},next:{title:"Pipelines",permalink:"/docs/pipeline"}},m=[{value:"Installation",id:"installation",children:[],level:2},{value:"CommonJS requires",id:"commonjs-requires",children:[{value:"Module interoperability",id:"module-interoperability",children:[],level:3},{value:"Generic types",id:"generic-types",children:[],level:3}],level:2},{value:"ECMAScript module loaders",id:"ecmascript-module-loaders",children:[],level:2},{value:"Supported file types",id:"supported-file-types",children:[{value:"TypeScript",id:"typescript",children:[],level:3}],level:2}],f={toc:m};function h(e){var t=e.components,n=(0,a.Z)(e,s);return(0,l.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(o.Z,{backend:!0,tooling:!0,api:"/api/module",mdxType:"EnvBadges"}),(0,l.kt)("p",null,"Load and resolve custom file types at runtime with a Node.js ",(0,l.kt)("inlineCode",{parentName:"p"},"require")," replacement or\nnext-generation ",(0,l.kt)("a",{parentName:"p",href:"https://nodejs.org/api/esm.html#esm_loaders"},"loaders"),". Currently supports\nTypeScript for ",(0,l.kt)("inlineCode",{parentName:"p"},".ts")," and ",(0,l.kt)("inlineCode",{parentName:"p"},".tsx")," files."),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)(i.Z,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"npm",value:"npm"}],mdxType:"Tabs"},(0,l.kt)(u.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @boost/module\n"))),(0,l.kt)(u.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @boost/module\n")))),(0,l.kt)("h2",{id:"commonjs-requires"},"CommonJS requires"),(0,l.kt)("p",null,"Node.js's native ",(0,l.kt)("inlineCode",{parentName:"p"},"require()")," has historically only supported ",(0,l.kt)("inlineCode",{parentName:"p"},".js")," and ",(0,l.kt)("inlineCode",{parentName:"p"},".json")," files (and now ",(0,l.kt)("inlineCode",{parentName:"p"},".cjs"),"\ntoo). But what if we were able to require non-JavaScript files at runtime also? Like TypeScript?\nThis package does just that through a new function called ",(0,l.kt)("a",{parentName:"p",href:"/api/module/function/requireModule"},(0,l.kt)("inlineCode",{parentName:"a"},"requireModule()")),"."),(0,l.kt)("p",null,"This function operates by patching the list of allowed file types/extensions in Node.js's module\nresolution. Begin by importing the function and importing\n",(0,l.kt)("a",{parentName:"p",href:"#supported-file-types"},"a supported file type"),"!"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { requireModule } from '@boost/module';\n\nconst result = requireModule('./some/non-js/file');\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"This function should only be used to import module-like files, like JavaScript and TypeScript. It\nshould ",(0,l.kt)("em",{parentName:"p"},"not")," be used for other file types, like JSON or YAML.")),(0,l.kt)("p",null,"If you'd prefer to ",(0,l.kt)("em",{parentName:"p"},"not")," use ",(0,l.kt)("inlineCode",{parentName:"p"},"requireModule()")," and still use native ",(0,l.kt)("inlineCode",{parentName:"p"},"require()"),", but also support\ncustom file types, you may do so by calling\n",(0,l.kt)("a",{parentName:"p",href:"/api/module/function/registerExtensions"},(0,l.kt)("inlineCode",{parentName:"a"},"registerExtensions()"))," at the top of your script or\napplication entry point."),(0,l.kt)("h3",{id:"module-interoperability"},"Module interoperability"),(0,l.kt)("p",null,"Unlike ",(0,l.kt)("inlineCode",{parentName:"p"},"require()")," which returns imported values as-is, ",(0,l.kt)("a",{parentName:"p",href:"/api/module/function/requireModule"},(0,l.kt)("inlineCode",{parentName:"a"},"requireModule()"))," changes\nthe shape of the import to align with ECMAScript modules. We do this for interoperability and\nconsistency sake, so that the developer experience is the same for both systems."),(0,l.kt)("p",null,"So what does this mean exactly? The biggest change is that CommonJS default exports\n(",(0,l.kt)("inlineCode",{parentName:"p"},"module.exports"),") are now returned under a ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," property, like so."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="example.js"',title:'"example.js"'},"module.exports = 123;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const value = require('./example'); // 123\nconst { default: value } = requireModule('./example'); // 123\n")),(0,l.kt)("p",null,"Another change is that CommonJS named exports (",(0,l.kt)("inlineCode",{parentName:"p"},"exports.<name>"),") are returned as properties in the\nimported object, as well as properties in an object on the ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," property. This pattern exists\nto match Node.js >= v12.20 functionality."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="example.js"',title:'"example.js"'},"exports.foo = 'abc';\nexports.bar = 123;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const value = require('./example');\nvalue.foo; // abc\nvalue.bar; // 123\n\nconst value = requireModule('./example');\nvalue.foo; // abc\nvalue.bar; // 123\nvalue.foo === value.default.foo; // true\n")),(0,l.kt)("h3",{id:"generic-types"},"Generic types"),(0,l.kt)("p",null,"In TypeScript, the native ",(0,l.kt)("inlineCode",{parentName:"p"},"require()")," is typed to return ",(0,l.kt)("inlineCode",{parentName:"p"},"any"),", which isn't that ideal. However,\n",(0,l.kt)("a",{parentName:"p",href:"/api/module/function/requireModule"},(0,l.kt)("inlineCode",{parentName:"a"},"requireModule()"))," can type both the default and named exports of a module via\ngenerics."),(0,l.kt)("p",null,"The 1st generic slot types the default export (",(0,l.kt)("inlineCode",{parentName:"p"},"module.exports")," for CJS and ",(0,l.kt)("inlineCode",{parentName:"p"},"export default")," for\nESM) under the returned ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," property."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const result = requireModule<string>('./example');\nresult.default; // string\n")),(0,l.kt)("p",null,"While the 2nd generic slot types named exports (",(0,l.kt)("inlineCode",{parentName:"p"},"exports.<name>")," for CJS and ",(0,l.kt)("inlineCode",{parentName:"p"},"export <name>")," for\nESM) under their respective property names."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const result = requireModule<string, { foo: string; bar: number }>('./example');\nresult.foo; // string\nresult.bar; // number\nresult.default; // string\n")),(0,l.kt)("p",null,"For backwards compatibility with CommonJS (can't mix ",(0,l.kt)("inlineCode",{parentName:"p"},"module.exports")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"exports.<name>"),"), named\nexports are also encapsulated under the ",(0,l.kt)("inlineCode",{parentName:"p"},"default")," property. To type this correctly, pass ",(0,l.kt)("inlineCode",{parentName:"p"},"void")," for\nthe default generic, which passes the type through accordingly."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const result = requireModule<void, { foo: string; bar: number }>('./example');\nresult.foo; // string\nresult.bar; // number\nresult.default.foo; // string\nresult.default.bar; // number\n")),(0,l.kt)("h2",{id:"ecmascript-module-loaders"},"ECMAScript module loaders"),(0,l.kt)("p",null,"Node.js supports an ",(0,l.kt)("em",{parentName:"p"},"experimental")," feature called\n",(0,l.kt)("a",{parentName:"p",href:"https://nodejs.org/api/esm.html#esm_loaders"},"ESM loaders"),", where non-JavaScript files can be\nloaded, parsed, and evaluated at runtime through Node.js's module system when using\n",(0,l.kt)("inlineCode",{parentName:"p"},"import"),"/",(0,l.kt)("inlineCode",{parentName:"p"},"export"),"."),(0,l.kt)("p",null,"To make use of loaders, the following requirements must be met."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Node.js >= v12.17"),(0,l.kt)("li",{parentName:"ul"},"Must use ",(0,l.kt)("inlineCode",{parentName:"li"},"import()")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"import"),"/",(0,l.kt)("inlineCode",{parentName:"li"},"export")," syntax (no ",(0,l.kt)("inlineCode",{parentName:"li"},"require"),")"),(0,l.kt)("li",{parentName:"ul"},"Source files must be modules (",(0,l.kt)("inlineCode",{parentName:"li"},".mjs"),", ",(0,l.kt)("inlineCode",{parentName:"li"},".ts"),", etc)"),(0,l.kt)("li",{parentName:"ul"},"Imported files must have trailing file extensions")),(0,l.kt)("p",null,"If you meet all of these requirements, then you may run your Node.js script with\n",(0,l.kt)("inlineCode",{parentName:"p"},"--experimental-loader")," and a ",(0,l.kt)("a",{parentName:"p",href:"#supported-file-types"},"supported loader type"),", or the general loader\nthat supports ",(0,l.kt)("em",{parentName:"p"},"all")," file types (demonstrated below)."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"node --experimental-loader @boost/module/loader.mjs ./path/to/entry-point.mjs\n")),(0,l.kt)("p",null,"For example, with the loader above you can now import TypeScript files as if they were standard\nJavaScript!"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import defaultValue, { namedValue } from './some/file/written/in.ts';\n")),(0,l.kt)("h2",{id:"supported-file-types"},"Supported file types"),(0,l.kt)("h3",{id:"typescript"},"TypeScript"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/"},"TypeScript")," files are supported for ",(0,l.kt)("inlineCode",{parentName:"p"},".ts")," and ",(0,l.kt)("inlineCode",{parentName:"p"},".tsx")," file\nextensions. The TypeScript source code will be down-leveled according to the currently running\nNode.js version and its capabilities."),(0,l.kt)("p",null,"The TypeScript only ESM loader can be referenced with ",(0,l.kt)("inlineCode",{parentName:"p"},"@boost/module/loader/typescript.mjs"),"."))}h.isMDXComponent=!0}}]);