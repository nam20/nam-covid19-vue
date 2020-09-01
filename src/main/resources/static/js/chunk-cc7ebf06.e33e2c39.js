(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cc7ebf06"],{"1e4b":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:""}},[r("v-btn",{on:{click:function(e){return t.$router.push("/chartjs")}}},[t._v("뷰차트 테스트")]),r("v-row",[r("v-col",[r("v-card",[r("v-card-title",[r("h2",[r("span",{staticClass:"title mb-1"},[t._v("국내")])])]),r("v-list-item",[r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("확진")]),r("v-card-text",[r("h2",[t._v(t._s(t.koreaTotal.TotalConfirmed))])])],1),r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("완치")]),r("v-card-text",[r("h2",[t._v(t._s(t.koreaTotal.TotalRecovered))])])],1),r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("사망")]),r("v-card-text",[r("h2",[t._v(t._s(t.koreaTotal.TotalDeaths))])])],1)],1)],1)],1),r("v-col",[r("v-card",[r("v-card-title",[r("h2",[r("span",{staticClass:"title mb-1"},[t._v("해외")])])]),r("v-list-item",[r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("확진")]),r("v-card-text",[r("h2",[t._v(t._s(t.worldTotal.TotalConfirmed))])])],1),r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("완치")]),r("v-card-text",[r("h2",[t._v(t._s(t.worldTotal.TotalRecovered))])])],1),r("v-list-item-content",{staticClass:"justify-center"},[r("v-card-title",[t._v("사망")]),r("v-card-text",[r("h2",[t._v(t._s(t.worldTotal.TotalDeaths))])])],1)],1)],1)],1)],1),r("v-row",[r("v-col",[r("v-card",[r("h3",[t._v("국내 확진자수 증가추이")]),r("v-switch",{attrs:{label:"test"}}),t.loaded?r("line-chart",{attrs:{"chart-data":t.koreaChartData}}):t._e()],1)],1),r("v-col",[r("v-card",[r("h3",[t._v("국내 확진자 일일 신규")]),r("v-switch",{attrs:{label:"test"}}),t.loaded?r("line-chart",{attrs:{"chart-data":t.koreaDailyChartData}}):t._e()],1)],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12",xs:"12",md:"6"}},[r("v-card",[r("v-card-title",[r("h2",[r("span",{staticClass:"title mb-4"},[t._v("국내 주요 뉴우스")])])]),t._l(t.naverNews,(function(e){return r("v-card-text",{key:e},[r("h4",[r("a",{staticStyle:{"text-decoration":"none",color:"#2d46c4"},attrs:{href:e.href,target:"_blank"}},[t._v(t._s(e.title))])])])}))],2)],1),r("v-col",{attrs:{cols:"12",xs:"12",md:"6"}},[r("v-card",[r("v-card-title",[r("h2",[r("span",{staticClass:"title mb-4"},[t._v("해외 주요 뉴우스")])])]),t._l(t.googleNews,(function(e){return r("v-card-text",{key:e},[r("h4",[r("a",{staticStyle:{"text-decoration":"none",color:"#2d46c4"},attrs:{href:e.href,target:"_blank"}},[t._v(t._s(e.title))])])])}))],2)],1)],1),r("v-row",[r("v-col",[r("v-card",[r("h3",[t._v("연령대별 확진자 현황")]),t.genAgeChartLoaded?r("bar-chart",{attrs:{"chart-data":t.koreaAgeChartData}}):t._e()],1),r("v-card",[r("h3",[t._v("연령대별 치명율 현황")]),t.genAgeChartLoaded?r("bar-chart",{attrs:{"chart-data":t.koreaCriticalChartData}}):t._e()],1)],1)],1),r("v-row",[r("v-col",[r("v-card",[r("h3",[t._v("성별 확진자 현황")]),t.genAgeChartLoaded?r("bar-chart",{attrs:{"chart-data":t.koreaGenChartData}}):t._e()],1),r("v-card",[r("h3",[t._v("도시별 확진자 현황")]),t.cityChartLoaded?r("bar-chart",{attrs:{"chart-data":t.koreaCityChartData}}):t._e()],1)],1)],1),r("v-row",[r("v-col",[r("v-card",[r("GChart",{attrs:{type:"GeoChart",settings:{packages:["geochart"]},data:t.chartData,options:t.chartOptions}})],1)],1)],1)],1)},n=[],o=(r("d81d"),r("fb6a"),r("d3b7"),r("ac1f"),r("25f0"),r("5319"),r("96cf"),r("1da1")),c=r("4bd8"),i=r("3fdc"),s=r("cb43"),l={components:{LineChart:c["a"],BarChart:i["a"],GChart:s["GChart"]},data:function(){return{worldTotal:{},koreaTotal:{},koreaTotalChartData:null,koreaDailyChartData:null,koreaGenChartData:null,koreaAgeChartData:null,koreaCriticalChartData:null,koreaCityChartData:null,loaded:!1,naverNews:"",googleNews:"",genAgeChartLoaded:!1,cityChartLoaded:!1,chartData:[["Destination","Popularity"],["KR-11",600],["KR-50",400],["KR-27",400]],chartOptions:{region:"KR",resolution:"provinces"}}},created:function(){this.getWorldTotal(),this.corona(),this.googleCrawling(),this.naverCrawling(),this.covidGenAge(),this.covidCity()},methods:{getWorldTotal:function(){var t=this;axios.get("https://api.covid19api.com/world/total").then((function(e){var r=e.data;t.worldTotal={TotalConfirmed:t.numberFormat(r.TotalConfirmed),TotalDeaths:t.numberFormat(r.TotalDeaths),TotalRecovered:t.numberFormat(r.TotalRecovered)}})).catch((function(t){console.error(t)}))},corona:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,n,o,c,i,s,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("https://api.covid19api.com/total/country/south-korea");case 3:for(r=e.sent,a=r.data,console.log(a),n=a.map((function(t){return t.Date.substring(5,10)})),o=a.map((function(t){return t.Confirmed})),c=a.map((function(t){return t.Recovered})),i=a.map((function(t){return t.Deaths})),t.koreaChartData={labels:n,datasets:[{label:"Confirmed",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:o},{label:"Recovered",borderColor:"#0ecf4b",backgroundColor:"rgba(14, 207, 75, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:c},{label:"Deaths",borderColor:"#c70808",backgroundColor:"rgba(199, 8, 8, 0.7)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:i}]},s=o.slice(o.length-31),l=n.slice(n.length-30),u=0;u<30;u++)s[u]=s[u+1]-s[u];console.log(s),t.koreaDailyChartData={labels:l,datasets:[{label:"Confirmed",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:s.slice(0,s.length-1)}]},t.koreaTotal={TotalConfirmed:t.numberFormat(o[o.length-1]),TotalDeaths:t.numberFormat(i[i.length-1]),TotalRecovered:t.numberFormat(c[c.length-1])},t.loaded=!0,e.next=23;break;case 20:e.prev=20,e.t0=e["catch"](0),console.error(e.t0);case 23:case"end":return e.stop()}}),e,null,[[0,20]])})))()},naverCrawling:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("/covid/naverCrawling");case 3:r=e.sent,a=r.data,t.naverNews=a,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},googleCrawling:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("/covid/googleCrawling");case 3:r=e.sent,a=r.data,t.googleNews=a,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},covidGenAge:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,n,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("/covid/case/genAge");case 3:r=e.sent,console.log(r),a=r.data.response.body.items.item,n=a.slice(0,9),o=a.slice(9,11),c=n.map((function(t){return t.gubun})),t.koreaAgeChartData={labels:c,datasets:[{label:"확진자",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:n.map((function(t){return t.confCase}))}]},t.koreaCriticalChartData={labels:c,datasets:[{label:"치명율 (사망자/확진자)",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:n.map((function(t){return t.criticalRate}))}]},t.koreaGenChartData={labels:o.map((function(t){return t.gubun})),datasets:[{label:"확진자",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:o.map((function(t){return t.confCase}))}]},t.genAgeChartLoaded=!0,console.log(c),e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](0),console.error(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))()},covidCity:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("/covid/case/city");case 3:r=e.sent,a=r.data.response.body.items.item.slice(0,18),console.log(a),t.koreaCityChartData={labels:a.map((function(t){return t.gubun})),datasets:[{label:"확진자",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:a.map((function(t){return t.defCnt}))}]},t.cityChartLoaded=!0,e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},numberFormat:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}},u=l,d=r("2877"),h=r("6544"),f=r.n(h),v=r("8336"),b=r("b0af"),p=r("99d9"),g=r("62ad"),C=r("a523"),m=r("da13"),y=r("5d23"),w=r("0fd9"),_=r("b73d"),k=Object(d["a"])(u,a,n,!1,null,"e4866d82",null);e["default"]=k.exports;f()(k,{VBtn:v["a"],VCard:b["a"],VCardText:p["b"],VCardTitle:p["c"],VCol:g["a"],VContainer:C["a"],VListItem:m["a"],VListItemContent:y["a"],VRow:w["a"],VSwitch:_["a"]})},"757f":function(t,e,r){(function(e){t.exports=function(t){function e(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,a){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,r){"use strict";function a(){return window.google&&window.google.charts?Promise.resolve(window.google.charts):(i||(i=new Promise((function(t){var e=document.createElement("script");e.type="text/javascript",e.onload=function(){return t(window.google.charts)},e.src=c,document.body.appendChild(e)}))),i)}function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return a().then((function(r){if("object"!==(void 0===e?"undefined":o(e)))throw new Error("Google Charts loader: settings must be an object");var a=t+"_"+JSON.stringify(e,Object.keys(e).sort());if(s.has(a))return s.get(a);var n=new Promise((function(a){r.load(t,e),r.setOnLoadCallback((function(){return a(window.google)}))}));return s.set(a,n),n}))}e.a=n;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c="https://www.gstatic.com/charts/loader.js",i=null,s=new Map},function(t,e,r){var a=r(5)(r(4),r(6),null,null);t.exports=a.exports},function(t,e){t.exports=function(t,e,r){function a(){var l=Date.now()-i;l<e&&l>=0?n=setTimeout(a,e-l):(n=null,r||(s=t.apply(c,o),c=o=null))}var n,o,c,i,s;null==e&&(e=100);var l=function(){c=this,o=arguments,i=Date.now();var l=r&&!n;return n||(n=setTimeout(a,e)),l&&(s=t.apply(c,o),c=o=null),s};return l.clear=function(){n&&(clearTimeout(n),n=null)},l.flush=function(){n&&(s=t.apply(c,o),c=o=null,clearTimeout(n),n=null)},l}},function(t,r,a){"use strict";function n(t){t.component("GChart",i.a)}Object.defineProperty(r,"__esModule",{value:!0}),r.install=n;var o=a(0),c=a(1),i=a.n(c);a.d(r,"loadGoogleCharts",(function(){return o.a})),a.d(r,"GChart",(function(){return i.a}));var s={version:"0.3.3",install:n};r.default=s;var l=null;"undefined"!=typeof window?l=window.Vue:"undefined"!=typeof e&&(l=e.Vue),l&&l.use(s)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(0),n=r(2),o=r.n(n),c=function(){function t(t,e){var r=[],a=!0,n=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(a=(c=i.next()).done)&&(r.push(c.value),!e||r.length!==e);a=!0);}catch(s){n=!0,o=s}finally{try{!a&&i.return&&i.return()}finally{if(n)throw o}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=null;e.default={name:"GChart",props:{type:{type:String},data:{type:[Array,Object],default:function(){return[]}},options:{type:Object,default:function(){return{}}},version:{type:String,default:"current"},settings:{type:Object,default:function(){return{packages:["corechart","table"]}}},events:{type:Object},createChart:{type:Function},resizeDebounce:{type:Number,default:200}},data:function(){return{chartObject:null}},watch:{data:{deep:!0,handler:function(){this.drawChart()}},options:{deep:!0,handler:function(){this.drawChart()}},type:function(t){this.createChartObject(),this.drawChart()}},mounted:function(){var t=this;r.i(a.a)(this.version,this.settings).then((function(e){s=e;var r=t.createChartObject();t.$emit("ready",r,e),t.drawChart()})),this.resizeDebounce>0&&window.addEventListener("resize",o()(this.drawChart,this.resizeDebounce))},beforeDestroy:function(){this.chartObject&&"function"==typeof this.chartObject.clearChart&&this.chartObject.clearChart()},methods:{drawChart:function(){if(s&&this.chartObject){var t=this.getValidChartData();t&&this.chartObject.draw(t,this.options)}},getValidChartData:function(){return this.data instanceof s.visualization.DataTable||this.data instanceof s.visualization.DataView?this.data:Array.isArray(this.data)?s.visualization.arrayToDataTable(this.data):null!==this.data&&"object"===i(this.data)?new s.visualization.DataTable(this.data):null},createChartObject:function(){var t=function(t,e,r){if(!r)throw new Error("please, provide chart type property");return new e.visualization[r](t)},e=this.createChart||t;return this.chartObject=e(this.$refs.chart,s,this.type),this.attachListeners(),this.chartObject},attachListeners:function(){var t=this;this.events&&Object.entries(this.events).forEach((function(e){var r=c(e,2),a=r[0],n=r[1];s.visualization.events.addListener(t.chartObject,a,n)}))}}}},function(t,e){t.exports=function(t,e,r,a){var n,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(n=t,o=t.default);var i="function"==typeof o?o.options:o;if(e&&(i.render=e.render,i.staticRenderFns=e.staticRenderFns),r&&(i._scopeId=r),a){var s=i.computed||(i.computed={});Object.keys(a).forEach((function(t){var e=a[t];s[t]=function(){return e}}))}return{esModule:n,exports:o,options:i}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"chart"})},staticRenderFns:[]}}])}).call(this,r("c8ba"))},"99d9":function(t,e,r){"use strict";r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return s}));var a=r("b0af"),n=r("80d2"),o=Object(n["h"])("v-card__actions"),c=Object(n["h"])("v-card__subtitle"),i=Object(n["h"])("v-card__text"),s=Object(n["h"])("v-card__title");a["a"]},cb43:function(t,e,r){"use strict";var a=r("757f");r.o(a,"GChart")&&r.d(e,"GChart",(function(){return a["GChart"]}))}}]);
//# sourceMappingURL=chunk-cc7ebf06.e33e2c39.js.map