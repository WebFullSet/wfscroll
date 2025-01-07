class WFScroll{constructor(t){this.config=t,this.createflag=!1,this.IDENDEFCl="evo-anim-",this.CLASSTR="transform",this.CLDONE="evo-done",this.CLASSSTYLE="anim-style",this.DATAANIMATE="data-animate",this.CLASSCHECK="evo-check",this.CLASSSTERT="evo-start",this.ATTRDELAY="data-delay",this.ATTRDURATION="data-duration",this.ATTRTIMINGFUNCTION="data-timing-function",this.animList={opacity:{action:"opacity",key:"",unit:"",before:"",after:""},translateY:{action:"transform",key:"translateY",unit:"",before:"(",after:")"},translateX:{action:"transform",key:"translateX",unit:"",before:"(",after:")"},translateZ:{action:"transform",key:"translateZ",unit:"",before:"(",after:")"},rotate:{action:"transform",key:"rotate",unit:"deg",before:"(",after:")"},rotateX:{action:"transform",key:"rotateX",unit:"deg",before:"(",after:")"},rotateY:{action:"transform",key:"rotateY",unit:"deg",before:"(",after:")"},rotateZ:{action:"transform",key:"rotateZ",unit:"deg",before:"(",after:")"},skewX:{action:"transform",key:"skewX",unit:"deg",before:"(",after:")"},skewY:{action:"transform",key:"skewX",unit:"deg",before:"(",after:")"},scale:{action:"transform",key:"scale",unit:"",before:"(",after:")"},perspective:{action:"transform",key:"perspective",unit:"px",before:"(",after:")"},transformOrigin:{action:"transform-origin",key:"",unit:"",before:"",after:""},rotate3d:{action:"transform",key:"rotate3d",unit:"",before:"(",after:")"},blur:{action:"filter",key:"blur",unit:"",before:"(",after:")"}},this.easing={linear:"cubic-bezier( 0, 0, 1, 1 )",ease:"cubic-bezier( .25, .1, .25, 1)",easeOut:"cubic-bezier( 0, 0, .58, 1 )",easeInOut:"cubic-bezier( .42, 0, .58, 1 )",easeIn:"cubic-bezier( .42, 0, 1, 1 )",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},this.numberOptions=["animateTime","stepDelay","visibilityScreen","mobileFinish"],this.options={container:".box-animate",elements:".auto-animate",classDelay:"delay",scrollTopDown:!0,animateTime:.2,timingFunction:"ease",stepDelay:.5,visibilityScreen:30,mobileFinish:0},"object"==typeof t&&(this.options={...this.options,...t}),this.init()}init(){this.#t()}#t(){this.flagValidation=!0,this.numberOptions.forEach((t=>{Number.isFinite(this.options[t])||Number.isNaN(this.options[t])||(alert(`WFScroll ${t} = ${this.options[t]} - should be a number`),this.flagValidation=!1)})),this.flagValidation&&(this.elements=document.querySelectorAll(this.options.elements),this.elementsLength=this.elements.length,this.elementsLength>0?(console.log("!!! START - WFScroll !!!"),this.windowHeight=window.innerHeight,this.#e(),this.mobile||this.#i(),window.addEventListener("resize",this.#s)):console.log("!!! WFScroll : no items found !!!"))}#i(){this.#n(),this.#a(),window.addEventListener("scroll",this.#a)}#e(){this.windowWidth=window.innerWidth,this.windowWidth<this.options.mobileFinish?this.mobile=!0:this.mobile=!1}#n(){let t,e;this.createflag=!0;let i="";this.htmlStyleStart=':root {--a-delay: 0s;--a-duration: 0s;--a-tf: "";--a-property: "";}.evo-start{--a-duration: '+this.options.animateTime+"s;--a-tf: "+this.easing[this.options.timingFunction]+';}[class*="'+this.IDENDEFCl+'"]{   transition-delay: var(--a-delay);   transition-duration: var(--a-duration);   transition-timing-function: var(--a-tf);   transition-property: var(--a-property);}',this.elements.forEach(((s,n)=>{if(s.classList.add(this.IDENDEFCl+n),t=s.getAttribute(this.DATAANIMATE),void 0!==t&&""!=t){let s=t.split(";").filter((t=>t)),a="",o="",r="",l=[],c=",",h=!1;s.forEach(((t,i)=>{t.length>0&&(l=t.split(":"),e=this.animList[l[0]],void 0!==e&&""!=e&&i+1==s.length&&(c=";"),this.CLASSTR==e.action?h?o+=" "+e.key+e.before+l[1]+e.unit+e.after:(a+=e.action+c,o+=this.CLASSTR+":"+e.key+e.before+l[1]+e.unit+e.after,h=!0):(a+=e.action+c,r+=e.action+":"+e.key+e.before+l[1]+e.unit+e.after+";"))})),i+="."+this.IDENDEFCl+n+"{--a-property: "+a+"}",i+=""==o?"."+this.IDENDEFCl+n+"."+this.CLDONE+"{"+r+"}":"."+this.IDENDEFCl+n+"."+this.CLDONE+"{"+o+";"+r+"}"}})),document.body.insertAdjacentHTML("beforeend",'<style class="'+this.CLASSSTYLE+'">'+this.htmlStyleStart+i+"</style>")}#a=()=>{let t,e;this.positionTop=window.scrollY;let i=this.windowHeight*this.options.visibilityScreen/100;this.elements.forEach(((s,n)=>{e=s.closest(this.options.container),null!=typeof e&&null!=e&&(t=e.getBoundingClientRect().y+this.positionTop,t+e.offsetHeight<this.positionTop&&(s.classList.contains(this.CLDONE)&&s.classList.remove(this.CLDONE),s.classList.contains(this.CLASSSTERT)||s.classList.add(this.CLASSSTERT)),t<=this.positionTop+this.windowHeight-i&&(s.classList.contains(this.CLASSCHECK)||s.classList.add(this.CLASSCHECK)),this.options.scrollTopDown&&t>=this.positionTop+this.windowHeight&&(s.classList.contains(this.CLDONE)||(s.classList.add(this.CLDONE),s.classList.remove(this.CLASSSTERT),s.classList.contains(this.options.classDelay)&&s.removeAttribute("style"))))})),this.newEl=document.querySelectorAll(`.${this.CLASSCHECK}:not(.${this.CLASSSTERT})`),this.newEl.length>0&&(this.elDelay=document.querySelectorAll(`.${this.options.classDelay,this.CLASSCHECK}:not(.${this.CLASSSTERT})`),this.stepDelay=this.options.stepDelay,this.elDelay.length>1&&this.elDelay.forEach(((t,e)=>{this.checkDelayAttr=t.getAttribute(this.ATTRDELAY),null!=typeof this.checkDelayAttr&&null!=this.checkDelayAttr&&(this.stepDelay=t.getAttribute(this.ATTRDELAY)),t.setAttribute("style","transition-delay:"+this.stepDelay*e+"s")})),this.newEl.forEach((t=>{t.classList.contains(this.CLASSCHECK)&&(t.classList.remove(this.CLASSCHECK,this.CLDONE),t.classList.add(this.CLASSSTERT))})))};#s=()=>{const t=this;let e;e&&clearTimeout(e),e=setTimeout((function(){t.windowHeight=window.innerHeight,t.#e(),t.mobile?t.createflag&&t.#o():t.createflag||t.#i()}),500)};#o(){if(this.elements.length>0){this.createflag=!1,this.elements.forEach(((t,e)=>{t.classList.remove(this.CLDONE,this.CLASSSTERT,this.CLASSCHECK,this.IDENDEFCl+e),t.classList.contains(this.options.classDelay)&&t.removeAttribute("style")})),window.removeEventListener("scroll",this.#a);const t=document.querySelector(`.${this.CLASSSTYLE}`).remove();t&&t.remove()}}destroy(){this.elements.length>0&&(this.#o(),window.removeEventListener("resize",this.#s))}}
//# sourceMappingURL=../maps/wfscroll.js.map