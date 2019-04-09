jQuery(function () {
    function Anima(name, px) { // version 3

        if (!jQuery("*").is(jQuery(name))) {
            console.error('Anima error: element ' + name + ' not found');
            return false;
        }
        
        this.name = name;
        this.px = px;
        this.t_val = '0, -50px'; // по умолчанию сдвиг наверх на 50px
        this.t_type = 'translate';
        this.trans = false;
        this.coef = undefined; //коэфицент для открисовки анимаций текста в спанах
        this.anima_prop_x = 0;
        this.anima_sign_x = '+';
        this.anima_prop_y = 0;
        this.anima_sign_y = '+';
        this.spanTransform = '';
        this.spanTransition = '';
        this.pos = undefined;
        this.tag = jQuery(this.name);
        this.back = 15; // смещение фона по умолчанию
        this.opasity = true;
        this.tag.css('opacity', 0);
        this.win = jQuery(window);

        this.startPosition = function () {
            if (this.pos === undefined) {
                this.pos = window.pageYOffset;
            }
        };
        this.noOpacity = function () {
            this.opasity = false;
            this.tag.css('opacity', 1);
        };

        this.setXY = function (x, y) {
            this.setX(x);
            this.setY(y);
        };

        this.setX = function (val) {
            if (val < 0) {
                this.anima_sign_x = '-';
                val *= -1;
            }
            this.anima_prop_x = val;
        };
        
        this.vCss = function (transform, transition) {
            if (typeof transform === 'undefined') {
                 transform = 'skewY(-30deg)';
            }
            if (typeof transition === 'undefined') {
                transition = 'all 0.6s cubic-bezier(0.4, 0, 0.6, 1) 0.2s';
            }
            this.spanTransform = transform;
            this.tag.css('transform', transform);
            this.tag.css('transition', transition);
        };


        this.setY = function (val) {
            if (val < 0) {
                this.anima_sign_y = '-';
                val *= -1;
            }
            this.anima_prop_y = val;
        };

        this.setVal = function (val) {
            this.t_val = val;
        };

        this.setType = function (type) {
            this.t_type = type;
        };

        this.setBack = function (bg) {
            this.back = bg;
        };

        this.setCss = function (time, type) { // замена времени анимации и ее типа
            if (typeof time === 'undefined') {
                time = '0.7s';
            }
            if (typeof type === 'undefined') {
                type = 'cubic-bezier(.21,.08,.24,.91)';
            }
            this.tag.css({
                "transition-timing-function": type,
                "transition-duration": time,
                "-webkit-transition-timing-function": type,
                "-webkit-transition-duration": time
            });
        };

        this.addSpan = function (type) {
            this.noOpacity();
            var ins = this.tag.html();
            var arr;
            var res = '';
            if (type === 'char') {
                for (var i = 0; i < ins.length; i++) {
                    res += '<span>' + ins[i];
                    if(ins[i] === ' '){
                        res += '</span> ';
                    }else{
                        res += '</span>';
                    }
                }
            }
            if (type === 'word') {
                arr = ins.split(/\s+/g);
                arr.forEach(function (element) {
                    res += '<span>' + element + '</span> ';
                });
            }
            this.tag.html(res);
        };

        this.spanCss = function (transform, transition, coef) {
            if (typeof transform === 'undefined') {
                transform = 'translate(0px, 300px) scale(0.9) skewY(30deg)';
            }
            if (typeof transition === 'undefined') {
                transition = 'all 0.6s cubic-bezier(0.4, 0, 0.6, 1) 0.2s';
            }
            this.spanTransform = transform;
            this.spanTransition = transition;
            this.coef = coef;
            this.spanAnimaCss(transform, transition, 0, coef);
        };

        this.spanAnimaCss = function (transform, transition, opacity, k) {
            $(this.name + ' span').each(function (i, elem) {
                function noLinearTrans(transition, i, k) {
                    if (typeof k === 'undefined') {
                        k = 10;
                    }
                    var temp = transition.split('s');
                    var temp2 = temp[0].split(' ');
                    transition = temp2[0] + ' ' + ((i+1) / k) + 's' + temp[1] + 's';
                    
                    return transition;
                };
                $(this).css({
                    'display': 'inline-block',
                    'transition': noLinearTrans(transition, i, k),
                    'transform': transform,
                    'opacity': opacity
                });
            });
        };

        this.isVisible = function () {
            var vpH = $(window).height(),
                    st = $(window).scrollTop(),
                    y = this.tag.offset().top,
                    elementHeight = this.tag.height();
            return ((y + this.px < (vpH + st)) && (y > (st - elementHeight)));
        };

        this.setTransform = function (str) {
            this.trans = str;
        };

        this.go = function () { // старт после загрузки страницы
            var x = this.tag;
            x.prop("shown", true);
            if (this.trans) {
                this.tag.css('transform', this.trans);
            } else {
                this.tag.css('transform', this.t_type + '(' + this.t_val + ')');
            }
            this.tag.css('opacity', 1);
        };

        this.signal = function (replay) {
            if (typeof replay === 'undefined') {
                replay = false;
            }
            var x = this.tag;
            if (!x.prop("shown") && this.isVisible(this.px)) {
                if(!replay){
                    x.prop("shown", true);
                }
                if (this.trans) {
                    this.tag.css('transform', this.trans);
                } else {
                    this.tag.css('transform', this.t_type + '(' + this.t_val + ')');
                }
                if (this.opasity) {
                    this.tag.css('opacity', 1);
                }
            }else{
                if (replay && !this.isVisible(this.px)) {
                    this.tag.css({
                        'transform': 'none',
                        'opacity': '0'
                    });
                }
            }
        };

        this.signal_back = function (type) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            var scrolled_px = 0;
            scrolled_px = (scrolled / this.back);
            this.tag.css('background-position-' + type, scrolled_px + '%');
        };

        this.sspan = function (replay) { //true - с повтором
            if (typeof replay === 'undefined') {
                replay = false;
            }
            var x = this.tag;
            if (!x.prop("shown") && this.isVisible(this.px)) { //видно
                if (!replay) {
                    x.prop("shown", true);
                }
                this.spanAnimaCss('none', this.spanTransition, 1, this.coef);
            } else {
                if (replay) {
                    this.spanAnimaCss(this.spanTransform, this.spanTransition, 0, this.coef);
                }
            }
        };

        this.anima = function (duration) {
             if (typeof duration === 'undefined') {
                 duration = 500;
             }
            if (this.isVisible()) {
                this.startPosition();
                if (this.opasity) {
                    this.tag.css('opacity', 1);
                }
                var scroll_done = (window.pageYOffset - this.pos);
                var proc_x = this.anima_prop_x * ((scroll_done - this.px) / duration);
                var proc_y = this.anima_prop_y * ((scroll_done - this.px) / duration);
                if (duration > (scroll_done - this.px) && this.px < scroll_done && (scroll_done - this.px) < this.anima_prop_x) {
                    this.tag.css('transform', this.t_type + '(' + this.anima_sign_x + proc_x + 'px, ' + this.anima_sign_y + proc_y + 'px)');
                }
            }
        };
        this.vanima = function () {
            if (this.isVisible()) {
                this.tag.css({
                    'transform': 'none',
                    'opacity': '1'
                });
            }else{
                this.tag.css({
                    'transform': this.spanTransform,
                    'opacity': '0'
                });
            }
        };
    }
    //
});
