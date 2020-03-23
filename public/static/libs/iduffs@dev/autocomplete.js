/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/flexsearch/dist/flexsearch.min.js":
/*!********************************************************!*\
  !*** ./node_modules/flexsearch/dist/flexsearch.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**!
 * FlexSearch.js v0.7.0
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/flexsearch
 */
(function(){'use strict';Object.assign||(Object.assign=function(){for(var a=arguments,b=a.length,c=a[0],d=1,e,f,g;d<b;d++){e=a[d];f=Object.keys(e);g=f.length;for(var h=0,k;h<g;h++)k=f[h],c[k]=e[k]}return c});window.requestAnimationFrame||(window.requestAnimationFrame=window.setTimeout);window.cancelAnimationFrame||(window.cancelAnimationFrame=window.clearTimeout);window.Promise||(window.Promise=function(){function a(b){this.b=null;var c=this;b(function(d){c.b&&(c.b(d),c.b=null)})}a.prototype.then=function(b){this.b=b};return a}());function t(a){return"string"===typeof a}function y(a){return a.constructor===Array}function z(a){return"function"===typeof a}function E(a){return"object"===typeof a}function F(a){return"undefined"===typeof a}function aa(a){for(var b=Array(a),c=0;c<a;c++)b[c]=G();return b}function G(){return Object.create(null)}function K(a,b){for(var c=0,d=b.length;c<d&&(a=a.replace(b[c],b[c+1]),a);c+=2);return a}function L(a){return new RegExp(a,"g")}
function ba(a){for(var b="",c="",d=0,e=a.length,f=void 0;d<e;d++)(f=a[d])!==c&&(b+=c=f);return b}function O(a,b,c,d){if(b&&(c&&b&&(b=K(b,c)),b&&a.u&&(b=K(b,a.u)),a.A&&1<b.length&&(b=K(b,a.A)),b&&(d||""===d)&&(b=b.split(d),a.filter))){a=a.filter;c=b.length;d=[];for(var e=0,f=0;e<c;e++){var g=b[e];g&&!a[g]&&(d[f++]=g)}b=d}return b};P.prototype.export=function(a){var b=!a||F(a.serialize)||a.serialize;if(this.a){var c=!a||F(a.doc)||a.doc,d=!a||F(a.index)||a.index;a=[];var e=0;if(d)for(d=this.a.keys;e<d.length;e++){var f=this.a.index[d[e]];a[e]=[f.j,f.i,Object.keys(f.f)]}c&&(a[e]=this.l)}else a=[this.j,this.i,Object.keys(this.f)];b&&(a=JSON.stringify(a));return a};
P.prototype.import=function(a,b){if(!b||F(b.serialize)||b.serialize)a=JSON.parse(a);var c={};if(this.a){var d=!b||F(b.doc)||b.doc,e=0;if(!b||F(b.index)||b.index){b=this.a.keys;for(var f=b.length,g=a[0][2];e<g.length;e++)c[g[e]]=1;for(e=0;e<f;e++){g=this.a.index[b[e]];var h=a[e];h&&(g.j=h[0],g.i=h[1],g.f=c)}}d&&(this.l=E(d)?d:a[e])}else{d=a[2];for(e=0;e<d.length;e++)c[d[e]]=1;this.j=a[0];this.i=a[1];this.f=c}};P.prototype.find=function(a,b){return this.where(a,b,1)[0]||null};
P.prototype.where=function(a,b,c,d){var e=this.l,f=[],g=0,h;if(E(a)){c||(c=b);var k=Object.keys(a);var m=k.length;var q=!1;if(1===m&&"id"===k[0])return[e[a.id]];if((h=this.F)&&!d)for(var r=0;r<h.length;r++){var p=h[r],l=a[p];if(!F(l)){var n=this.w[p]["@"+l];if(0===--m)return n;k.splice(k.indexOf(p),1);delete a[p];break}}h=Array(m);for(r=0;r<m;r++)h[r]=k[r].split(":")}else{if(z(a)){b=d||Object.keys(e);c=b.length;for(k=0;k<c;k++)m=e[b[k]],a(m)&&(f[g++]=m);return f}if(F(b))return[e[a]];if("id"===a)return[e[b]];
k=[a];m=1;h=[a.split(":")];q=!0}d=n||d||Object.keys(e);r=d.length;for(p=0;p<r;p++){l=n?d[p]:e[d[p]];for(var w=!0,v=0;v<m;v++){q||(b=a[k[v]]);var x=h[v],u=x.length,A=l;if(1<u)for(var B=0;B<u;B++)A=A[x[B]];else A=A[x[0]];if(A!==b){w=!1;break}}if(w&&(f[g++]=l,c&&g===c))break}return f};function S(a){this.clear();this.m=!0!==a&&a}S.prototype.clear=function(){this.cache=G();this.count=G();this.index=G();this.b=[]};S.prototype.set=function(a,b){if(this.m&&F(this.cache[a])){var c=this.b.length;if(c===this.m){c--;var d=this.b[c];delete this.cache[d];delete this.count[d];delete this.index[d]}this.b[c]=a;this.index[a]=c;this.count[a]=-1;this.cache[a]=b;this.get(a)}else this.cache[a]=b};
S.prototype.get=function(a){var b=this.cache[a];if(this.m&&b){var c=++this.count[a],d=this.index,e=d[a];if(0<e){for(var f=this.b,g=e;this.count[f[--e]]<=c&&-1!==e;);e++;if(e!==g){for(c=g;c>e;c--)g=f[c-1],f[c]=g,d[g]=c;f[e]=a;d[a]=e}}}return b};var U={},da="undefined"!==typeof Blob&&"undefined"!==typeof URL&&URL.createObjectURL;function ea(a,b,c){var d=fa,e="flexsearch";d=da?URL.createObjectURL(new Blob(["("+d.toString()+")()"],{type:"text/javascript"})):e+".browser.js";e+="-"+a;U[e]||(U[e]=[]);U[e][c]=new Worker(d);U[e][c].onmessage=b;return U[e][c]}
function fa(){var a,b;self.onmessage=function(c){if(c=c.data)if(c.search){var d=b.search(c.content,c.threshold?{limit:c.limit,threshold:c.threshold,where:c.where}:c.limit);self.postMessage({id:a,content:c.content,limit:c.limit,result:d})}else c.add?b.add(c.id,c.content):c.update?b.update(c.id,c.content):c.remove?b.remove(c.id):c.clear?b.clear():c.info?(c=b.info(),c.worker=a,console.log(c)):c.register&&(a=c.id,c.options.cache=!1,c.options.async=!1,c.options.worker=!1,b=(new Function(c.register.substring(c.register.indexOf("{")+
1,c.register.lastIndexOf("}"))))(),b=new b(c.options))}}function ha(a,b,c,d){a=ea("id"+a,function(f){(f=f.data)&&f.result&&d(f.id,f.content,f.result,f.limit,f.where,f.cursor,f.suggest)},b);var e=P.toString();c.id=b;a.postMessage({register:e,options:c,id:b});return a}P.prototype.G=function(a,b,c,d){this.s!==this.v&&(this.o=this.o.concat(c),this.s++,d&&this.o.length>=d&&(this.s=this.v),this.s===this.v&&(this.cache&&this.g.set(b,this.o),this.C&&this.C(this.o)));return this};var ia={memory:{charset:"latin:extra",threshold:0,c:1},speed:{threshold:1,c:3,depth:2},match:{charset:"latin:extra",B:"full",threshold:1,c:3},score:{charset:"latin:extra",threshold:1,c:9,depth:4},balance:{charset:"latin:balance",threshold:0,c:3,depth:3},fast:{threshold:8,c:9,depth:1}};var ka={encode:ja,h:!1},la=/[\W_]+/;function ja(a){return O(this,a.toLowerCase(),!1,la)};var ma=0,na={},V={};function P(a){if(!(this instanceof P))return new P(a);var b=a&&a.id;this.id=b||0===b?b:ma++;this.init(a);oa(this,"index",function(){return this.a?Object.keys(this.a.index[this.a.keys[0]].f):Object.keys(this.f)});oa(this,"length",function(){return this.index.length})}P.registerCharset=function(a,b){V[a]=b;return P};P.registerLanguage=function(a,b){na[a]=b;return P};
P.prototype.init=function(a){var b,c;if(a)if(t(a))a=ia[a];else if(b=a.preset)a=Object.assign({},ia[b],a);a||(a={});if(b=a.worker){if("undefined"===typeof ea)a.worker=!1,this.m=null;else{var d=parseInt(b,10)||4;this.s=0;this.o=[];this.C=null;this.m=Array(d);for(var e=0;e<d;e++)this.m[e]=ha(this.id,e,a,this.G)}this.v=b}this.async=a.async;d=a.charset;e=a.lang;t(d)&&(-1===d.indexOf(":")&&(d+=":default"),d=V[d]);t(e)&&(e=na[e]);this.D=b=d&&d.B||a.tokenize||"strict";this.depth="strict"===b&&a.depth||0;
this.h=d&&d.h||a.rtl||!1;this.c=a.resolution||9;this.threshold=b=a.threshold||0;this.c<=b&&(this.c=b+1);this.encode=a.encode||d&&d.encode||ja;this.u=(b=a.matcher||e&&e.u)&&pa(b,!1);this.A=(b=a.stemmer||e&&e.A)&&pa(b,!0);if(d=b=a.filter||e&&e.filter){d=b;e=G();var f=0;for(c=d.length;f<c;f++)e[d[f]]=1;d=e}this.filter=d;(this.a=c=(b=a.doc)&&qa(b))&&(a.doc=null);this.j=aa(this.c-this.threshold);this.i=G();this.f=G();if(c){this.l=G();d=c.index={};e=c.keys=[];f=c.field;var g=c.tag,h=c.store;y(c.id)||(c.id=
c.id.split(":"));if(h){var k=G();if(t(h))k[h]=1;else if(y(h))for(var m=0;m<h.length;m++)k[h[m]]=1;else E(h)&&(k=h);c.store=k}if(g){this.w=G();h=G();if(f)if(t(f))h[f]=a;else if(y(f))for(k=0;k<f.length;k++)h[f[k]]=a;else E(f)&&(h=f);y(g)||(c.tag=g=[g]);for(f=0;f<g.length;f++)this.w[g[f]]=G();this.F=g;f=h}if(f){if(!y(f))if(E(f)){var q=f;c.field=f=Object.keys(f)}else c.field=f=[f];for(c=0;c<f.length;c++)g=f[c],y(g)||(q&&(a=q[g]),e[c]=g,f[c]=g.split(":")),d[g]=new P(a)}}this.b=!0;this.g=(b=a.cache)&&new S(b);
return this};function qa(a){var b=G(),c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];b[c]=y(d)?d.slice(0):E(d)?qa(d):d}return b}
P.prototype.add=function(a,b,c,d,e){if(this.a&&E(a))return W(this,"add",a,b);if(b&&t(b)&&(a||0===a)){if(this.f[a]&&!d)return this.update(a,b);if(!e){if(this.async&&"function"!==typeof importScripts){var f=this,g=new Promise(function(M){setTimeout(function(){f.add(a,b,null,d,!0);f=null;M()})});if(c)g.then(c);else return g;return this}if(c)return this.add(a,b,null,d,!0),c(),this}b=this.encode(b);if(!b.length)return this;c=b;e=G();e._ctx=G();for(var h=c.length,k=this.threshold,m=this.depth,q=this.c,
r=this.j,p=this.h,l=0;l<h;l++){var n=c[l];if(n){g=1;var w=n.length,v=(p?l+1:h-l)/h,x="";switch(this.D){case "reverse":case "both":for(var u=w;--u;)x=n[u]+x,X(r,e,x,a,p?1:(w-u)/w,v,k,q-1);x="";case "forward":for(u=0;u<w;u++)x+=n[u],X(r,e,x,a,p?(u+1)/w:1,v,k,q-1);break;case "full":for(u=0;u<w;u++)for(var A=(p?u+1:w-u)/w,B=w;B>u;B--)x=n.substring(u,B),X(r,e,x,a,A,v,k,q-1);break;default:if(w=X(r,e,n,a,1,v,k,q-1),m&&1<h&&w>=k)for(w=e._ctx[n]||(e._ctx[n]=G()),n=this.i[n]||(this.i[n]=aa(q-(k||0))),v=l-m,
x=l+m+1,0>v&&(v=0),x>h&&(x=h);v<x;v++)v!==l&&X(n,w,c[v],a,0,q-(v<l?l-v:v-l),k,q-1)}}}g&&(this.f[a]=1);this.b=!1}return this};
function W(a,b,c,d){if(y(c)){var e=c.length;if(e)for(var f=0;f<e;f++)W(a,b,c[f],f===e-1&&d)}else{var g=a.a.index,h=a.a.keys,k=a.a.tag;f=a.a.store;var m;var q=a.a.id;e=c;for(var r=0;r<q.length;r++)e=e[q[r]];if("remove"===b){if(delete a.l[e],c=h.length)for(f=0;f<c;f++)g[h[f]].remove(e,f===c-1&&d)}else{if(k){for(m=0;m<k.length;m++){var p=k[m];var l=c;q=p.split(":");for(r=0;r<q.length;r++)l=l[q[r]];l="@"+l}m=a.w[p];m=m[l]||(m[l]=[])}q=a.a.field;k=0;for(p=q.length;k<p;k++){r=q[k];l=c;for(var n=0;n<r.length;n++)l=
l[r[n]];r=g[h[k]];"add"===b?r.add(e,l,k===p-1&&d):r.update(e,l,k===p-1&&d)}if(f){d=Object.keys(f);b=G();for(g=0;g<d.length;g++)if(h=d[g],f[h])for(h=h.split(":"),k=q=void 0,p=0;p<h.length;p++)l=h[p],q=(q||c)[l],k=(k||b)[l]=q;c=b}m&&(m[m.length]=c);a.l[e]=c}}return a}P.prototype.update=function(a,b,c){if(this.a&&E(a))return W(this,"update",a,b);this.f[a]&&t(b)&&(this.remove(a),this.add(a,b,c,!0));return this};
P.prototype.remove=function(a,b,c){if(this.a&&E(a))return W(this,"remove",a,b);if(this.f[a]){if(!c){if(this.async&&"function"!==typeof importScripts){var d=this;c=new Promise(function(e){setTimeout(function(){d.remove(a,null,!0);d=null;e()})});if(b)c.then(b);else return c;return this}if(b)return this.remove(a,null,!0),b(),this}for(b=0;b<this.c-(this.threshold||0);b++)ra(this.j[b],a);this.depth&&ra(this.i,a);delete this.f[a];this.b=!1}return this};var Y;
function sa(a,b,c,d,e,f,g,h,k,m,q){d=ta(d,h?0:f,k,g,c,m,q);if(k){k=d.page;var r=d.next;d=d.result}if(h)d=a.where(h,null,f,d);else{c=d;d=a.l;f=c.length;g=Array(f);for(h=0;h<f;h++)g[h]=d[c[h]];d=g}e&&(z(e)||(Y=e.split(":"),e=1<Y.length?ua:va),d.sort(e));d=Z(k,r,d);a.g&&a.g.set(b,d);return d}
P.prototype.search=function(a,b,c,d){if(E(b)){if(y(b))for(var e=0;e<b.length;e++)b[e].query=a;else b.query=a;a=b;b=1E3}else b&&z(b)?(c=b,b=1E3):b||0===b||(b=1E3);var f=[],g=a;if(E(a)&&!y(a)){c||(c=a.callback)&&(g.callback=null);var h=a.sort;var k=a.page;b=a.limit;var m=a.threshold;var q=a.suggest;a=a.query}if(this.a){m=this.a.index;var r=g.where,p=g.bool||"or",l=g.field,n=p,w,v;if(l)y(l)||(l=[l]);else if(y(g)){var x=g;l=[];n=[];for(var u=0;u<g.length;u++)d=g[u],e=d.bool||p,l[u]=d.field,n[u]=e,"not"===
e?w=!0:"and"===e&&(v=!0)}else l=this.a.keys;p=l.length;for(u=0;u<p;u++)x&&(g=x[u]),k&&!t(g)&&(g.page=null,g.limit=0),f[u]=m[l[u]].search(g,0);if(c)return c(sa(this,a,n,f,h,b,q,r,k,v,w));if(this.async){var A=this;return new Promise(function(ca){Promise.all(f).then(function(za){ca(sa(A,a,n,za,h,b,q,r,k,v,w))})})}return sa(this,a,n,f,h,b,q,r,k,v,w)}m||(m=this.threshold||0);if(!d){if(this.async&&"function"!==typeof importScripts){var B=this;m=new Promise(function(ca){setTimeout(function(){ca(B.search(g,
b,null,!0));B=null})});if(c)m.then(c);else return m;return this}if(c)return c(this.search(g,b,null,!0)),this}if(!a||!t(a))return f;g=a;if(this.g)if(this.b){if(c=this.g.get(a))return c}else this.g.clear(),this.b=!0;g=this.encode(g);if(!g.length)return f;c=g;x=c.length;d=!0;e=[];var M=G(),Q=0;1<x&&(this.depth?p=!0:c.sort(wa));if(!p||(u=this.i))for(var T=this.c;Q<x;Q++){var C=c[Q];if(C){if(p){if(!l)if(u[C])l=C,M[C]=1;else if(!q)return f;if(q&&Q===x-1&&!e.length)p=!1,C=l||C,M[C]=0;else if(!l)continue}if(!M[C]){var D=
[],N=!1,H=0,I=p?u[l]:this.j;if(I)for(var R=void 0,J=0;J<T-m;J++)if(R=I[J]&&I[J][C])D[H++]=R,N=!0;if(N)l=C,e[e.length]=1<H?D.concat.apply([],D):D[0];else if(!q){d=!1;break}M[C]=1}}}else d=!1;d&&(f=ta(e,b,k,q));this.g&&this.g.set(a,f);return f};P.prototype.info=function(){return{id:this.id,items:this.length,matcher:this.u.length,worker:this.v,threshold:this.threshold,depth:this.depth,resolution:this.c,contextual:this.depth&&"strict"===this.D}};P.prototype.clear=function(){return this.destroy().init()};
P.prototype.destroy=function(){this.g&&(this.g.clear(),this.g=null);this.j=this.i=this.f=null;if(this.a){for(var a=this.a.keys,b=0;b<a.length;b++)this.a.index[a[b]].destroy();this.a=this.l=null}return this};function oa(a,b,c){Object.defineProperty(a,b,{get:c})}function X(a,b,c,d,e,f,g,h){if(b[c])return b[c];e=e?(h-(g||h/1.5))*f+(g||h/1.5)*e:f;b[c]=e;e>=g&&(a=a[h-(e+.5>>0)],a=a[c]||(a[c]=[]),a[a.length]=d);return e}
function ra(a,b){if(a)for(var c=Object.keys(a),d=0,e=c.length;d<e;d++){var f=c[d],g=a[f];if(g)for(var h=0,k=g.length;h<k;h++)if(g[h]===b){1===k?delete a[f]:g.splice(h,1);break}else E(g[h])&&ra(g[h],b)}}function pa(a,b){for(var c=Object.keys(a),d=c.length,e=[],f="",g=0,h=0,k;h<d;h++){var m=c[h];(k=a[m])?(e[g++]=L(b?"(?!\\b)"+m+"(\\b|_)":m),e[g++]=k):f+=(f?"|":"")+m}f&&(e[g++]=L(b?"(?!\\b)("+f+")(\\b|_)":"("+f+")"),e[g]="");return e}function wa(a,b){return b.length-a.length}
function va(a,b){a=a[Y];b=b[Y];return a<b?-1:a>b?1:0}function ua(a,b){for(var c=Y.length,d=0;d<c;d++)a=a[Y[d]],b=b[Y[d]];return a<b?-1:a>b?1:0}function Z(a,b,c){return a?{page:a,next:b?""+b:null,result:c}:c}
function ta(a,b,c,d,e,f,g){var h=[];if(!0===c){c="0";var k=""}else k=c&&c.split(":");var m=a.length;if(1<m){var q=G(),r=[],p,l=0,n,w=!0,v=0,x;if(k)if(2===k.length){var u=k;k=!1}else k=x=parseInt(k[0],10);if(g){for(p=G();l<m;l++)if("not"===e[l]){var A=a[l];var B=A.length;for(n=0;n<B;n++)p["@"+A[n]]=1}else var M=l+1;if(F(M))return Z(c,J,h);l=0}else var Q=t(e)&&e;for(var T;l<m;l++){var C=l===(M||m)-1;if(!Q||!l)if((n=Q||e&&e[l])&&"and"!==n)if("or"===n)T=!1;else continue;else T=f=!0;A=a[l];if(B=A.length){if(w)if(H){var D=
H.length;for(n=0;n<D;n++){w=H[n];var N="@"+w;g&&p[N]||(q[N]=1,f||(h[v++]=w))}var H=null;w=!1}else{H=A;continue}N=!1;for(n=0;n<B;n++){D=A[n];var I="@"+D,R=f?q[I]||0:l;if(!(!R&&!d||g&&p[I]||!f&&q[I]))if(R===l){if(C){if(!x||--x<v)if(h[v++]=D,b&&v===b)return Z(c,v+(k||0),h)}else q[I]=l+1;N=!0}else d&&(I=r[R]||(r[R]=[]),I[I.length]=D)}if(T&&!N&&!d)break}else if(T&&!d)return Z(c,J,A)}if(H)if(l=H.length,g)for(n=k?parseInt(k,10):0;n<l;n++)a=H[n],p["@"+a]||(h[v++]=a);else h=H;if(d)for(v=h.length,u?(l=parseInt(u[0],
10)+1,n=parseInt(u[1],10)+1):(l=r.length,n=0);l--;)if(D=r[l]){for(B=D.length;n<B;n++)if(d=D[n],!g||!p["@"+d])if(h[v++]=d,b&&v===b)return Z(c,l+":"+n,h);n=0}}else!m||e&&"not"===e[0]||(h=a[0],k&&(k=parseInt(k[0],10)));if(b){g=h.length;k&&k>g&&(k=0);k=k||0;var J=k+b;J<g?h=h.slice(k,J):(J=0,k&&(h=h.slice(k)))}return Z(c,J,h)};var ya={encode:xa,h:!1},Aa=/[\W_]+/,Ba=[L("[\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5]"),"a",L("[\u00e8\u00e9\u00ea\u00eb]"),"e",L("[\u00ec\u00ed\u00ee\u00ef]"),"i",L("[\u00f2\u00f3\u00f4\u00f5\u00f6\u0151]"),"o",L("[\u00f9\u00fa\u00fb\u00fc\u0171]"),"u",L("[\u00fd\u0177\u00ff]"),"y",L("\u00f1"),"n",L("[\u00e7c]"),"k",L("\u00df"),"s",L(" & ")," and "];function xa(a,b){return O(b||this,a.toLowerCase(),Ba,Aa)};var Ca=[L("ae"),"a",L("ai"),"ei",L("ay"),"ei",L("ey"),"ei",L("oe"),"o",L("ue"),"u",L("ie"),"i",L("sz"),"s",L("zs"),"s",L("sh"),"s",L("ck"),"k",L("cc"),"k",L("th"),"t",L("dt"),"t",L("ph"),"f",L("pf"),"f",L("ou"),"o",L("uo"),"u"];function Da(a,b,c){a&&(a=xa(a,b||this).join(" "),2<a.length&&(a=K(a,Ca)),c||(1<a.length&&(a=ba(a)),a&&(a=a.split(" "))));return a};var Fa={encode:Ea,h:!1},Ga=/[\W_]+/;function Ea(a){return O(this,a.toLowerCase(),!1,Ga)};var Ia={encode:Ha,h:!1},Ja=[L("(?!\\b)p"),"b",L("(?!\\b)z"),"s",L("(?!\\b)[cgq]"),"k",L("(?!\\b)n"),"m",L("(?!\\b)d"),"t",L("(?!\\b)[vw]"),"f",L("(?!\\b)[aeiouy]"),""];function Ha(a){a&&(a=Da(a,this,!0),1<a.length&&(a=K(a,Ja)),1<a.length&&(a=ba(a)),a&&(a=a.split(" ")));return a};var La={encode:Ka,h:!1,B:"strict"},Ma=/[^a-z]+/;function Ka(a){a=O(this,a.toLowerCase(),!1,!1);var b=[];if(a)for(var c=a.split(Ma),d=c.length,e=0,f=0;e<d;e++)if((a=c[e])&&2<a.length&&(!this.filter||!this.filter[a])){for(var g=a[0],h=Na(g),k=1;k<a.length;k++){var m=Na(a[k]);if(m!==h&&(g+=m,h=m,4===g.length))break}b[f++]=(g+"0000").substring(0,4)}return b}
function Na(a){switch(a){case "b":case "f":case "p":case "v":return 1;case "c":case "g":case "j":case "k":case "q":case "s":case "x":case "z":return 2;case "d":case "t":return 3;case "l":return 4;case "m":case "n":return 5;case "r":return 6}return""};var Pa={encode:Oa,h:!0},Qa=/[\x00-\x7F]+/g;function Oa(a){return O(this,a.replace(Qa," "),!1," ")};var Sa={encode:Ra,h:!1,B:"strict"},Ta=/[\x00-\x7F]+/g;function Ra(a){return O(this,a.replace(Ta,""),!1,"")};var Va={encode:Ua,h:!1},Wa=/[\x00-\x7F]+/g;function Ua(a){return O(this,a.replace(Wa," "),!1," ")};V["latin:advanced"]={encode:Da,h:!1};V["latin:balance"]=Fa;V["latin:default"]=ka;V["latin:extra"]=Ia;V["latin:simple"]=ya;V["latin:soundex"]=La;V["arabic:default"]=Pa;V["cjk:default"]=Sa;V["cyrillic:default"]=Va;(function(){var a=this||window,b;(b=a.define)&&b.amd?b([],function(){return P}):"object"===typeof a.exports?a.module.exports=P:a.FlexSearch=P})();}).call(this);


/***/ }),

/***/ "./resources/js/libs/iduffs/autocomplete.js":
/*!**************************************************!*\
  !*** ./resources/js/libs/iduffs/autocomplete.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 IdUFFS Autocomplete v0.1.0
 Copyright 2020 Fernando Bevilacqua
 Author: Fernando Bevilacqua
 Released under the MIT Licence
 https://github.com/ccuffs/api-cc/
*/
var FlexSearch = __webpack_require__(/*! flexsearch */ "./node_modules/flexsearch/dist/flexsearch.min.js");

var IDUFFS = IDUFFS || {};

IDUFFS.AutoComplete = function () {};

/***/ }),

/***/ 1:
/*!********************************************************!*\
  !*** multi ./resources/js/libs/iduffs/autocomplete.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/d/wamp/www/api-cc/resources/js/libs/iduffs/autocomplete.js */"./resources/js/libs/iduffs/autocomplete.js");


/***/ })

/******/ });