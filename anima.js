jQuery(function () {
	
	function Anima(name, px){
		this.name = name;
		this.px = px;
		
		this.t_val = '0, -50px';
		this.t_type = 'translate';
		
		this.tag = jQuery(this.name);
		this.wtop = jQuery(window).scrollTop();
		this.ttop = jQuery(this.name).offset().top;
		this.win = jQuery(window);
		this.wtop = jQuery(window).scrollTop();
		
		this.setVal = function(val){
			this.t_val = val;
		};
		this.setType = function(type){
			this.t_type = type;
		};
		this.isVisible = function(){
			return (((this.ttop + this.px) <= this.wtop + this.win.height()) && (this.ttop >= this.wtop));
		};
		this.refresh = function(){
			this.tag = jQuery(this.name);
			this.ttop = jQuery(this.name).offset().top;
			this.wtop = jQuery(window).scrollTop();
		};
		this.signal = function(){
			this.refresh();
			var x = this.tag;
			if (!x.prop("shown") && this.isVisible(this.px)) {
				x.prop("shown", true);
			    this.tag.css('transform', this.t_type+'('+this.t_val+')');
			}
		};
	}

	var novel = new Anima("#novelMain", 0);
	var articles = new Anima("#articlesMain", 150);
	
	jQuery(window).scroll(function() {
		novel.signal();
		articles.signal();
	});

	
});
