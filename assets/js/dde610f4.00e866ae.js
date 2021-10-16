(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8359],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=u(n),d=o,f=m["".concat(p,".").concat(d)]||m[d]||c[d]||a;return n?r.createElement(f,l(l({ref:t},s),{},{components:n})):r.createElement(f,l({ref:t},s))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4457:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return p},toc:function(){return u},default:function(){return c}});var r=n(9603),o=n(120),a=(n(7378),n(5318)),l=["components"],i={},p=void 0,u=[{value:"Features",id:"features",children:[],level:2},{value:"Installation",id:"installation",children:[],level:2},{value:"Documentation",id:"documentation",children:[],level:2}],s={toc:u};function c(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/milesj/boost/actions?query=branch%3Amaster"},(0,a.kt)("img",{parentName:"a",src:"https://github.com/milesj/boost/workflows/Build/badge.svg",alt:"Build Status"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@boost/module"},(0,a.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/%40boost%2Fmodule.svg",alt:"npm version"})),"\n",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@boost/module"},(0,a.kt)("img",{parentName:"a",src:"https://david-dm.org/milesj/boost.svg?path=packages/module",alt:"npm deps"}))),(0,a.kt)("p",null,"Load and resolve custom file types at runtime with a more powerful Node.js ",(0,a.kt)("inlineCode",{parentName:"p"},"require")," replacement."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { requireModule } from '@boost/module';\n\nconst result = requireModule('./some/non-js/file.ts');\n")),(0,a.kt)("p",null,"Or with next-generation ",(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org/api/esm.html#esm_loaders"},"loaders"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"node --experimental-loader @boost/module/loader.mjs ./path/to/entry-point.mjs\n")),(0,a.kt)("h2",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"CommonJS based importing with ",(0,a.kt)("inlineCode",{parentName:"li"},"requireModule()")),(0,a.kt)("li",{parentName:"ul"},"CommonJS interoperability with ESM-like files"),(0,a.kt)("li",{parentName:"ul"},"ECMAScript module based importing with a custom ESM loader"),(0,a.kt)("li",{parentName:"ul"},"Supported file types: TypeScript (",(0,a.kt)("inlineCode",{parentName:"li"},".ts"),", ",(0,a.kt)("inlineCode",{parentName:"li"},".tsx"),")")),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"yarn add @boost/module\n")),(0,a.kt)("h2",{id:"documentation"},"Documentation"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://boostlib.dev/docs/module"},"https://boostlib.dev/docs/module")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://boostlib.dev/api/module"},"https://boostlib.dev/api/module"))))}c.isMDXComponent=!0}}]);