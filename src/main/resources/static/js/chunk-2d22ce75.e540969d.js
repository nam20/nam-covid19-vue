(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22ce75"],{f4e6:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-text-field",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),n("v-text-field",{model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),n("v-btn",{on:{click:t.submitPost}},[t._v("작성")])],1)},o=[],c={data:function(){return{title:"",content:""}},methods:{submitPost:function(){this.$store.dispatch("post/addPost",{title:this.title,content:this.content})}}},l=c,s=n("2877"),a=n("6544"),u=n.n(a),r=n("8336"),d=n("a523"),f=n("8654"),p=Object(s["a"])(l,i,o,!1,null,null,null);e["default"]=p.exports;u()(p,{VBtn:r["a"],VContainer:d["a"],VTextField:f["a"]})}}]);
//# sourceMappingURL=chunk-2d22ce75.e540969d.js.map