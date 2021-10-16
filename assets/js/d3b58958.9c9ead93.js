(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6115],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(n),f=a,d=m["".concat(s,".").concat(f)]||m[f]||u[f]||o;return n?r.createElement(d,l(l({ref:t},c),{},{components:n})):r.createElement(d,l({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5844:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},toc:function(){return p},default:function(){return u}});var r=n(9603),a=n(120),o=(n(7378),n(5318)),l=["components"],i={},s=void 0,p=[{value:"Features",id:"features",children:[],level:2},{value:"Installation",id:"installation",children:[],level:2},{value:"Documentation",id:"documentation",children:[],level:2}],c={toc:p};function u(e){var t=e.components,n=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/milesj/boost/actions?query=branch%3Amaster"},(0,o.kt)("img",{parentName:"a",src:"https://github.com/milesj/boost/workflows/Build/badge.svg",alt:"Build Status"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@boost/translate"},(0,o.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/%40boost%2Ftranslate.svg",alt:"npm version"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@boost/translate"},(0,o.kt)("img",{parentName:"a",src:"https://david-dm.org/milesj/boost.svg?path=packages/translate",alt:"npm deps"}))),(0,o.kt)("p",null,"Package and application level translations made easy. Wraps the powerful\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/i18next"},"i18next")," library to abstract complexity away and define\ncommon server-side settings."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { createTranslator } from '@boost/translate';\n\nconst msg = createTranslator(['common', 'errors'], '../path/to/resources');\n\nmsg('common:welcome', { name: 'Boost' }); // Hello Boost!\n")),(0,o.kt)("h2",{id:"features"},"Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Isolated translator instances."),(0,o.kt)("li",{parentName:"ul"},"Namespace aware resource bundles."),(0,o.kt)("li",{parentName:"ul"},"Automatic locale detection, from command line options, or from the operating system."),(0,o.kt)("li",{parentName:"ul"},"Supports multiple file types: JavaScript, JSON, YAML."),(0,o.kt)("li",{parentName:"ul"},"Message interpolation, pluralization, nesting, and more."),(0,o.kt)("li",{parentName:"ul"},"Plus all other features found in ",(0,o.kt)("a",{parentName:"li",href:"https://www.i18next.com/"},"i18next"),"!")),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yarn add @boost/translate\n")),(0,o.kt)("h2",{id:"documentation"},"Documentation"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://boostlib.dev/docs/translate"},"https://boostlib.dev/docs/translate")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://boostlib.dev/api/translate"},"https://boostlib.dev/api/translate"))))}u.isMDXComponent=!0}}]);