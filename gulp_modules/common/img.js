/* ==============================
 * Image
 * ============================== */
// const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

const config = require('../config').base;
const srcDir = require('../config').img.srcDir;

config.gulp.task('img', (callback) => {
	return config.gulp.src([config.srcDir + srcDir], {base: config.srcDir + 'img'})
	// .pipe(imagemin({
	// 	use: [
	// 		pngquant({
	// 			quality: '65-80',
	// 			speed: 1
	// 		}),
	// 		mozjpeg({ quality: 80 }),
	// 		imagemin.svgo(),
	// 		imagemin.gifsicle()
	// 	]
	// }))
	.pipe(config.fileRename((path) => {
		path.dirname = 'img/' + path.dirname;

		//		let namelist = path.dirname.split('-');
		//		let len = namelist.length-1;
		//		if(len === 0){
		//			if(path.dirname === 'index'){
		//				path.dirname = '/img';
		//			} else {
		//				path.dirname += '/img';
		//			}
		//		} else {
		//			path.dirname = ''
		//			for(let i = 0; i<=len; i++){
		//				path.dirname += namelist[i] + '/';
		//				if(i === len){
		//					path.dirname += 'img';
		//				}
		//			}
		//		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('img_wp', (callback) => {
	return config.gulp.src([config.srcDir + srcDir], {base: config.srcDir + 'img'})
	// .pipe(imagemin({
	// 	use: [pngquant({quality: '60-80', speed: 1})]
	// }))
	.pipe(config.fileRename((path) => {
		path.dirname = 'img/' + path.dirname;
	}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});