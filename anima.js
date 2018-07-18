jQuery(function () {
    function Anima(name, px) {

        if (!jQuery("*").is(jQuery(name))) {
            return false;
        }

        this.name = name;
        this.px = px;

        this.t_val = '0, -50px'; // по умолчанию сдвиг наверх на 50px
        this.t_type = 'translate';
        this.trans = false;

        this.tag = jQuery(this.name);

        this.opasity = true;
        this.tag.css('opacity', 0);

        this.wtop = jQuery(window).scrollTop();
        this.ttop = jQuery(this.name).offset().top;
        this.win = jQuery(window);
        this.wtop = jQuery(window).scrollTop();

        this.noOpacity = function () {
            this.opasity = false;
            this.tag.css('opacity', 1);
        };
        this.setVal = function (val) {
            this.t_val = val;
        };
        this.setType = function (type) {
            this.t_type = type;
        };
        this.setCss = function (time, type) { // замена времени анимации и ее типа
            if (typeof time === 'undefined') {
                time = '0.7s';
            }
            if (typeof type === 'undefined') {
                type = 'cubic-bezier(.21,.08,.24,.91)';
            }
            this.tag.css({
                "transition-timing-function", type,
                "transition-duration", time,
                "-webkit-transition-timing-function", type,
                "-webkit-transition-duration", time
            });
        this.isVisible = function () {
            return (((this.ttop + this.px) <= this.wtop + this.win.height()) && (this.ttop >= this.wtop));
        };
        this.refresh = function () {
            this.tag = jQuery(this.name);
            this.ttop = jQuery(this.name).offset().top;
            this.wtop = jQuery(window).scrollTop();
        };

        this.setTransform = function (str) {
            this.trans = str;
        }

        this.signal = function () {
            this.refresh();
            var x = this.tag;
            if (!x.prop("shown") && this.isVisible(this.px)) {
                x.prop("shown", true);
                if(this.trans){
                    this.tag.css('transform', this.trans);
                }else{
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
            if(this.trans){
                this.tag.css('transform', this.trans);
            }else{
                this.tag.css('transform', this.t_type + '(' + this.t_val + ')');
            }
            this.tag.css('opacity', 1);

        };
    }

    var test = new Anima("#id", 0); // инициализация
    //test.noOpacity(); // прозрачность не меняется
    test.setCss(); // дефолтные стили
    test.setTransform('translate(0px, -50px) scale(1.1)'); //установка своих правил
    
    //test.go(); // запустится сразу
    jQuery(window).scroll(function () {
        test.signal(); // test.go() тут запустится при первом скролле.
    });

});
