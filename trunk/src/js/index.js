(function(){
	$(function(){
		$('#js_hero').addClass('is_show');

		$('#js_slider').slick({
			arrows: true,
			prevArrow: '<a class="result__list__btn slick-prev" href="#"></a>',
			nextArrow: '<a class="result__list__btn slick-next" href="#"></a>',
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
				  breakpoint: 480,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
			],
		});

		$('#js_navbtn').on('click', (e) => {
			$('#js_nav').toggleClass('is_show');
			$(e.currentTarget).toggleClass('is_close');
			return false;
		});

		let $elms = $('.js_scrollevent');
		let len = $elms.length;
		let winHeight = window.innerHeight;
		let $this;

		for(let i = 0; i < len; i++) {
			$this = $elms.eq(i);
			if($this.offset().top <= (window.pageYOffset + winHeight * .6)) {
				$this.addClass('is_show');
			}
		}

		window.onscroll = () => {
			for(let i = 0; i < len; i++) {
				$this = $elms.eq(i);
				if($this.offset().top <= (window.pageYOffset + winHeight * .6)) {
					$this.addClass('is_show');
				}
			}
		};
	});
})();