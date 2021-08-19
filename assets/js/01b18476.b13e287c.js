(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[477],{999:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var i=t(9603),r=t(120),a=(t(7378),t(5318)),l=["components"],o={},s="Errors",u={unversionedId:"internal/errors",id:"internal/errors",isDocsHomePage:!1,title:"Errors",description:"Each package should contain a scoped error class, created with the @boost/internal package's",source:"@site/docs/internal/errors.md",sourceDirName:"internal",slug:"/internal/errors",permalink:"/docs/internal/errors",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/internal/errors.md",version:"current",frontMatter:{}},d=[{value:"Code guidelines",id:"code-guidelines",children:[]},{value:"Interpolation",id:"interpolation",children:[]}],p={toc:d};function c(e){var n=e.components,t=(0,r.Z)(e,l);return(0,a.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"errors"},"Errors"),(0,a.kt)("p",null,"Each package should contain a scoped error class, created with the ",(0,a.kt)("inlineCode",{parentName:"p"},"@boost/internal")," package's\n",(0,a.kt)("inlineCode",{parentName:"p"},"createScopedError")," function. This function requires a mapping of error codes to error messages."),(0,a.kt)("h2",{id:"code-guidelines"},"Code guidelines"),(0,a.kt)("p",null,"Each code should follow the format of ",(0,a.kt)("inlineCode",{parentName:"p"},"<feature>_<category>"),", where category is in the form of one\nof the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"UNKNOWN"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"UNKNOWN_*")," - A value is unknown."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"UNSUPPORTED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"UNSUPPORTED_*")," - A value is not supported currently."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"INVALID_*")," - A value is invalid."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"REQUIRED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"REQUIRED_*")," - A value is missing."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"DEFINED"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"PROVIDED")," - A value already exists."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"ONLY_*")," - Only ",(0,a.kt)("em",{parentName:"li"},"this")," can be used."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"NO"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"NON"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"NOT")," - Disallow a specific value or symbol from being used."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"*")," - Other applicable actions/verbs.")),(0,a.kt)("h2",{id:"interpolation"},"Interpolation"),(0,a.kt)("p",null,"The following interpolated values should be wrapped with double quotes:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"User provided"),(0,a.kt)("li",{parentName:"ul"},"File paths")),(0,a.kt)("p",null,"The following values should use backticks."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Code provided values"),(0,a.kt)("li",{parentName:"ul"},"Hard coded file names (",(0,a.kt)("inlineCode",{parentName:"li"},"package.json"),", etc)")))}c.isMDXComponent=!0}}]);