/**
 * responsive-tabs
 *
 * jQuery plugin that provides responsive tab functionality. The tabs transform to an accordion when it reaches a CSS breakpoint.
 *
 * @author Jelle Kralt
 * @version v1.6.3
 * @license MIT
 */
!function(t,s,a){function e(s,a){this.element=s,this.$element=t(s),this.tabs=[],this.state="",this.rotateInterval=0,this.$queue=t({}),this.options=t.extend({},o,a),this.init()}var o={active:null,event:"click",disabled:[],collapsible:"accordion",startCollapsed:!1,rotate:!1,setHash:!1,animation:"default",animationQueue:!1,duration:500,fluidHeight:!0,scrollToAccordion:!1,scrollToAccordionOnLoad:!0,scrollToAccordionOffset:0,accordionTabElement:"<div></div>",navigationContainer:"",click:function(){},activate:function(){},deactivate:function(){},load:function(){},activateState:function(){},classes:{stateDefault:"r-tabs-state-default",stateActive:"r-tabs-state-active",stateDisabled:"r-tabs-state-disabled",stateExcluded:"r-tabs-state-excluded",container:"r-tabs",ul:"r-tabs-nav",tab:"r-tabs-tab",anchor:"r-tabs-anchor",panel:"r-tabs-panel",accordionTitle:"r-tabs-accordion-title"}};e.prototype.init=function(){var a=this;this.tabs=this._loadElements(),this._loadClasses(),this._loadEvents(),t(s).on("resize",function(t){a._setState(t),a.options.fluidHeight!==!0&&a._equaliseHeights()}),t(s).on("hashchange",function(t){var e=a._getTabRefBySelector(s.location.hash),o=a._getTab(e);e>=0&&!o._ignoreHashChange&&!o.disabled&&a._openTab(t,a._getTab(e),!0)}),this.options.rotate!==!1&&this.startRotation(),this.options.fluidHeight!==!0&&a._equaliseHeights(),this.$element.bind("tabs-click",function(t,s){a.options.click.call(this,t,s)}),this.$element.bind("tabs-activate",function(t,s){a.options.activate.call(this,t,s)}),this.$element.bind("tabs-deactivate",function(t,s){a.options.deactivate.call(this,t,s)}),this.$element.bind("tabs-activate-state",function(t,s){a.options.activateState.call(this,t,s)}),this.$element.bind("tabs-load",function(t){var s;a._setState(t),a.options.startCollapsed===!0||"accordion"===a.options.startCollapsed&&"accordion"===a.state||(s=a._getStartTab(),a._openTab(t,s),a.options.load.call(this,t,s))}),this.$element.trigger("tabs-load")},e.prototype._loadElements=function(){var s=this,a=""===s.options.navigationContainer?this.$element.children("ul:first"):this.$element.find(s.options.navigationContainer).children("ul:first"),e=[],o=0;return this.$element.addClass(s.options.classes.container),a.addClass(s.options.classes.ul),t("li",a).each(function(){var a,i,n,l,r,c=t(this),h=c.hasClass(s.options.classes.stateExcluded);if(!h){a=t("a",c),r=a.attr("href"),i=t(r),n=t(s.options.accordionTabElement).insertBefore(i),l=t("<a></a>").attr("href",r).html(a.html()).appendTo(n);var p={_ignoreHashChange:!1,id:o,disabled:-1!==t.inArray(o,s.options.disabled),tab:t(this),anchor:t("a",c),panel:i,selector:r,accordionTab:n,accordionAnchor:l,active:!1};o++,e.push(p)}}),e},e.prototype._loadClasses=function(){for(var t=0;t<this.tabs.length;t++)this.tabs[t].tab.addClass(this.options.classes.stateDefault).addClass(this.options.classes.tab),this.tabs[t].anchor.addClass(this.options.classes.anchor),this.tabs[t].panel.addClass(this.options.classes.stateDefault).addClass(this.options.classes.panel),this.tabs[t].accordionTab.addClass(this.options.classes.accordionTitle),this.tabs[t].accordionAnchor.addClass(this.options.classes.anchor),this.tabs[t].disabled&&(this.tabs[t].tab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled),this.tabs[t].accordionTab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled))},e.prototype._loadEvents=function(){for(var t=this,a=function(a){var e=t._getCurrentTab(),o=a.data.tab;a.preventDefault(),o.tab.trigger("tabs-click",o),o.disabled||(t.options.setHash&&(history.pushState?(s.location.origin||(s.location.origin=s.location.protocol+"//"+s.location.hostname+(s.location.port?":"+s.location.port:"")),history.pushState(null,null,s.location.origin+s.location.pathname+s.location.search+o.selector)):s.location.hash=o.selector),a.data.tab._ignoreHashChange=!0,(e!==o||t._isCollapisble())&&(t._closeTab(a,e),e===o&&t._isCollapisble()||t._openTab(a,o,!1,!0)))},e=0;e<this.tabs.length;e++)this.tabs[e].anchor.on(t.options.event,{tab:t.tabs[e]},a),this.tabs[e].accordionAnchor.on(t.options.event,{tab:t.tabs[e]},a)},e.prototype._getStartTab=function(){var t,a=this._getTabRefBySelector(s.location.hash);return t=a>=0&&!this._getTab(a).disabled?this._getTab(a):this.options.active>0&&!this._getTab(this.options.active).disabled?this._getTab(this.options.active):this._getTab(0)},e.prototype._setState=function(s){var e,o=t("ul:first",this.$element),i=this.state,n="string"==typeof this.options.startCollapsed;o.is(":visible")?this.state="tabs":this.state="accordion",this.state!==i&&(this.$element.trigger("tabs-activate-state",{oldState:i,newState:this.state}),i&&n&&this.options.startCollapsed!==this.state&&this._getCurrentTab()===a&&(e=this._getStartTab(s),this._openTab(s,e)))},e.prototype._openTab=function(s,a,e,o){var i,n=this;e&&this._closeTab(s,this._getCurrentTab()),o&&this.rotateInterval>0&&this.stopRotation(),a.active=!0,a.tab.removeClass(n.options.classes.stateDefault).addClass(n.options.classes.stateActive),a.accordionTab.removeClass(n.options.classes.stateDefault).addClass(n.options.classes.stateActive),n._doTransition(a.panel,n.options.animation,"open",function(){var e="tabs-load"!==s.type||n.options.scrollToAccordionOnLoad;a.panel.removeClass(n.options.classes.stateDefault).addClass(n.options.classes.stateActive),"accordion"!==n.getState()||!n.options.scrollToAccordion||n._isInView(a.accordionTab)&&"default"===n.options.animation||!e||(i=a.accordionTab.offset().top-n.options.scrollToAccordionOffset,"default"!==n.options.animation&&n.options.duration>0?t("html, body").animate({scrollTop:i},n.options.duration):t("html, body").scrollTop(i))}),this.$element.trigger("tabs-activate",a)},e.prototype._closeTab=function(t,s){var e,o=this,i="string"==typeof o.options.animationQueue;s!==a&&(e=i&&o.getState()===o.options.animationQueue?!0:i?!1:o.options.animationQueue,s.active=!1,s.tab.removeClass(o.options.classes.stateActive).addClass(o.options.classes.stateDefault),o._doTransition(s.panel,o.options.animation,"close",function(){s.accordionTab.removeClass(o.options.classes.stateActive).addClass(o.options.classes.stateDefault),s.panel.removeClass(o.options.classes.stateActive).addClass(o.options.classes.stateDefault)},!e),this.$element.trigger("tabs-deactivate",s))},e.prototype._doTransition=function(t,s,a,e,o){var i,n=this;switch(s){case"slide":i="open"===a?"slideDown":"slideUp";break;case"fade":i="open"===a?"fadeIn":"fadeOut";break;default:i="open"===a?"show":"hide",n.options.duration=0}this.$queue.queue("responsive-tabs",function(o){t[i]({duration:n.options.duration,complete:function(){e.call(t,s,a),o()}})}),("open"===a||o)&&this.$queue.dequeue("responsive-tabs")},e.prototype._isCollapisble=function(){return"boolean"==typeof this.options.collapsible&&this.options.collapsible||"string"==typeof this.options.collapsible&&this.options.collapsible===this.getState()},e.prototype._getTab=function(t){return this.tabs[t]},e.prototype._getTabRefBySelector=function(t){for(var s=0;s<this.tabs.length;s++)if(this.tabs[s].selector===t)return s;return-1},e.prototype._getCurrentTab=function(){return this._getTab(this._getCurrentTabRef())},e.prototype._getNextTabRef=function(t){var s=t||this._getCurrentTabRef(),a=s===this.tabs.length-1?0:s+1;return this._getTab(a).disabled?this._getNextTabRef(a):a},e.prototype._getPreviousTabRef=function(){return 0===this._getCurrentTabRef()?this.tabs.length-1:this._getCurrentTabRef()-1},e.prototype._getCurrentTabRef=function(){for(var t=0;t<this.tabs.length;t++)if(this.tabs[t].active)return t;return-1},e.prototype._equaliseHeights=function(){var s=0;t.each(t.map(this.tabs,function(t){return s=Math.max(s,t.panel.css("minHeight","").height()),t.panel}),function(){this.css("minHeight",s)})},e.prototype._isInView=function(a){var e=t(s).scrollTop(),o=e+t(s).height(),i=a.offset().top,n=i+a.height();return o>=n&&i>=e},e.prototype.activate=function(t,s){var a=jQuery.Event("tabs-activate"),e=this._getTab(t);e.disabled||this._openTab(a,e,!0,s||!0)},e.prototype.deactivate=function(t){var s=jQuery.Event("tabs-dectivate"),a=this._getTab(t);a.disabled||this._closeTab(s,a)},e.prototype.enable=function(t){var s=this._getTab(t);s&&(s.disabled=!1,s.tab.addClass(this.options.classes.stateDefault).removeClass(this.options.classes.stateDisabled),s.accordionTab.addClass(this.options.classes.stateDefault).removeClass(this.options.classes.stateDisabled))},e.prototype.disable=function(t){var s=this._getTab(t);s&&(s.disabled=!0,s.tab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled),s.accordionTab.removeClass(this.options.classes.stateDefault).addClass(this.options.classes.stateDisabled))},e.prototype.getState=function(){return this.state},e.prototype.startRotation=function(s){var a=this;if(!(this.tabs.length>this.options.disabled.length))throw new Error("Rotation is not possible if all tabs are disabled");this.rotateInterval=setInterval(function(){var t=jQuery.Event("rotate");a._openTab(t,a._getTab(a._getNextTabRef()),!0)},s||(t.isNumeric(a.options.rotate)?a.options.rotate:4e3))},e.prototype.stopRotation=function(){s.clearInterval(this.rotateInterval),this.rotateInterval=0},e.prototype.option=function(t,s){return s&&(this.options[t]=s),this.options[t]},t.fn.responsiveTabs=function(s){var o,i=arguments;return s===a||"object"==typeof s?this.each(function(){t.data(this,"responsivetabs")||t.data(this,"responsivetabs",new e(this,s))}):"string"==typeof s&&"_"!==s[0]&&"init"!==s?(o=t.data(this[0],"responsivetabs"),"destroy"===s&&t.data(this,"responsivetabs",null),o instanceof e&&"function"==typeof o[s]?o[s].apply(o,Array.prototype.slice.call(i,1)):this):void 0}}(jQuery,window);
