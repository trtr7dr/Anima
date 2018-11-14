jQuery(function () {
    function Anima(name, px) { // version 2

        if (!jQuery("*").is(jQuery(name))) {
            return false;
        }

        this.name = name;
        this.px = px;
        this.t_val = '0, -50px'; // по умолчанию сдвиг наверх на 50px
        this.t_type = 'translate';
        this.trans = false;
        
        this.anima_prop_x = 0;
        this.anima_sign_x = '+';
        this.anima_prop_y = 0;
        this.anima_sign_y = '+';
        
        this.pos = undefined;

        this.tag = jQuery(this.name);

        this.back = 15; // смещение фона по умолчанию
        this.opasity = true;
        this.tag.css('opacity', 0);
        this.wtop = jQuery(window).scrollTop();
        this.ttop = jQuery(this.name).offset().top;
        this.win = jQuery(window);
        this.wtop = jQuery(window).scrollTop();
        
        this.startPosition = function () {
            if(this.pos === undefined){
                this.pos = window.pageYOffset;
            }
        };
        this.noOpacity = function () {
            this.opasity = false;
            this.tag.css('opacity', 1);
        };
        
        this.setXY = function (x, y){
            this.setX(x);
            this.setY(y);
        };
        
        this.setX = function (val) {
            if(val < 0){
                this.anima_sign_x = '-';
                val *= -1;
            }
            this.anima_prop_x = val;
        };
        
        this.setY = function (val) {
            if(val < 0){
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
        
        this.isVisible = function () {
            return (((this.ttop + this.px) <= this.wtop + this.win.height()) && (this.ttop >= this.wtop));
        };
        
        this.onMonitor = function () {
            return $(document).scrollTop() + $(window).height() > this.tag.offset().top && $(document).scrollTop() - this.tag.offset().top < this.tag.height();
        }
        
        this.refresh = function () {
            this.tag = jQuery(this.name);
            this.ttop = jQuery(this.name).offset().top;
            this.wtop = jQuery(window).scrollTop();
        };

        this.setTransform = function (str) {
            this.trans = str;
        };

        this.signal = function () {
            this.refresh();
            var x = this.tag;
            if (!x.prop("shown") && this.isVisible(this.px)) {
                x.prop("shown", true);
                if (this.trans) {
                    this.tag.css('transform', this.trans);
                } else {
                    this.tag.css('transform', this.t_type + '(' + this.t_val + ')');
                }

                if (this.opasity) {
                    this.tag.css('opacity', 1);
                }
            }
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
        
        this.signal_back = function (type) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            var scrolled_px = 0;
            scrolled_px = (scrolled / this.back);
            this.tag.css('background-position-' + type + scrolled_px + '%');
        };

        this.anima = function (duration) {
            if (this.onMonitor() ) {
                this.startPosition();
                if (this.opasity) {
                    this.tag.css('opacity', 1);
                }
                var scroll_done = (window.pageYOffset - this.pos);
                var proc_x =  this.anima_prop_x * ((scroll_done - this.px) / duration );
                var proc_y =  this.anima_prop_y * ((scroll_done - this.px) / duration );
            
                if(duration > (scroll_done - this.px)  && this.px < scroll_done && (scroll_done - this.px) < this.anima_prop_x){
                    this.tag.css('transform', this.t_type + '(' + this.anima_sign_x + proc_x + 'px, ' + this.anima_sign_y + proc_y + 'px)');
                }
            }
        };
    }
});


