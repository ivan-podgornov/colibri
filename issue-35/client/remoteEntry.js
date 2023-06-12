/*! For license information please see remoteEntry.js.LICENSE.txt */
var colibri_components;!function(){var e,t,r,n,o,u,i,c,a,f,s,l,p={608:function(e,t,r){"use strict";r.r(t),r.d(t,{Promo:function(){return n.F}});var n=r(88)},88:function(e,t,r){"use strict";r.d(t,{F:function(){return c}});var n=r(268),o=r.n(n),u=r(805),i=r.n(u);const c=e=>{const{greetings:t}=e;return o().createElement("div",{className:"promo"},o().createElement("h1",null,t))};c.propTypes={greetings:i().string.isRequired}},860:function(e,t,r){"use strict";r.r(t),r.d(t,{User:function(){return n.n}});var n=r(825)},825:function(e,t,r){"use strict";r.d(t,{n:function(){return c}});var n=r(268),o=r.n(n),u=r(805),i=r.n(u);function c(e){const{age:t,firstName:r,surname:n}=e;return o().createElement("dl",null,o().createElement("div",null,o().createElement("dt",null,"Age:"),o().createElement("dd",null,t)),o().createElement("div",null,o().createElement("dt",null,"First name:"),o().createElement("dd",null,r)),o().createElement("div",null,o().createElement("dt",null,"Surname:"),o().createElement("dd",null,n)))}c.propTypes={age:i().number.isRequired,firstName:i().string.isRequired,surname:i().string.isRequired}},262:function(e,t,r){"use strict";var n=r(586);function o(){}function u(){}u.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,u,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:u,resetWarningCache:o};return r.PropTypes=r,r}},980:function(e,t,r){e.exports=r(262)()},586:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},426:function(e,t){"use strict";var r=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),a=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),d=Symbol.iterator,y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,v={};function h(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||y}function b(){}function _(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||y}h.prototype.isReactComponent={},h.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},h.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=h.prototype;var g=_.prototype=new b;g.constructor=_,m(g,h.prototype),g.isPureReactComponent=!0;var S=Array.isArray,E=Object.prototype.hasOwnProperty,w={current:null},R={key:!0,ref:!0,__self:!0,__source:!0};function O(e,t,n){var o,u={},i=null,c=null;if(null!=t)for(o in void 0!==t.ref&&(c=t.ref),void 0!==t.key&&(i=""+t.key),t)E.call(t,o)&&!R.hasOwnProperty(o)&&(u[o]=t[o]);var a=arguments.length-2;if(1===a)u.children=n;else if(1<a){for(var f=Array(a),s=0;s<a;s++)f[s]=arguments[s+2];u.children=f}if(e&&e.defaultProps)for(o in a=e.defaultProps)void 0===u[o]&&(u[o]=a[o]);return{$$typeof:r,type:e,key:i,ref:c,props:u,_owner:w.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var k=/\/+/g;function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function x(e,t,o,u,i){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var a=!1;if(null===e)a=!0;else switch(c){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case r:case n:a=!0}}if(a)return i=i(a=e),e=""===u?"."+$(a,0):u,S(i)?(o="",null!=e&&(o=e.replace(k,"$&/")+"/"),x(i,t,o,"",(function(e){return e}))):null!=i&&(P(i)&&(i=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,o+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(k,"$&/")+"/")+e)),t.push(i)),1;if(a=0,u=""===u?".":u+":",S(e))for(var f=0;f<e.length;f++){var s=u+$(c=e[f],f);a+=x(c,t,o,s,i)}else if(s=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof s)for(e=s.call(e),f=0;!(c=e.next()).done;)a+=x(c=c.value,t,o,s=u+$(c,f++),i);else if("object"===c)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function C(e,t,r){if(null==e)return e;var n=[],o=0;return x(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function j(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var T={current:null},I={transition:null},q={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:I,ReactCurrentOwner:w};t.Children={map:C,forEach:function(e,t,r){C(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return C(e,(function(){t++})),t},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!P(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=h,t.Fragment=o,t.Profiler=i,t.PureComponent=_,t.StrictMode=u,t.Suspense=s,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q,t.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=m({},e.props),u=e.key,i=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,c=w.current),void 0!==t.key&&(u=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(f in t)E.call(t,f)&&!R.hasOwnProperty(f)&&(o[f]=void 0===t[f]&&void 0!==a?a[f]:t[f])}var f=arguments.length-2;if(1===f)o.children=n;else if(1<f){a=Array(f);for(var s=0;s<f;s++)a[s]=arguments[s+2];o.children=a}return{$$typeof:r,type:e.type,key:u,ref:i,props:o,_owner:c}},t.createContext=function(e){return(e={$$typeof:a,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},t.createElement=O,t.createFactory=function(e){var t=O.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:f,render:e}},t.isValidElement=P,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:j}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=I.transition;I.transition={};try{e()}finally{I.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return T.current.useCallback(e,t)},t.useContext=function(e){return T.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return T.current.useDeferredValue(e)},t.useEffect=function(e,t){return T.current.useEffect(e,t)},t.useId=function(){return T.current.useId()},t.useImperativeHandle=function(e,t,r){return T.current.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return T.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return T.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return T.current.useMemo(e,t)},t.useReducer=function(e,t,r){return T.current.useReducer(e,t,r)},t.useRef=function(e){return T.current.useRef(e)},t.useState=function(e){return T.current.useState(e)},t.useSyncExternalStore=function(e,t,r){return T.current.useSyncExternalStore(e,t,r)},t.useTransition=function(){return T.current.useTransition()},t.version="18.2.0"},784:function(e,t,r){"use strict";e.exports=r(426)},142:function(e,t,r){"use strict";var n={Promo:function(){return Promise.resolve().then((function(){return function(){return r(608)}}))},User:function(){return Promise.resolve().then((function(){return function(){return r(860)}}))}},o=function(e,t){return r.R=t,t=r.o(n,e)?n[e]():Promise.resolve().then((function(){throw new Error('Module "'+e+'" does not exist in container.')})),r.R=void 0,t},u=function(e,t){if(r.S){var n="default",o=r.S[n];if(o&&o!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return r.S[n]=e,r.I(n,t)}};r.d(t,{get:function(){return o},init:function(){return u}})}},d={};function y(e){var t=d[e];if(void 0!==t)return t.exports;var r=d[e]={exports:{}};return p[e](r,r.exports,y),r.exports}y.m=p,y.c=d,y.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return y.d(t,{a:t}),t},y.d=function(e,t){for(var r in t)y.o(t,r)&&!y.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},y.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},y.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){y.S={};var e={},t={};y.I=function(r,n){n||(n=[]);var o=t[r];if(o||(o=t[r]={}),!(n.indexOf(o)>=0)){if(n.push(o),e[r])return e[r];y.o(y.S,r)||(y.S[r]={});var u=y.S[r],i="colibri_components",c=function(e,t,r,n){var o=u[e]=u[e]||{},c=o[t];(!c||!c.loaded&&(!n!=!c.eager?n:i>c.from))&&(o[t]={get:r,from:i,eager:!!n})},a=[];return"default"===r&&(c("prop-types","15.8.1",(function(){return function(){return y(980)}})),c("react","18.2.0",(function(){return function(){return y(784)}}))),e[r]=a.length?Promise.all(a).then((function(){return e[r]=1})):1}}}(),e=function(e){var t=function(e){return e.split(".").map((function(e){return+e==e?+e:e}))},r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=r[1]?t(r[1]):[];return r[2]&&(n.length++,n.push.apply(n,t(r[2]))),r[3]&&(n.push([]),n.push.apply(n,t(r[3]))),n},t=function(t,r){t=e(t),r=e(r);for(var n=0;;){if(n>=t.length)return n<r.length&&"u"!=(typeof r[n])[0];var o=t[n],u=(typeof o)[0];if(n>=r.length)return"u"==u;var i=r[n],c=(typeof i)[0];if(u!=c)return"o"==u&&"n"==c||"s"==c||"u"==u;if("o"!=u&&"u"!=u&&o!=i)return o<i;n++}},r=function(e){var t=e[0],n="";if(1===e.length)return"*";if(t+.5){n+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var o=1,u=1;u<e.length;u++)o--,n+="u"==(typeof(c=e[u]))[0]?"-":(o>0?".":"")+(o=2,c);return n}var i=[];for(u=1;u<e.length;u++){var c=e[u];i.push(0===c?"not("+a()+")":1===c?"("+a()+" || "+a()+")":2===c?i.pop()+" "+i.pop():r(c))}return a();function a(){return i.pop().replace(/^\((.+)\)$/,"$1")}},n=function(t,r){if(0 in t){r=e(r);var o=t[0],u=o<0;u&&(o=-o-1);for(var i=0,c=1,a=!0;;c++,i++){var f,s,l=c<t.length?(typeof t[c])[0]:"";if(i>=r.length||"o"==(s=(typeof(f=r[i]))[0]))return!a||("u"==l?c>o&&!u:""==l!=u);if("u"==s){if(!a||"u"!=l)return!1}else if(a)if(l==s)if(c<=o){if(f!=t[c])return!1}else{if(u?f>t[c]:f<t[c])return!1;f!=t[c]&&(a=!1)}else if("s"!=l&&"n"!=l){if(u||c<=o)return!1;a=!1,c--}else{if(c<=o||s<l!=u)return!1;a=!1}else"s"!=l&&"n"!=l&&(a=!1,c--)}}var p=[],d=p.pop.bind(p);for(i=1;i<t.length;i++){var y=t[i];p.push(1==y?d()|d():2==y?d()&d():y?n(y,r):!d())}return!!d()},o=function(e,r){var n=e[r];return Object.keys(n).reduce((function(e,r){return!e||!n[e].loaded&&t(e,r)?r:e}),0)},u=function(e,t,n,o){return"Unsatisfied version "+n+" from "+(n&&e[t][n].from)+" of shared singleton module "+t+" (required "+r(o)+")"},i=function(e,t,r,i){var f=o(e,r);return n(i,f)||c(u(e,r,f,i)),a(e[r][f])},c=function(e){"undefined"!=typeof console&&console.warn&&console.warn(e)},a=function(e){return e.loaded=1,e.get()},f=function(e){return function(t,r,n,o){var u=y.I(t);return u&&u.then?u.then(e.bind(e,t,y.S[t],r,n,o)):e(0,y.S[t],r,n,o)}}((function(e,t,r,n,o){return t&&y.o(t,r)?i(t,0,r,n):o()})),s={},l={268:function(){return f("default","react",[1,18],(function(){return function(){return y(784)}}))},805:function(){return f("default","prop-types",[1,15],(function(){return function(){return y(980)}}))}},[268,805].forEach((function(e){y.m[e]=function(t){s[e]=0,delete y.c[e];var r=l[e]();if("function"!=typeof r)throw new Error("Shared module is not available for eager consumption: "+e);t.exports=r()}}));var m=y(142);colibri_components=m}();