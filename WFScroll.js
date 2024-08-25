/**
 * --------------------------------------------------------------------------
 * WebFullSet WFScroll.js
 * ANIMATE BOX SCROLL PLUGIN
 * Licensed under MIT ??????????????????????????????????
 * --------------------------------------------------------------------------
 * OUR CONTACTS
 * Skype or telegram: @hjvf_07
 * Mail: onlycssclub@gmail.com
 * --------------------------------------------------------------------------
 * Vercion: 1.0.0
 * Date:    30.10.2023
 * --------------------------------------------------------------------------
 */

class WFScroll {
    constructor(config){
        this.config = config;
        this.createflag = false;
        this.IDENDEFCl           = 'evo-anim-';
        this.CLASSTR             = 'transform';
        this.CLDONE              = 'evo-done';
        this.CLASSSTYLE          = 'anim-style';
        this.DATAANIMATE         = 'data-animate';
        this.CLASSCHECK          = 'evo-check';
        this.CLASSSTERT          = 'evo-start';
        this.ATTRDELAY           = 'data-delay';
        this.ATTRDURATION        = 'data-duration';
        this.ATTRTIMINGFUNCTION  = 'data-timing-function';

        this.animList = {
            opacity:    {action: 'opacity',key: '',unit: '',before: '',after: ''},
            translateY: {action: 'transform',key: 'translateY',unit: '',before: '(',after: ')'},
            translateX: {action: 'transform',key: 'translateX',unit: '',before: '(',after: ')'},
            translateZ: {action: 'transform',key: 'translateZ',unit: '',before: '(',after: ')'},
            rotate:     {action: 'transform',key: 'rotate',unit: 'deg',before: '(',after: ')'},
            rotateX:    {action: 'transform',key: 'rotateX',unit: 'deg',before: '(',after: ')'},
            rotateY:    {action: 'transform',key: 'rotateY',unit: 'deg',before: '(',after: ')'},
            rotateZ:    {action: 'transform',key: 'rotateZ',unit: 'deg',before: '(',after: ')'},
            skewX:      {action: 'transform',key: 'skewX',unit: 'deg',before: '(',after: ')'},
            skewY:      {action: 'transform',key: 'skewX',unit: 'deg',before: '(',after: ')'},
            scale:      {action: 'transform',key: 'scale',unit: '',before: '(',after: ')'},
            perspective: {action: 'transform',key: 'perspective',unit: 'px',before: '(',after: ')'},
            transformOrigin: {action: 'transform-origin',key: '',unit: '',before: '',after: ''},
            rotate3d: {action: 'transform',key: 'rotate3d',unit: '',before: '(',after: ')'},
            blur: {action: 'filter',key: 'blur',unit: '',before: '(',after: ')'}
        };
        this.easing = {
            linear:'cubic-bezier( 0, 0, 1, 1 )',
            ease:'cubic-bezier( .25, .1, .25, 1)',
            easeOut:'cubic-bezier( 0, 0, .58, 1 )',
            easeInOut:'cubic-bezier( .42, 0, .58, 1 )',
            easeIn:'cubic-bezier( .42, 0, 1, 1 )',
            easeInSine:'cubic-bezier(0.47, 0, 0.745, 0.715)',
            easeOutSine:'cubic-bezier(0.39, 0.575, 0.565, 1)',
            easeInOutSine:'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
            easeInQuad:'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            easeOutQuad:'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            easeInOutQuad:'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
            easeInCubic:'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            easeOutCubic:'cubic-bezier(0.215, 0.61, 0.355, 1)',
            easeInOutCubic:'cubic-bezier(0.645, 0.045, 0.355, 1)',
            easeInQuart:'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
            easeInOutQuint:'cubic-bezier(0.86, 0, 0.07, 1)',
            easeInExpo:'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
            easeOutExpo:'cubic-bezier(0.19, 1, 0.22, 1)',
            easeInOutExpo:'cubic-bezier(1, 0, 0, 1)',
            easeInCirc:'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
            easeOutCirc:'cubic-bezier(0.075, 0.82, 0.165, 1)',
            easeInOutCirc:'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
            easeInBack:'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
            easeOutBack:'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            easeInOutBack:'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };
        this.numberOptions = ['animateTime', 'stepDelay', 'visibilityScreen', 'mobileFinish'];
        this.options = {
            container: '.box-animate',
            elements: '.auto-animate',
            classDelay: 'delay',
            scrollTopDown: true,
            animateTime: 0.2,
            timingFunction: 'ease',
            stepDelay: 0.5,
            visibilityScreen: 30,
            mobileFinish: 0
        }
        
        if(typeof config === 'object'){
            this.options = {...this.options, ...config}
        }

        this.init();
    }
    
    init(){
        this.#validateOption();
    }

    #validateOption(){
        this.flagValidation = true;

        this.numberOptions.forEach(numberOption => {
            if(!Number.isFinite(this.options[numberOption]) && !Number.isNaN(this.options[numberOption]) ) {
                alert(`WFScroll ${numberOption} = ${this.options[numberOption]} - should be a number`)
                this.flagValidation = false;
            }
        });

        if(this.flagValidation){
            this.elements = document.querySelectorAll(this.options.elements);
            this.elementsLength = this.elements.length;

            if(this.elementsLength > 0){
                console.log(`!!! START - WFScroll !!!`);
                this.windowHeight = window.innerHeight;

                this.#checkMobile();

                if(!this.mobile) this.#createAll();

                window.addEventListener('resize', this.#resWindowAnimate);
            }else {
                console.log(`!!! WFScroll : no items found !!!`);
            }
        }
    }

    #createAll(){
        this.#buildCss();
        this.#actionOnScroll();
        window.addEventListener('scroll', this.#actionOnScroll)
    }

    #checkMobile(){
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < this.options.mobileFinish) this.mobile = true;
        else this.mobile = false;
    }

    #buildCss(){
        this.createflag = true;
        let elementdate, arrDataCeck;
        let htmlStyle = '';
        this.htmlStyleStart =   ':root {'+
                                '--a-delay: 0s;'+
                                '--a-duration: 0s;'+
                                '--a-tf: "";'+
                                '--a-property: "";'+
                                '}'+
                                '.evo-start{'+
                                '--a-duration: '+ this.options.animateTime +'s;'+
                                '--a-tf: '+ this.easing[this.options.timingFunction] +';'+
                                '}'+
                                '[class*="'+ this.IDENDEFCl +'"]{'+
                                '   transition-delay: var(--a-delay);'+
                                '   transition-duration: var(--a-duration);'+
                                '   transition-timing-function: var(--a-tf);'+
                                '   transition-property: var(--a-property);'+
                                '}';

        this.elements.forEach((element, countN) => {
            element.classList.add(this.IDENDEFCl + countN);
            elementdate = element.getAttribute(this.DATAANIMATE);

            if(typeof elementdate != 'undefined' && elementdate != ''){
                let arrSprit = elementdate.split(';').filter((a) => a);
                let listTransform = '';
                let htmlTransform = '';
                let inHtml = '';
                let arrData = [];
                let elSpace = ',';
                let trFlag = false;

                arrSprit.forEach((errelement, i) => {
                    if(errelement.length > 0){
                        arrData = errelement.split(':');
                        arrDataCeck = this.animList[arrData[0]];

                        if(typeof arrDataCeck != 'undefined' && arrDataCeck != ''){
                            if(i + 1 == arrSprit.length) elSpace = ';';
                        }

                        if(this.CLASSTR == arrDataCeck.action){
                            if(!trFlag){
                                listTransform += arrDataCeck.action + elSpace;
                                htmlTransform += this.CLASSTR + ':' + arrDataCeck.key + arrDataCeck.before + arrData[1] + arrDataCeck.unit + arrDataCeck.after;
                                trFlag = true;
                            }else {
                                htmlTransform += ' ' + arrDataCeck.key + arrDataCeck.before + arrData[1] + arrDataCeck.unit + arrDataCeck.after;
                            }
                        }else {
                            listTransform += arrDataCeck.action + elSpace;
                            inHtml += arrDataCeck.action + ':' + arrDataCeck.key + arrDataCeck.before +  arrData[1] + arrDataCeck.unit + arrDataCeck.after + ';'
                        }
                    }
                });

                htmlStyle += '.' + this.IDENDEFCl + countN + '{--a-property: '+ listTransform +'}';
                if(htmlTransform == ''){
                    htmlStyle += '.' + this.IDENDEFCl + countN + '.' + this.CLDONE + '{'+ inHtml +'}'
                }else {
                    htmlStyle += '.' + this.IDENDEFCl + countN + '.' + this.CLDONE + '{'+ htmlTransform + ';' + inHtml +'}'
                }
            }
        });

        document.body.insertAdjacentHTML('beforeend', '<style class="'+ this.CLASSSTYLE +'">'+ this.htmlStyleStart + htmlStyle + '</style>');
    }

    #actionOnScroll = () => {
        this.positionTop = window.scrollY;
        let positionEl, parentElement;
        let screenEl = (this.windowHeight*this.options.visibilityScreen) / 100;

        this.elements.forEach((element, i) => {
            parentElement = element.closest(this.options.container);
            if (typeof parentElement != undefined && parentElement != null) {
                positionEl = parentElement.getBoundingClientRect().y + this.positionTop;
    
                if(positionEl + parentElement.offsetHeight < this.positionTop ){
                    if(element.classList.contains(this.CLDONE)) element.classList.remove(this.CLDONE);
                    if(!element.classList.contains(this.CLASSSTERT)) element.classList.add(this.CLASSSTERT);
                }
    
                if (positionEl <= this.positionTop + this.windowHeight - screenEl) {
                    if(!element.classList.contains(this.CLASSCHECK)) element.classList.add(this.CLASSCHECK);
                }
    
                if(this.options.scrollTopDown){
                    if (positionEl >= this.positionTop + this.windowHeight) {
                        if(!element.classList.contains(this.CLDONE)) {
                            element.classList.add(this.CLDONE);
                            element.classList.remove(this.CLASSSTERT);
                            if(element.classList.contains(this.options.classDelay)) element.removeAttribute('style');
                        }
                    }
                }
            }
        });

        this.newEl = document.querySelectorAll(`.${this.CLASSCHECK}:not(.${this.CLASSSTERT})`);

        if(this.newEl.length > 0){
            this.elDelay = document.querySelectorAll(`.${this.options.classDelay, this.CLASSCHECK}:not(.${this.CLASSSTERT})`);
            this.stepDelay = this.options.stepDelay;

            if(this.elDelay.length > 1){
                this.elDelay.forEach((element, i) => {
                    this.checkDelayAttr = element.getAttribute(this.ATTRDELAY);

                    if (typeof this.checkDelayAttr != undefined && this.checkDelayAttr != null) {
                        this.stepDelay = element.getAttribute(this.ATTRDELAY);
                    }
                    element.setAttribute('style', 'transition-delay:'+ this.stepDelay * i +'s');
                });
            }

            this.newEl.forEach(element => {
                if(element.classList.contains(this.CLASSCHECK)) {
                    element.classList.remove(this.CLASSCHECK, this.CLDONE);
                    element.classList.add(this.CLASSSTERT);
                }
            });
        }
    }

    #resWindowAnimate = () => {
        const _this = this;
        let _time;
        if(_time) clearTimeout(_time);
        _time = setTimeout(function(){
            _this.windowHeight = window.innerHeight;
            _this.#checkMobile();

            if(!_this.mobile) {
                if(!_this.createflag) _this.#createAll();
            }
            else {
                if(_this.createflag) _this.#destroyiN();
            }
        }, 500);
    }

    #destroyiN(){
        if(this.elements.length > 0){
            this.createflag = false;
            this.elements.forEach((element, i) => {
                element.classList.remove(this.CLDONE, this.CLASSSTERT, this.CLASSCHECK, this.IDENDEFCl + i);
                if(element.classList.contains(this.options.classDelay)) element.removeAttribute('style');
            });

            window.removeEventListener('scroll', this.#actionOnScroll);

            const styleEl = document.querySelector(`.${this.CLASSSTYLE}`).remove();
            if(styleEl) styleEl.remove();
        }
    }

    destroy(){
        if(this.elements.length > 0){
            this.#destroyiN();
            window.removeEventListener('resize', this.#resWindowAnimate);
        }
    }
}
//# sourceMappingURL=../maps/WFScroll.js.map
