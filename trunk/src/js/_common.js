//= include '_imgloader.js'
class Genco {
	static hoge = true;

	constructor(option) {
		this.$loadimg = $(option.$loadimg);
		this.$loading = $(option.$loading);
	}

	smoothscroll(id, speed) {
		let position = $(id).offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
	}

	imgload(fn) {
		const imgloading = new loadImg({
			$loadimg: this.$loadimg,
			$loading: this.$loading
		});

		imgloading.loading(fn);
	}

}