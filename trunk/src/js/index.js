(function(){
	//= include '_loadyoutube.js'
	const spBlake = 600;
	const moviePlayer = new YoutubeControl();


	function smoothscroll(id, speed, margin) {
		let position = $(id).offset().top;

		if(!!margin) {
			position -= margin;
		}

		$('body,html').animate({scrollTop:position}, speed, 'swing');
	}

	function scrollShow($elms) {
		let len = $elms.length;
		let winHeight = window.innerHeight * .6;
		let $this;

		for (let i = 0; i < len; i++) {
		  $this = $elms.eq(i);

		  if ($this.offset().top <= window.pageYOffset + winHeight) {
			$this.addClass('is_show');
		  }
		}
	}

	$(function(){
		let $nav = $('#js_nav');
		let $navBtn = $('#js_navbtn');
		let $totop = $('#js_totop');

		$navBtn.on('click', (e) => {
			$nav.toggleClass('is_show');
			$(e.currentTarget).toggleClass('is_close');
			return false;
		});

		$totop.on('click', () => {
			smoothscroll('#top', 500);
			return false;
		});

		let mg = -110;
		if(window.innerWidth <= spBlake) {
			mg = 0;
		}

		$('.js_pagescroll').on('click', (e) => {
			smoothscroll($(e.currentTarget).attr('href'), 500, mg);

			if(window.innerWidth <= spBlake) {
				$nav.removeClass('is_show');
				$navBtn.removeClass('is_close');
			}
			return false;
		});

		let $modal = $('#js_modal');
		let $modalMain = $('#js_modal_main');
		let $modalbtn = $('.js_modalbtn');

		$modalbtn.on('click', (e) => {
			let $elm = $($(e.currentTarget).attr('href')).clone();
			$modalMain.append($elm.addClass('is_show'));

			setTimeout(() => {
				$modal.addClass('is_show');
			}, 100);

			return false;
		});

		$('#js_modalclose').on('click', () => {
			$modal.removeClass('is_show');

			setTimeout(() => {
				$modalMain.empty();
			}, 1000);

			return false;
		});

		let $movmodal = $('#js_movmodal');
		let $movbtn = $('.js_movbtn');

		$movbtn.on('click', (e) => {
			$movmodal.addClass('is_show');
			let movId = $(e.currentTarget).data('mov');

			moviePlayer.setMovie({
				playerID: 'js_mov',
				movieId: movId,
				width: 768,
				height: 432,
				playerVars: {
					autoplay: 1,
					playsinline: 1,
					playlist: movId,
					autohide: 0,
					controls: 1,
					modestbranding: 1,
					enablejsapi: 1,
					showinfo: 0,
					rel: 0,
					wmode: 'transparent'
				},
				events: {
					'onReady': (event) => {
						event.target.mute();
						event.target.playVideo();
					}
				}
			});

			return false;
		});

		$('#js_movclose').on('click', () => {
			$movmodal.removeClass('is_show');

			setTimeout(() => {
				moviePlayer.stopMovie('js_mov');
			}, 500);

			return false;
		});

		let $charabtn = $('.js_charabtn');
		$charabtn.hover((e) => {
			$(e.currentTarget).addClass('is_active');
			$charabtn.not('.is_active').addClass('is_shot');
		}, (e) => {
			$(e.currentTarget).removeClass('is_active');
			$charabtn.not('.is_active').removeClass('is_shot');
		});

		$charabtn.on('click', (e) => {
			let $this = $(e.currentTarget);
			$charabtn.removeClass('is_current');
			$this.addClass('is_current');
			$('#js_character').find('li').removeClass('is_show');
			$movbtn.removeClass('is_show');

			let num = $this.data('num');
			$('#js_chara0' + num).addClass('is_show');
			$movbtn.eq(num - 1).addClass('is_show');
			return false;
		});

		$('#js_charaarrow').on('click', () => {
			$charabtn.eq(0).toggleClass('is_current');
			$charabtn.eq(1).toggleClass('is_current');

			$('#js_character').find('li').removeClass('is_show');
			$movbtn.removeClass('is_show');

			let num = $('.js_charabtn.is_current').data('num');
			$('#js_chara0' + num).addClass('is_show');
			$movbtn.eq(num - 1).addClass('is_show');
			return false;
		});

		let winHeight = window.innerHeight;
		if(window.pageYOffset >= winHeight) {
			$totop.addClass('is_show');
		} else {
			$totop.removeClass('is_show');
		}

		let $scrollElms = $('.js_scrollevent');
    	scrollShow($scrollElms);

		window.onscroll = () => {
			scrollShow($scrollElms);

			if(window.pageYOffset >= winHeight) {
				$totop.addClass('is_show');
			} else {
				$totop.removeClass('is_show');
			}
		};
	});
})();