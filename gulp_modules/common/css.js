/* ==============================
 * css
 * ============================== */
const config = require('../config').base;
const cssDir = require('../config').css.srcDir;
const lintDir = require('../config').css.lintDir;
const svgDir = require('../config').css.svgDir;
const cssname = require('../config').css.cssname;

const postcss = require('gulp-postcss');
const scss = require('postcss-scss');
const reporter = require('postcss-reporter')({clearMessages: true});
const nested = require('postcss-nested');
const variables = require('postcss-advanced-variables');
const extendrule = require('postcss-extend-rule');
const easyimport = require('postcss-easy-import')({ extensions: ['.scss'] });
const mixins = require('postcss-mixins');
const autoprefixer = require('autoprefixer')({
	cascade: false
});
const base64 = require('postcss-base64')({root: svgDir, extensions: ['.svg']});
const mqpacker = require('gulp-group-css-media-queries');
const sorting = require('postcss-sorting');
const prettier = require('gulp-prettier');
const cleancss = require('gulp-clean-css');
// const stylelint = require('stylelint')('.stylelintrc');

config.gulp.task('csscompile', (callback) => {
	return config.gulp.src([config.srcDir + cssDir], {base: config.srcDir + 'css/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(postcss([
		easyimport,
		extendrule,
		mixins,
		variables,
		nested,
		autoprefixer,
		base64,
		sorting
	], { syntax: scss }))
	.pipe(mqpacker())
	.pipe(prettier({
		'printWidth': 120,
		'tabWidth': 4,
		'useTabs': true,
		'singleQuote': true,
		'proseWrap': 'never',
		'bracketSpacing': false
	}))
	.pipe(config.fileRename((path) => {
		path.dirname = '/css';
		path.extname = '.css';

		// if(path.basename === 'index'){
		// 	path.dirname = '/css';
		// } else {
		// 	//index以外は、ファイル名からディレクトリ名を取得
		// 	let namelist = path.basename.split('-');
		// 	let len = namelist.length-1;
		// 	for(let i = 0; i<=len; i++){
		// 		path.dirname += '/' + namelist[i];
		// 		if(i === len){
		// 			path.dirname += '/css';
		// 		};
		// 	}
		// }
		// if(path.basename.indexOf('>') !== -1){
		// 	path.basename = path.basename.split('>')[1];
		// 	path.dirname = path.dirname.split('>')[0] + '/css';
		// } else {
		// 	path.basename = cssname;
		// }
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('csscompileProd', (callback) => {
	return config.gulp.src([config.srcDir + cssDir], {base: config.srcDir + 'css/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(postcss([
		easyimport,
		extendrule,
		mixins,
		variables,
		nested,
		autoprefixer,
		base64
	], { syntax: scss }))
	.pipe(mqpacker())
	.pipe(cleancss())
	.pipe(config.fileRename((path) => {
		path.dirname = '/css';
		path.extname = '.css';

		//		if(path.basename === 'index'){
		//			path.dirname = '/css';
		//		} else {
		//			//index以外は、ファイル名からディレクトリ名を取得
		//			let namelist = path.basename.split('-');
		//			let len = namelist.length-1;
		//			for(let i = 0; i<=len; i++){
		//				path.dirname += '/' + namelist[i];
		//				if(i === len){
		//					path.dirname += '/css';
		//				};
		//			}
		//		}
		//		if(path.basename.indexOf('>') !== -1){
		//			path.basename = path.basename.split('>')[1];
		//			path.dirname = path.dirname.split('>')[0] + '/css';
		//		} else {
		//			path.basename = cssname;
		//		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('csscompile_wp', (callback) => {
	return config.gulp.src([config.srcDir + cssDir], {base: config.srcDir + 'css/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(postcss([
		easyimport,
		extendrule,
		mixins,
		variables,
		nested,
		autoprefixer,
		base64
	], { syntax: scss }))
	.pipe(mqpacker())
		.pipe(prettier({
		'printWidth': 120,
		'tabWidth': 4,
		'useTabs': true,
		'singleQuote': true,
		'proseWrap': 'never',
		'bracketSpacing': false
	}))
	.pipe(config.fileRename((path) => {
		if(path.basename.indexOf('style') !== -1) {
			path.dirname = '';
		} else {
			path.dirname = '/css';
		}
		path.extname = '.css';
	}))
		.pipe(config.gulp.dest(config.wp.publicDir));
});

config.gulp.task('csscompileProd_wp', (callback) => {
	return config.gulp.src([config.srcDir + cssDir], {base: config.srcDir + 'css/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(postcss([
		easyimport,
		extendrule,
		mixins,
		variables,
		nested,
		autoprefixer,
		base64
	], { syntax: scss }))
	.pipe(mqpacker())
	.pipe(cleancss())
	.pipe(config.fileRename((path) => {
		if(path.basename.indexOf('style') !== -1) {
			path.dirname = '';
		} else {
			path.dirname = '/css';
		}
		path.extname = '.css';
	}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});

config.gulp.task('csslint', (callback) => {
	return config.gulp.src([lintDir], {base: config.srcDir + 'css/'})
		.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(postcss([
		// stylelint,
		reporter
	]))
});

config.gulp.task('css', config.gulp.series('csslint', 'csscompile', (done) => {
	done();
}));

config.gulp.task('cssprod', config.gulp.series('csslint', 'csscompileProd', (done) => {
	done();
}));

config.gulp.task('css_wp', config.gulp.series('csslint', 'csscompile_wp', (done) => {
	done();
}));

config.gulp.task('cssprod_wp', config.gulp.series('csslint', 'csscompileProd_wp', (done) => {
	done();
}));