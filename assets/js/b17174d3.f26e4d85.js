(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6817],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return d}});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,f=p["".concat(i,".").concat(d)]||p[d]||m[d]||l;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=p;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var u=2;u<l;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1554:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(7378),r="iconExternalLink_pqex",l=function(e){var t=e.width,n=void 0===t?13.5:t,l=e.height,o=void 0===l?13.5:l;return a.createElement("svg",{width:n,height:o,"aria-hidden":"true",viewBox:"0 0 24 24",className:r},a.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))}},517:function(e,t,n){"use strict";var a=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},4535:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var a=n(9603),r=n(7378),l=n(6457),o=n(4956);var s=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=n(6792),u=n(8944),c="tabItem_c0e5";function m(e){var t,n,a,l=e.lazy,o=e.block,m=e.defaultValue,p=e.values,d=e.groupId,f=e.className,g=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&"string"==typeof e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),k=null!=p?p:g.map((function(e){var t=e.props;return{value:t.value,label:t.label}})),h=(0,i.duplicates)(k,(function(e,t){return e.value===t.value}));if(h.length>0)throw new Error('Docusaurus error: Duplicate values "'+h.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var v=null===m?m:null!=(t=null!=m?m:null==(n=g.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(a=g[0])?void 0:a.props.value;if(null!==v&&!k.some((function(e){return e.value===v})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+v+'" but none of its children has the corresponding value. Available values are: '+k.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=s(),y=b.tabGroupChoices,N=b.setTabGroupChoices,T=(0,r.useState)(v),w=T[0],j=T[1],x=[],E=(0,i.useScrollPositionBlocker)().blockElementScrollPositionUntilNextRender;if(null!=d){var O=y[d];null!=O&&O!==w&&k.some((function(e){return e.value===O}))&&j(O)}var Z=function(e){var t=e.currentTarget,n=x.indexOf(t),a=k[n].value;a!==w&&(E(t),j(a),null!=d&&N(d,a))},I=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=x.indexOf(e.currentTarget)+1;n=x[a]||x[0];break;case"ArrowLeft":var r=x.indexOf(e.currentTarget)-1;n=x[r]||x[x.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":o},f)},k.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,className:(0,u.Z)("tabs__item",c,{"tabs__item--active":w===t}),key:t,ref:function(e){return x.push(e)},onKeyDown:I,onFocus:Z,onClick:Z},null!=n?n:t)}))),l?(0,r.cloneElement)(g.filter((function(e){return e.props.value===w}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},g.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})}))))}function p(e){var t=(0,l.Z)();return r.createElement(m,(0,a.Z)({key:String(t)},e))}},4956:function(e,t,n){"use strict";var a=(0,n(7378).createContext)(void 0);t.Z=a},297:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var a=n(7378);function r(e){var t=e.children,n=e.type;return a.createElement("span",{className:"badge badge--"+n},t)}},7586:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(7378),r=n(4142),l=n(1554),o=n(297),s="badgeGroup_2HOO",i="apiLink_32Vk";function u(e){var t=e.children;return a.createElement("span",{className:s},t)}function c(e){var t=e.api,n=e.backend,s=e.frontend,c=e.tooling;return a.createElement(a.Fragment,null,t&&a.createElement(r.default,{className:i,to:t},"API ",a.createElement(l.Z,null)),a.createElement(u,null,n&&a.createElement(o.Z,{type:"warning"},"Backend"),s&&a.createElement(o.Z,{type:"success"},"Frontend"),c&&a.createElement(o.Z,{type:"primary"},"Tooling")))}},2592:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return m},metadata:function(){return p},toc:function(){return d},default:function(){return g}});var a=n(9603),r=n(120),l=(n(7378),n(5318)),o=n(7586),s=n(4535),i=n(517),u=["components"],c={title:"Translations"},m=void 0,p={unversionedId:"translate",id:"translate",isDocsHomePage:!1,title:"Translations",description:"Package and application level translations made easy.",source:"@site/docs/translate.mdx",sourceDirName:".",slug:"/translate",permalink:"/docs/translate",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/translate.mdx",tags:[],version:"current",frontMatter:{title:"Translations"},sidebar:"docs",previous:{title:"Terminal utilities",permalink:"/docs/terminal"},next:{title:"3.0",permalink:"/docs/migrate/3.0"}},d=[{value:"Installation",id:"installation",children:[],level:2},{value:"Environment variables",id:"environment-variables",children:[],level:2},{value:"Translators",id:"translators",children:[{value:"Locale detection",id:"locale-detection",children:[],level:3}],level:2},{value:"Resources",id:"resources",children:[{value:"Namespaces",id:"namespaces",children:[],level:3}],level:2},{value:"Translations",id:"translations",children:[{value:"Context",id:"context",children:[],level:3},{value:"Plurals",id:"plurals",children:[],level:3},{value:"Nesting",id:"nesting",children:[],level:3}],level:2}],f={toc:d};function g(e){var t=e.components,n=(0,r.Z)(e,u);return(0,l.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(o.Z,{backend:!0,tooling:!0,api:"/api/translate",mdxType:"EnvBadges"}),(0,l.kt)("p",null,"Package and application level translations made easy."),(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)(s.Z,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"npm",value:"npm"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @boost/translate\n"))),(0,l.kt)(i.Z,{value:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @boost/translate\n")))),(0,l.kt)("h2",{id:"environment-variables"},"Environment variables"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"LANGUAGE"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"LANG")," - The locale to explicitly use for translation loading.")),(0,l.kt)("h2",{id:"translators"},"Translators"),(0,l.kt)("p",null,'Translating messages is based around the concept of a "translator", which is an implementation\naround ',(0,l.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/i18next"},"i18next")," that provides file system based resources\nbundles, in-memory caching, sane default configuration, automatic locale detection, plus all the\nfeatures found in i18next."),(0,l.kt)("p",null,"The translator is ",(0,l.kt)("em",{parentName:"p"},"designed for Node.js"),", primarily for package level translations, command line\nscripts, developer tools, and even applications, but ",(0,l.kt)("em",{parentName:"p"},"not")," for the web or the browser."),(0,l.kt)("p",null,"To begin, instantiate a translator with ",(0,l.kt)("a",{parentName:"p",href:"/api/translate/function/createTranslator"},(0,l.kt)("inlineCode",{parentName:"a"},"createTranslator"))," with a list of\n",(0,l.kt)("a",{parentName:"p",href:"#namespaces"},"namespaces")," to load, a list of ",(0,l.kt)("a",{parentName:"p",href:"#resources"},"resource paths")," to locate bundles in, and\nan optional ",(0,l.kt)("a",{parentName:"p",href:"/api/translate/interface/TranslatorOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"TranslatorOptions"))," object. This returns a\nfunction that can be used for loading and retrieving translations."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { createTranslator } from '@boost/translate';\n\nconst msg = createTranslator(['common', 'errors'], '../path/to/resources');\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},'The first namespace provided becomes the "default namespace".')),(0,l.kt)("p",null,"The returned translator function, aptly named ",(0,l.kt)("inlineCode",{parentName:"p"},"msg")," above, should be used anywhere that a message\nstring should be translated. It accepts ",(0,l.kt)("a",{parentName:"p",href:"#translations"},"translation key(s)")," as the 1st argument, an\noptional object for interpolation as the 2nd argument, and an optional\n",(0,l.kt)("a",{parentName:"p",href:"/api/translate/interface/MessageOptions"},(0,l.kt)("inlineCode",{parentName:"a"},"MessageOptions"))," object as the 3rd argument."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('common:welcome', { name: 'Boost' }); // Hello Boost!\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Once the translator has been created, associated ",(0,l.kt)("a",{parentName:"p",href:"#resources"},"resource files")," must also be\ncreated.")),(0,l.kt)("h3",{id:"locale-detection"},"Locale detection"),(0,l.kt)("p",null,"To load resource bundles, we require a locale. A locale is code based representation of a human\nlanguage and is based on ",(0,l.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/IETF_language_tag"},"IETF language tags"),".\nBoost locales align with ISO 639, with the language being lowercased (",(0,l.kt)("inlineCode",{parentName:"p"},"en"),"), and the optional region\nbeing uppercased and separated by a dash (",(0,l.kt)("inlineCode",{parentName:"p"},"en-US"),")."),(0,l.kt)("p",null,"The locale is automatically detected from the environment using the following lookup strategies, one\nby one, until a valid locale is found."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Defined by the ",(0,l.kt)("inlineCode",{parentName:"li"},"locale")," option or through the translator's ",(0,l.kt)("inlineCode",{parentName:"li"},"changeLocale")," method."),(0,l.kt)("li",{parentName:"ul"},"Passed on the command line with the ",(0,l.kt)("inlineCode",{parentName:"li"},"--locale")," option."),(0,l.kt)("li",{parentName:"ul"},"Defined a ",(0,l.kt)("inlineCode",{parentName:"li"},"LANGUAGE")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"LANG")," environment variable."),(0,l.kt)("li",{parentName:"ul"},"Inherited from the operating system.")),(0,l.kt)("h2",{id:"resources"},"Resources"),(0,l.kt)("p",null,"A resource bundle is a per locale collection of ",(0,l.kt)("a",{parentName:"p",href:"#namespaces"},"namespaced"),"\n",(0,l.kt)("a",{parentName:"p",href:"#translations"},"translation")," files, located within a resource path passed to\n",(0,l.kt)("a",{parentName:"p",href:"/api/translate/function/createTranslator"},(0,l.kt)("inlineCode",{parentName:"a"},"createTranslator")),"."),(0,l.kt)("p",null,"An example file structure of a resources folder, with multiple locale bundles, would look something\nlike the following."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"res/\n\u251c\u2500\u2500 en/\n\u2502   \u251c\u2500\u2500 common.yaml\n\u2502   \u251c\u2500\u2500 errors.yaml\n\u2502   \u2514\u2500\u2500 validations.yaml\n\u251c\u2500\u2500 en-GB/\n\u2502   \u251c\u2500\u2500 common.yaml\n\u2502   \u2514\u2500\u2500 validations.yaml\n\u2514\u2500\u2500 fr/\n    \u2514\u2500\u2500 ...\n")),(0,l.kt)("h3",{id:"namespaces"},"Namespaces"),(0,l.kt)("p",null,"A ",(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/principles/namespaces"},"namespace")," is a file that contains\n",(0,l.kt)("a",{parentName:"p",href:"#translations"},"translations"),", is located within a locale bundle, and can be written in JavaScript,\nJSON, or YAML (default and preferred)."),(0,l.kt)(s.Z,{groupId:"i18n-format",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"JSON",value:"json"},{label:"YAML",value:"yaml"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="res/en/common.js"',title:'"res/en/common.js"'},"module.exports = {\n    welcome: 'Hello {{name}}!',\n};\n"))),(0,l.kt)(i.Z,{value:"json",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="res/en/common.json"',title:'"res/en/common.json"'},'{\n    "welcome": "Hello {{name}}!"\n}\n'))),(0,l.kt)(i.Z,{value:"yaml",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="res/en/common.yaml"',title:'"res/en/common.yaml"'},"welcome: Hello {{name}}!\n")))),(0,l.kt)("p",null,"When retrieving messages with the translator function, the namespace can be targeted by prefixing\nthe key and separating with a colon."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('common:welcome'); // Hello {{name}}!\n")),(0,l.kt)("h2",{id:"translations"},"Translations"),(0,l.kt)("p",null,"A translation is a message string (also known as copy) identified by a unique key (per namespace).\nThey can be retrieved using the translator function (",(0,l.kt)("inlineCode",{parentName:"p"},"msg")," above)."),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"Translations inherit all functionality from i18next, so I suggest reading up on the\n",(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/translation-function/essentials"},"essentials"),".")),(0,l.kt)("h3",{id:"context"},"Context"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/translation-function/context"},"Contextual messages")," allow for different\nmessages based on contextual data, through the combination of multiple keys and the ",(0,l.kt)("inlineCode",{parentName:"p"},"context"),"\noption."),(0,l.kt)(s.Z,{groupId:"i18n-format",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"JSON",value:"json"},{label:"YAML",value:"yaml"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="res/en/user.js"',title:'"res/en/user.js"'},"module.exports = {\n    partner: 'Significant other',\n    partner_male: 'Husband',\n    partner_female: 'Wife',\n};\n"))),(0,l.kt)(i.Z,{value:"json",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="res/en/user.json"',title:'"res/en/user.json"'},'{\n    "partner": "Significant other",\n    "partner_male": "Husband",\n    "partner_female": "Wife"\n}\n'))),(0,l.kt)(i.Z,{value:"yaml",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="res/en/user.yaml"',title:'"res/en/user.yaml"'},"partner: Significant other\npartner_male: Husband\npartner_female: Wife\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('user:partner', {}, { context: 'male' }); // Husband\nmsg('user:partner', {}, { context: 'female' }); // Wife\n")),(0,l.kt)("h3",{id:"plurals"},"Plurals"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/translation-function/plurals"},"Pluralizing messages")," is easily solved\nthrough the combination of multiple keys and the ",(0,l.kt)("inlineCode",{parentName:"p"},"count")," option."),(0,l.kt)(s.Z,{groupId:"i18n-format",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"JSON",value:"json"},{label:"YAML",value:"yaml"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="res/en/cart.js"',title:'"res/en/cart.js"'},"module.exports = {\n    item: '{{count}} item',\n    item_plural: '{{count}} items',\n};\n"))),(0,l.kt)(i.Z,{value:"json",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="res/en/cart.json"',title:'"res/en/cart.json"'},'{\n    "item": "{{count}} item",\n    "item_plural": "{{count}} items"\n}\n'))),(0,l.kt)(i.Z,{value:"yaml",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="res/en/cart.yaml"',title:'"res/en/cart.yaml"'},"item: {{count}} item\nitem_plural: {{count}} items\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('cart:item', {}, { count: 1 }); // 1 item\nmsg('cart:item', {}, { count: 10 }); // 10 items\n")),(0,l.kt)("h3",{id:"nesting"},"Nesting"),(0,l.kt)("p",null,"There are 2 forms of nesting. The first is\n",(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/translation-function/essentials#accessing-keys"},"nested keys")," within a\nnamespace file, and they can be accessed using dot notation."),(0,l.kt)(s.Z,{groupId:"i18n-format",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"JSON",value:"json"},{label:"YAML",value:"yaml"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="res/en/prompts.js"',title:'"res/en/prompts.js"'},"module.exports = {\n    dialog: {\n        confirm: 'Are you sure?',\n        back: 'Go back!',\n    },\n};\n"))),(0,l.kt)(i.Z,{value:"json",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="res/en/prompts.json"',title:'"res/en/prompts.json"'},'{\n    "dialog": {\n        "confirm": "Are you sure?",\n        "back": "Go back!"\n    }\n}\n'))),(0,l.kt)(i.Z,{value:"yaml",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="res/en/prompts.yaml"',title:'"res/en/prompts.yaml"'},"dialog:\n  confirm: Are you sure?\n  back: Go back!\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('prompts:dialog.back'); // Go back!\n")),(0,l.kt)("p",null,"The second form is ",(0,l.kt)("a",{parentName:"p",href:"https://www.i18next.com/translation-function/nesting"},"nested messages")," through a\nspecial ",(0,l.kt)("inlineCode",{parentName:"p"},"$t()")," syntax."),(0,l.kt)(s.Z,{groupId:"i18n-format",defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"JSON",value:"json"},{label:"YAML",value:"yaml"}],mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"js",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="res/en/prompts.js"',title:'"res/en/prompts.js"'},"module.exports = {\n    confirm: 'Are you sure? $t(warning)',\n    warning: 'This cannot be undone!',\n};\n"))),(0,l.kt)(i.Z,{value:"json",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="res/en/prompts.json"',title:'"res/en/prompts.json"'},'{\n    "confirm": "Are you sure? $t(warning)",\n    "warning": "This cannot be undone!"\n}\n'))),(0,l.kt)(i.Z,{value:"yaml",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="res/en/prompts.yaml"',title:'"res/en/prompts.yaml"'},"confirm: 'Are you sure? $t(warning)'\nwarning: This cannot be undone!\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"msg('prompts:confirm'); // Are you sure? This cannot be undone!\n")))}g.isMDXComponent=!0}}]);