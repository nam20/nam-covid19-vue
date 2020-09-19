(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b5ae224"],{"1b2c":function(t,e,i){},"406b":function(t,e,i){"use strict";i.r(e);var s,n,a,r,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("h2",[t._v("example vue-chartjs")]),i("v-col",[i("v-card",[i("h3",[t._v("Line Chart")]),i("v-switch",{attrs:{label:"test"}}),t.loaded?i("line-chart",{attrs:{"chart-data":t.datacollection}}):t._e()],1)],1),i("v-col",[i("v-card",[i("h3",[t._v("Bar Chart")]),i("bar-chart")],1)],1),i("v-col",[i("v-card",[i("h3",[t._v("Bubble Chart")]),i("bubble-chart")],1)],1),i("v-col",[i("v-card",[i("h3",[t._v("Reactive Chart")]),i("reactive",{attrs:{"chart-data":t.datacollection}}),i("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.fillData()}}},[t._v("Randomize")])],1)],1)],1)},l=[],u=(i("d81d"),i("96cf"),i("1da1")),h=i("759f"),c=i("d4dd"),d=i("1fca"),p={extends:d["b"],data:function(){return{datacollection:{labels:["Data"],datasets:[{label:"Data One",backgroundColor:"#f87979",pointBackgroundColor:"white",borderWidth:1,pointBorderColor:"#249EBF",data:[{x:100,y:0,r:10},{x:60,y:30,r:20},{x:40,y:60,r:25},{x:80,y:80,r:50},{x:20,y:30,r:25},{x:0,y:100,r:5}]}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{gridLines:{display:!1}}]},legend:{display:!0},responsive:!0,maintainAspectRatio:!1}}},mounted:function(){this.renderChart(this.datacollection,this.options)}},f=p,g=i("2877"),v=Object(g["a"])(f,s,n,!1,null,null,null),b=v.exports,m=d["g"].reactiveProp,y={extends:d["d"],mixins:[m],data:function(){return{options:{scales:{yAxes:[{ticks:{beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{gridLines:{display:!1}}]},legend:{display:!0},responsive:!0,maintainAspectRatio:!1}}},mounted:function(){this.renderChart(this.chartData,this.options)}},C=y,S=Object(g["a"])(C,a,r,!1,null,null,null),D=S.exports,k={name:"VueChartJS",components:{LineChart:h["a"],BarChart:c["a"],BubbleChart:b,Reactive:D},data:function(){return{datacollection:null,loaded:!1}},created:function(){this.fillData(),this.corona()},methods:{fillData:function(){this.datacollection={labels:["January","February","March","April","May","June","July","August","September","October","November","December"],datasets:[{label:"Data One",backgroundColor:"#03fcec",data:[this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt()]}]}},getRandomInt:function(){return Math.floor(46*Math.random())+5},corona:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,axios.get("https://api.covid19api.com/total/country/south-korea");case 3:i=e.sent,s=i.data,console.log(s),t.datacollection={labels:s.map((function(t){return t.Date.substring(5,10)})),datasets:[{label:"Confirmed",borderColor:"#03fcec",backgroundColor:"rgba(3, 252, 236, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:s.map((function(t){return t.Confirmed}))},{label:"Recovered",borderColor:"#0ecf4b",backgroundColor:"rgba(14, 207, 75, 0.2)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:s.map((function(t){return t.Recovered}))},{label:"Deaths",borderColor:"#c70808",backgroundColor:"rgba(199, 8, 8, 0.7)",pointBorderColor:"rgba(255, 255, 255, 0)",borderWidth:2,data:s.map((function(t){return t.Deaths}))}]},t.loaded=!0,e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()}}},V=k,w=i("6544"),M=i.n(w),x=i("8336"),B=i("b0af"),I=i("62ad"),$=i("a523"),A=(i("0481"),i("4069"),i("5530")),O=(i("ec29"),i("9d01"),i("4de4"),i("45fc"),i("d3b7"),i("25f0"),i("99af"),i("a9e3"),i("ac1f"),i("1276"),i("d191"),i("9d26")),R=(i("1b2c"),i("a9ad")),j=i("7560"),_=i("58df"),E=i("80d2"),F=Object(_["a"])(j["a"]).extend({name:"v-label",functional:!0,props:{absolute:Boolean,color:{type:String,default:"primary"},disabled:Boolean,focused:Boolean,for:String,left:{type:[Number,String],default:0},right:{type:[Number,String],default:"auto"},value:Boolean},render:function(t,e){var i=e.children,s=e.listeners,n=e.props,a={staticClass:"v-label",class:Object(A["a"])({"v-label--active":n.value,"v-label--is-disabled":n.disabled},Object(j["b"])(e)),attrs:{for:n.for,"aria-hidden":!n.for},on:s,style:{left:Object(E["f"])(n.left),right:Object(E["f"])(n.right),position:n.absolute?"absolute":"relative"},ref:"label"};return t("label",R["a"].options.methods.setTextColor(n.focused&&n.color,a),i)}}),L=F,T=(i("8ff2"),Object(_["a"])(R["a"],j["a"]).extend({name:"v-messages",props:{value:{type:Array,default:function(){return[]}}},methods:{genChildren:function(){return this.$createElement("transition-group",{staticClass:"v-messages__wrapper",attrs:{name:"message-transition",tag:"div"}},this.value.map(this.genMessage))},genMessage:function(t,e){return this.$createElement("div",{staticClass:"v-messages__message",key:e},Object(E["l"])(this,"default",{message:t,key:e})||[t])}},render:function(t){return t("div",this.setTextColor(this.color,{staticClass:"v-messages",class:this.themeClasses}),[this.genChildren()])}})),z=T,P=i("7e2b"),J=(i("fb6a"),i("53ca")),N=i("3206"),H=i("d9bd"),W=Object(_["a"])(R["a"],Object(N["a"])("form"),j["a"]),K=W.extend({name:"validatable",props:{disabled:Boolean,error:Boolean,errorCount:{type:[Number,String],default:1},errorMessages:{type:[String,Array],default:function(){return[]}},messages:{type:[String,Array],default:function(){return[]}},readonly:Boolean,rules:{type:Array,default:function(){return[]}},success:Boolean,successMessages:{type:[String,Array],default:function(){return[]}},validateOnBlur:Boolean,value:{required:!1}},data:function(){return{errorBucket:[],hasColor:!1,hasFocused:!1,hasInput:!1,isFocused:!1,isResetting:!1,lazyValue:this.value,valid:!1}},computed:{computedColor:function(){if(!this.isDisabled)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},hasError:function(){return this.internalErrorMessages.length>0||this.errorBucket.length>0||this.error},hasSuccess:function(){return this.internalSuccessMessages.length>0||this.success},externalError:function(){return this.internalErrorMessages.length>0||this.error},hasMessages:function(){return this.validationTarget.length>0},hasState:function(){return!this.isDisabled&&(this.hasSuccess||this.shouldValidate&&this.hasError)},internalErrorMessages:function(){return this.genInternalMessages(this.errorMessages)},internalMessages:function(){return this.genInternalMessages(this.messages)},internalSuccessMessages:function(){return this.genInternalMessages(this.successMessages)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit("input",t)}},isDisabled:function(){return this.disabled||!!this.form&&this.form.disabled},isInteractive:function(){return!this.isDisabled&&!this.isReadonly},isReadonly:function(){return this.readonly||!!this.form&&this.form.readonly},shouldValidate:function(){return!!this.externalError||!this.isResetting&&(this.validateOnBlur?this.hasFocused&&!this.isFocused:this.hasInput||this.hasFocused)},validations:function(){return this.validationTarget.slice(0,Number(this.errorCount))},validationState:function(){if(!this.isDisabled)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":this.hasColor?this.computedColor:void 0},validationTarget:function(){return this.internalErrorMessages.length>0?this.internalErrorMessages:this.successMessages&&this.successMessages.length>0?this.internalSuccessMessages:this.messages&&this.messages.length>0?this.internalMessages:this.shouldValidate?this.errorBucket:[]}},watch:{rules:{handler:function(t,e){Object(E["h"])(t,e)||this.validate()},deep:!0},internalValue:function(){this.hasInput=!0,this.validateOnBlur||this.$nextTick(this.validate)},isFocused:function(t){t||this.isDisabled||(this.hasFocused=!0,this.validateOnBlur&&this.$nextTick(this.validate))},isResetting:function(){var t=this;setTimeout((function(){t.hasInput=!1,t.hasFocused=!1,t.isResetting=!1,t.validate()}),0)},hasError:function(t){this.shouldValidate&&this.$emit("update:error",t)},value:function(t){this.lazyValue=t}},beforeMount:function(){this.validate()},created:function(){this.form&&this.form.register(this)},beforeDestroy:function(){this.form&&this.form.unregister(this)},methods:{genInternalMessages:function(t){return t?Array.isArray(t)?t:[t]:[]},reset:function(){this.isResetting=!0,this.internalValue=Array.isArray(this.internalValue)?[]:void 0},resetValidation:function(){this.isResetting=!0},validate:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0,i=[];e=e||this.internalValue,t&&(this.hasInput=this.hasFocused=!0);for(var s=0;s<this.rules.length;s++){var n=this.rules[s],a="function"===typeof n?n(e):n;!1===a||"string"===typeof a?i.push(a||""):"boolean"!==typeof a&&Object(H["b"])("Rules should return a string or boolean, received '".concat(Object(J["a"])(a),"' instead"),this)}return this.errorBucket=i,this.valid=0===i.length,this.valid}}}),U=i("d9f7"),Z=Object(_["a"])(P["a"],K),q=Z.extend().extend({name:"v-input",inheritAttrs:!1,props:{appendIcon:String,backgroundColor:{type:String,default:""},dense:Boolean,height:[Number,String],hideDetails:[Boolean,String],hint:String,id:String,label:String,loading:Boolean,persistentHint:Boolean,prependIcon:String,value:null},data:function(){return{lazyValue:this.value,hasMouseDown:!1}},computed:{classes:function(){return Object(A["a"])({"v-input--has-state":this.hasState,"v-input--hide-details":!this.showDetails,"v-input--is-label-active":this.isLabelActive,"v-input--is-dirty":this.isDirty,"v-input--is-disabled":this.isDisabled,"v-input--is-focused":this.isFocused,"v-input--is-loading":!1!==this.loading&&null!=this.loading,"v-input--is-readonly":this.isReadonly,"v-input--dense":this.dense},this.themeClasses)},computedId:function(){return this.id||"input-".concat(this._uid)},hasDetails:function(){return this.messagesToDisplay.length>0},hasHint:function(){return!this.hasMessages&&!!this.hint&&(this.persistentHint||this.isFocused)},hasLabel:function(){return!(!this.$slots.label&&!this.label)},internalValue:{get:function(){return this.lazyValue},set:function(t){this.lazyValue=t,this.$emit(this.$_modelEvent,t)}},isDirty:function(){return!!this.lazyValue},isLabelActive:function(){return this.isDirty},messagesToDisplay:function(){var t=this;return this.hasHint?[this.hint]:this.hasMessages?this.validations.map((function(e){if("string"===typeof e)return e;var i=e(t.internalValue);return"string"===typeof i?i:""})).filter((function(t){return""!==t})):[]},showDetails:function(){return!1===this.hideDetails||"auto"===this.hideDetails&&this.hasDetails}},watch:{value:function(t){this.lazyValue=t}},beforeCreate:function(){this.$_modelEvent=this.$options.model&&this.$options.model.event||"input"},methods:{genContent:function(){return[this.genPrependSlot(),this.genControl(),this.genAppendSlot()]},genControl:function(){return this.$createElement("div",{staticClass:"v-input__control"},[this.genInputSlot(),this.genMessages()])},genDefaultSlot:function(){return[this.genLabel(),this.$slots.default]},genIcon:function(t,e){var i=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=this["".concat(t,"Icon")],a="click:".concat(Object(E["n"])(t)),r=!(!this.listeners$[a]&&!e),o=Object(U["a"])({attrs:{"aria-label":r?Object(E["n"])(t).split("-")[0]+" icon":void 0,color:this.validationState,dark:this.dark,disabled:this.isDisabled,light:this.light},on:r?{click:function(t){t.preventDefault(),t.stopPropagation(),i.$emit(a,t),e&&e(t)},mouseup:function(t){t.preventDefault(),t.stopPropagation()}}:void 0},s);return this.$createElement("div",{staticClass:"v-input__icon",class:t?"v-input__icon--".concat(Object(E["n"])(t)):void 0},[this.$createElement(O["a"],o,n)])},genInputSlot:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor,{staticClass:"v-input__slot",style:{height:Object(E["f"])(this.height)},on:{click:this.onClick,mousedown:this.onMouseDown,mouseup:this.onMouseUp},ref:"input-slot"}),[this.genDefaultSlot()])},genLabel:function(){return this.hasLabel?this.$createElement(L,{props:{color:this.validationState,dark:this.dark,disabled:this.isDisabled,focused:this.hasState,for:this.computedId,light:this.light}},this.$slots.label||this.label):null},genMessages:function(){var t=this;return this.showDetails?this.$createElement(z,{props:{color:this.hasHint?"":this.validationState,dark:this.dark,light:this.light,value:this.messagesToDisplay},attrs:{role:this.hasMessages?"alert":null},scopedSlots:{default:function(e){return Object(E["l"])(t,"message",e)}}}):null},genSlot:function(t,e,i){if(!i.length)return null;var s="".concat(t,"-").concat(e);return this.$createElement("div",{staticClass:"v-input__".concat(s),ref:s},i)},genPrependSlot:function(){var t=[];return this.$slots.prepend?t.push(this.$slots.prepend):this.prependIcon&&t.push(this.genIcon("prepend")),this.genSlot("prepend","outer",t)},genAppendSlot:function(){var t=[];return this.$slots.append?t.push(this.$slots.append):this.appendIcon&&t.push(this.genIcon("append")),this.genSlot("append","outer",t)},onClick:function(t){this.$emit("click",t)},onMouseDown:function(t){this.hasMouseDown=!0,this.$emit("mousedown",t)},onMouseUp:function(t){this.hasMouseDown=!1,this.$emit("mouseup",t)}},render:function(t){return t("div",this.setTextColor(this.validationState,{staticClass:"v-input",class:this.classes}),this.genContent())}}),G=q,Q=i("5607"),X=i("2b0e"),Y=X["a"].extend({name:"rippleable",directives:{ripple:Q["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),tt=X["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:E["h"]}}});function et(t){t.preventDefault()}var it=Object(_["a"])(G,Y,tt).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=G.options.methods.genLabel.call(this);return t?(t.data.on={click:et},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:et},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var s=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===s&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),st=i("c3f0"),nt=i("0789"),at=i("490a"),rt=it.extend({name:"v-switch",directives:{Touch:st["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(A["a"])(Object(A["a"])({},G.options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(A["a"])(Object(A["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(A["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(A["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(nt["b"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(at["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===E["o"].left&&this.isActive||t.keyCode===E["o"].right&&!this.isActive)&&this.onChange()}}}),ot=Object(g["a"])(V,o,l,!1,null,null,null);e["default"]=ot.exports;M()(ot,{VBtn:x["a"],VCard:B["a"],VCol:I["a"],VContainer:$["a"],VSwitch:rt})},"8ff2":function(t,e,i){},"9d01":function(t,e,i){},d191:function(t,e,i){},ec29:function(t,e,i){}}]);
//# sourceMappingURL=chunk-2b5ae224.f9fca93b.js.map