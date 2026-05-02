import{a as Ie,b as Fe,c as Ae,d as Re}from"./chunk-RFWGIXDU.js";import{a as Ke}from"./chunk-HO44YLPJ.js";import{c as qe,e as Qe,f as Ue}from"./chunk-MTHE3MAD.js";import{a as Ge,b as Ze}from"./chunk-W2KTF6SD.js";import{d as He,e as k,f as $e,h as ae}from"./chunk-HRDVFX2Z.js";import{D as y,L as We,a as Be,b as je,g as N,i as ie,k as Le,s as ze,t as Ve,w as Ne}from"./chunk-6RIIADY6.js";import{a as Te}from"./chunk-GHGC257K.js";import{d as Se,f as Ee,h as Oe,k as Pe}from"./chunk-PAMMJ6LM.js";import{$ as Z,$a as xe,$b as ke,A as he,Aa as ye,B as M,D as fe,F as ge,Fb as te,G as _e,H as G,Jb as P,Lb as g,Mb as v,Nb as p,Ob as ne,Pb as re,Q as D,Qb as b,R as ve,Rb as w,S as u,Ta as m,Wb as L,Xb as _,Ya as J,Z as be,Zb as s,_b as z,ab as j,ba as o,f as me,fc as C,ga as H,gb as h,h as f,ha as $,hb as Ce,hc as Me,ic as De,ka as I,la as we,lb as S,ma as F,mb as X,o as ue,oa as A,pa as R,s as U,sa as K,sb as Y,tb as E,ub as O,vb as x,wb as a,xa as T,xb as i,xc as V,yb as ee,z as pe,za as B}from"./chunk-QW6EIQXY.js";var Q=["*"],nt=["content"],rt=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],it=["mat-drawer","mat-drawer-content","*"];function at(r,c){if(r&1){let e=te();a(0,"div",1),P("click",function(){H(e);let n=g();return $(n._onBackdropClicked())}),i()}if(r&2){let e=g();_("mat-drawer-shown",e._isShowingBackdrop())}}function ot(r,c){r&1&&(a(0,"mat-drawer-content"),p(1,2),i())}var st=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],dt=["mat-sidenav","mat-sidenav-content","*"];function ct(r,c){if(r&1){let e=te();a(0,"div",1),P("click",function(){H(e);let n=g();return $(n._onBackdropClicked())}),i()}if(r&2){let e=g();_("mat-drawer-shown",e._isShowingBackdrop())}}function lt(r,c){r&1&&(a(0,"mat-sidenav-content"),p(1,2),i())}var mt=`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`;var ut=new Z("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),de=new Z("MAT_DRAWER_CONTAINER"),W=(()=>{class r extends k{_platform=o(N);_changeDetectorRef=o(V);_container=o(se);constructor(){let e=o(B),t=o(He),n=o(R);super(e,t,n)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=h({type:r,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,n){t&2&&(L("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),_("mat-drawer-content-hidden",n._shouldBeHidden()))},features:[C([{provide:k,useExisting:r}]),S],ngContentSelectors:Q,decls:1,vars:0,template:function(t,n){t&1&&(v(),p(0))},encapsulation:2,changeDetection:0})}return r})(),oe=(()=>{class r{_elementRef=o(B);_focusTrapFactory=o(Ve);_focusMonitor=o(Le);_platform=o(N);_ngZone=o(R);_renderer=o(xe);_interactivityChecker=o(ze);_doc=o(we);_container=o(de,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=y(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=y(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(y(e))}_opened=K(!1);_openedVia=null;_animationStarted=new f;_animationEnd=new f;openedChange=new A(!0);_openedStream=this.openedChange.pipe(M(e=>e),U(()=>{}));openedStart=this._animationStarted.pipe(M(()=>this.opened),G(void 0));_closedStream=this.openedChange.pipe(M(e=>!e),U(()=>{}));closedStart=this._animationStarted.pipe(M(()=>!this.opened),G(void 0));_destroyed=new f;onPositionChanged=new A;_content;_modeChanged=new f;_injector=o(I);_changeDetectorRef=o(V);constructor(){this.openedChange.pipe(u(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return[e.listen(t,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!Ne(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()})}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{d(),l(),e.removeAttribute("tabindex")},d=this._renderer.listen(e,"blur",n),l=this._renderer.listen(e,"mousedown",n)})),e.focus(t)}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&this._forceFocus(n,t)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":J(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let n=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),n}_setOpen(e,t,n){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(d=>{this.openedChange.pipe(_e(1)).subscribe(l=>d(l?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,n=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,t)),n.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(t){return new(t||r)};static \u0275cmp=h({type:r,selectors:[["mat-drawer"]],viewQuery:function(t,n){if(t&1&&re(nt,5),t&2){let d;b(d=w())&&(n._content=d.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,n){t&2&&(Y("align",null)("tabIndex",n.mode!=="side"?"-1":null),L("visibility",!n._container&&!n.opened?"hidden":null),_("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Q,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(v(),a(0,"div",1,0),p(2),i())},dependencies:[k],encapsulation:2,changeDetection:0})}return r})(),se=(()=>{class r{_dir=o(Be,{optional:!0});_element=o(B);_ngZone=o(R);_changeDetectorRef=o(V);_animationDisabled=We();_transitionsEnabled=!1;_allDrawers;_drawers=new ye;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=y(e)}_autosize=o(ut);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:y(e)}_backdropOverride=null;backdropClick=new A;_start=null;_end=null;_left=null;_right=null;_destroyed=new f;_doCheckSubject=new f;_contentMargins={left:null,right:null};_contentMarginChanges=new f;get scrollable(){return this._userContent||this._content}_injector=o(I);constructor(){let e=o(N),t=o($e);this._dir?.change.pipe(u(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),t.change().pipe(u(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(D(this._allDrawers),u(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(D(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(ge(10),u(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();e+=n,t-=n}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();t+=n,e-=n}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(u(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(u(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(u(this._drawers.changes)).subscribe(()=>{J({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(u(he(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,n="mat-drawer-container-has-open";e?t.add(n):t.remove(n)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||r)};static \u0275cmp=h({type:r,selectors:[["mat-drawer-container"]],contentQueries:function(t,n,d){if(t&1&&ne(d,W,5)(d,oe,5),t&2){let l;b(l=w())&&(n._content=l.first),b(l=w())&&(n._allDrawers=l)}},viewQuery:function(t,n){if(t&1&&re(W,5),t&2){let d;b(d=w())&&(n._userContent=d.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,n){t&2&&_("mat-drawer-container-explicit-backdrop",n._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[C([{provide:de,useExisting:r}])],ngContentSelectors:it,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(v(rt),E(0,at,1,2,"div",0),p(1),p(2,1),E(3,ot,2,0,"mat-drawer-content")),t&2&&(O(n.hasBackdrop?0:-1),m(3),O(n._content?-1:3))},dependencies:[W],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2,changeDetection:0})}return r})(),q=(()=>{class r extends W{static \u0275fac=(()=>{let e;return function(n){return(e||(e=T(r)))(n||r)}})();static \u0275cmp=h({type:r,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[C([{provide:k,useExisting:r}]),S],ngContentSelectors:Q,decls:1,vars:0,template:function(t,n){t&1&&(v(),p(0))},encapsulation:2,changeDetection:0})}return r})(),ce=(()=>{class r extends oe{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=y(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=ie(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=ie(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(n){return(e||(e=T(r)))(n||r)}})();static \u0275cmp=h({type:r,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(t,n){t&2&&(Y("tabIndex",n.mode!=="side"?"-1":null)("align",null),L("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),_("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[C([{provide:oe,useExisting:r}]),S],ngContentSelectors:Q,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(v(),a(0,"div",1,0),p(2),i())},dependencies:[k],encapsulation:2,changeDetection:0})}return r})(),Je=(()=>{class r extends se{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(n){return(e||(e=T(r)))(n||r)}})();static \u0275cmp=h({type:r,selectors:[["mat-sidenav-container"]],contentQueries:function(t,n,d){if(t&1&&ne(d,q,5)(d,ce,5),t&2){let l;b(l=w())&&(n._content=l.first),b(l=w())&&(n._allDrawers=l)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(t,n){t&2&&_("mat-drawer-container-explicit-backdrop",n._backdropOverride)},exportAs:["matSidenavContainer"],features:[C([{provide:de,useExisting:r},{provide:se,useExisting:r}]),S],ngContentSelectors:dt,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(v(st),E(0,ct,1,2,"div",0),p(1),p(2,1),E(3,lt,2,0,"mat-sidenav-content")),t&2&&(O(n.hasBackdrop?0:-1),m(3),O(n._content?-1:3))},dependencies:[q],styles:[mt],encapsulation:2,changeDetection:0})}return r})(),Xe=(()=>{class r{static \u0275fac=function(t){return new(t||r)};static \u0275mod=Ce({type:r});static \u0275inj=be({imports:[ae,je,ae]})}return r})();function le(r){r||(r=o(F));let c=new me(e=>{if(r.destroyed){e.next();return}return r.onDestroy(e.next.bind(e))});return e=>e.pipe(u(c))}function ht(r,c){if(r&1&&(a(0,"span",27),s(1),i()),r&2){let e=g(2);m(),z(e.unreadCount)}}function ft(r,c){if(r&1&&(a(0,"a",25)(1,"mat-icon"),s(2,"notifications"),i(),a(3,"span"),s(4,"Alerts"),i(),X(5,ht,2,1,"span",26),i()),r&2){let e=g();m(5),x("ngIf",e.unreadCount>0)}}function gt(r,c){r&1&&(a(0,"a",28)(1,"mat-icon"),s(2,"bar_chart"),i(),a(3,"span"),s(4,"Reports"),i()())}function _t(r,c){r&1&&(a(0,"a",29)(1,"mat-icon"),s(2,"people"),i(),a(3,"span"),s(4,"Users"),i()())}var Ye=class r{constructor(c,e,t){this.authService=c;this.alertService=e;this.router=t}destroyRef=o(F);fullName="";role="";isAdmin=!1;canViewAlerts=!1;canViewReports=!1;unreadCount=0;ngOnInit(){this.fullName=this.authService.getFullName()||"",this.role=this.authService.getRole()||"",this.isAdmin=this.authService.canManageUsers(),this.canViewAlerts=this.authService.canAccessAlerts(),this.canViewReports=this.authService.canAccessReports(),this.canViewAlerts&&(this.alertService.unreadCount$.pipe(le(this.destroyRef)).subscribe({next:c=>this.unreadCount=c,error:()=>{}}),pe(15e3).pipe(D(0),ve(()=>this.alertService.refreshUnreadCount().pipe(fe(()=>ue([])))),le(this.destroyRef)).subscribe())}logout(){this.authService.logout().subscribe({next:()=>this.router.navigate(["/login"]),error:()=>{this.authService.clearStorage(),this.router.navigate(["/login"])}})}static \u0275fac=function(e){return new(e||r)(j(Te),j(Ke),j(Fe))};static \u0275cmp=h({type:r,selectors:[["app-layout"]],decls:70,vars:9,consts:[["sidenav",""],[1,"sidenav-container"],["mode","side","opened","",1,"sidenav"],[1,"brand"],[1,"status-badge",3,"ngClass"],[1,"nav-menu"],["mat-button","","routerLink","/dashboard","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/products","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/suppliers","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/warehouses","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/purchase-orders","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/movements","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/alerts","routerLinkActive","active-link","class","nav-item",4,"ngIf"],["mat-button","","routerLink","/reports","routerLinkActive","active-link","class","nav-item",4,"ngIf"],["mat-button","","routerLink","/users","routerLinkActive","active-link","class","nav-item",4,"ngIf"],[1,"signout"],["mat-button","",1,"signout-btn",3,"click"],[1,"main-wrapper"],[1,"top-header"],[1,"header-search"],["type","text","placeholder","Search everywhere..."],[1,"header-actions"],["mat-icon-button","",1,"icon-btn"],[1,"user-avatar"],[1,"main-content"],["mat-button","","routerLink","/alerts","routerLinkActive","active-link",1,"nav-item"],["class","nav-badge",4,"ngIf"],[1,"nav-badge"],["mat-button","","routerLink","/reports","routerLinkActive","active-link",1,"nav-item"],["mat-button","","routerLink","/users","routerLinkActive","active-link",1,"nav-item"]],template:function(e,t){e&1&&(a(0,"mat-sidenav-container",1)(1,"mat-sidenav",2,0)(3,"div",3)(4,"h1")(5,"mat-icon"),s(6,"inventory"),i(),s(7," StockPro"),i(),a(8,"p"),s(9),i(),a(10,"span",4),s(11),i()(),a(12,"nav",5)(13,"a",6)(14,"mat-icon"),s(15,"dashboard"),i(),a(16,"span"),s(17,"Dashboard"),i()(),a(18,"a",7)(19,"mat-icon"),s(20,"inventory_2"),i(),a(21,"span"),s(22,"Products"),i()(),a(23,"a",8)(24,"mat-icon"),s(25,"business"),i(),a(26,"span"),s(27,"Suppliers"),i()(),a(28,"a",9)(29,"mat-icon"),s(30,"warehouse"),i(),a(31,"span"),s(32,"Warehouses"),i()(),a(33,"a",10)(34,"mat-icon"),s(35,"receipt_long"),i(),a(36,"span"),s(37,"Purchase Orders"),i()(),a(38,"a",11)(39,"mat-icon"),s(40,"swap_horiz"),i(),a(41,"span"),s(42,"Movements"),i()(),X(43,ft,6,1,"a",12)(44,gt,5,0,"a",13)(45,_t,5,0,"a",14),i(),a(46,"div",15)(47,"button",16),P("click",function(){return t.logout()}),a(48,"mat-icon"),s(49,"logout"),i(),a(50,"span"),s(51,"Sign Out"),i()()()(),a(52,"mat-sidenav-content",17)(53,"div",18)(54,"div",19)(55,"mat-icon"),s(56,"search"),i(),ee(57,"input",20),i(),a(58,"div",21)(59,"button",22)(60,"mat-icon"),s(61,"settings"),i()(),a(62,"button",22)(63,"mat-icon"),s(64,"notifications"),i()(),a(65,"div",23),s(66),Me(67,"uppercase"),i()()(),a(68,"div",24),ee(69,"router-outlet"),i()()()),e&2&&(m(9),z(t.fullName),m(),x("ngClass",t.role.toLowerCase()),m(),z(t.role),m(32),x("ngIf",t.canViewAlerts),m(),x("ngIf",t.canViewReports),m(),x("ngIf",t.isAdmin),m(21),ke(" ",De(67,7,t.fullName.charAt(0))," "))},dependencies:[Pe,Se,Ee,Ie,Ae,Re,Xe,ce,Je,q,Ue,Qe,qe,Ze,Ge,Oe],styles:[".sidenav-container[_ngcontent-%COMP%]{height:100vh;background-color:var(--background)}.sidenav[_ngcontent-%COMP%]{width:260px;background:linear-gradient(180deg,var(--sidebar-dark) 0%,var(--sidebar-light) 100%);color:#fff;display:flex;flex-direction:column;border-right:none;box-shadow:4px 0 24px #00000014}.brand[_ngcontent-%COMP%]{padding:24px;border-bottom:1px solid rgba(255,255,255,.05)}.brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:24px;font-weight:700;margin:0 0 4px;color:#fff;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}.brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--primary)}.brand[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#fff9;margin:0 0 12px}.nav-menu[_ngcontent-%COMP%]{flex:1;padding:20px 12px;overflow-y:auto;display:flex;flex-direction:column;gap:4px}.nav-item[_ngcontent-%COMP%]{display:flex!important;align-items:center;gap:12px;width:100%;padding:12px 16px!important;color:#ffffffb3!important;border-radius:var(--radius-md)!important;text-align:left!important;justify-content:flex-start!important;font-size:14px!important;font-weight:500!important;transition:all .2s ease!important}.nav-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px;opacity:.7}.nav-item[_ngcontent-%COMP%]:hover{background:#ffffff0d!important;color:#fff!important}.nav-item[_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%]{opacity:1}.nav-item.active-link[_ngcontent-%COMP%]{background:#2563eb26!important;color:#fff!important;border-left:3px solid var(--primary);border-radius:0 var(--radius-md) var(--radius-md) 0!important}.nav-item.active-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{opacity:1;color:#60a5fa}.nav-badge[_ngcontent-%COMP%]{margin-left:auto;min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--danger);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;line-height:1;box-shadow:0 2px 8px #dc26264d}.signout[_ngcontent-%COMP%]{padding:16px 12px;border-top:1px solid rgba(255,255,255,.05)}.signout-btn[_ngcontent-%COMP%]{width:100%;color:#fff9!important;justify-content:flex-start!important;gap:12px;padding:12px 16px!important;border-radius:var(--radius-md)!important}.signout-btn[_ngcontent-%COMP%]:hover{color:#fff!important;background:#ffffff0d!important}.main-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}.top-header[_ngcontent-%COMP%]{height:72px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 var(--spacing-6);z-index:10}.top-header[_ngcontent-%COMP%]   .header-search[_ngcontent-%COMP%]{display:flex;align-items:center;background:var(--background);border:1px solid var(--border);border-radius:var(--radius-full);padding:6px 16px;width:320px}.top-header[_ngcontent-%COMP%]   .header-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--text-muted);font-size:20px;width:20px;height:20px}.top-header[_ngcontent-%COMP%]   .header-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:none;background:transparent;padding:8px;width:100%;outline:none;font-family:inherit;color:var(--text-primary);font-size:14px}.top-header[_ngcontent-%COMP%]   .header-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:var(--text-muted)}.top-header[_ngcontent-%COMP%]   .header-search[_ngcontent-%COMP%]:focus-within{border-color:var(--primary);box-shadow:0 0 0 2px #2563eb1a}.top-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-3)}.top-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]{color:var(--text-secondary)}.top-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]:hover{color:var(--text-primary);background:var(--background)}.top-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;border:1px solid rgba(37,99,235,.2);margin-left:var(--spacing-2)}.main-content[_ngcontent-%COMP%]{flex:1;background:var(--background);overflow-y:auto}"]})};export{Ye as LayoutComponent};
