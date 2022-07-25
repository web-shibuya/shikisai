/* ==============================
 * JavaScript
 * ============================== */
const babel = require('gulp-babel');
const jsimport = require('gulp-include');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');
const config = require('../config').base;
const srcDir = require('../config').js.srcDir;
const lintDir = require('../config').js.lintDir;
const jsname = require('../config').js.jsname;

/* ==============================
 * JavaScript
 * ============================== */
config.gulp.task('jsinc', (callback) => {
	return config.gulp.src([config.srcDir + srcDir], {base: config.srcDir + 'js'})
	.pipe(jsimport())
	.pipe(config.gulp.dest(lintDir))
	.pipe(babel({
		presets: ['@babel/preset-env'],
		plugins: ['@babel/plugin-proposal-class-properties']
	}))
	.pipe(prettier({
		'printWidth': 120,
		'tabWidth': 4,
		'useTabs': true,
		'singleQuote': true,
		'proseWrap': 'never',
		'bracketSpacing': false
	}))
	.pipe(config.fileRename((path) => {
		path.dirname = '/js';

		//		if(path.basename === 'index'){
		//			//ファイル名がindexなら、public直下のjsディレクトリに
		//			path.dirname = '/js';
		//		} else {
		//			//index以外は、ファイル名からディレクトリ名を取得
		//			let namelist = path.basename.split('-');
		//			let len = namelist.length-1;
		//			for(let i = 0; i<=len; i++){
		//				path.dirname += '/' + namelist[i];
		//				if(i === len){
		//					path.dirname += '/js';
		//				}
		//			}
		//		}
		//		if(path.basename.indexOf('>') !== -1){
		//			path.basename = path.basename.split('>')[1];
		//			path.dirname = path.dirname.split('>')[0] + '/js';
		//		} else {
		//			path.basename = jsname;
		//		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('jsinc_wp', (callback) => {
	return config.gulp.src([config.srcDir + srcDir], {base: config.srcDir + 'js'})
	.pipe(jsimport())
	.pipe(config.gulp.dest(lintDir))
	.pipe(babel({
		presets: ['@babel/preset-env'],
		plugins: ['@babel/plugin-proposal-class-properties']
	}))
	.pipe(prettier({
		'printWidth': 120,
		'tabWidth': 4,
		'useTabs': true,
		'singleQuote': true,
		'proseWrap': 'never',
		'bracketSpacing': false
	}))
	.pipe(config.fileRename((path) => {
		path.dirname = '/js';
	}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});

config.gulp.task('jslint', (callback) => {
	return config.gulp.src([lintDir + '**/*.js'], {base: config.srcDir + 'js'})
	.pipe(config.plumber({
		errorHandler: (error) => {
			let taskName = 'eslint';
			let title = '[task]' + taskName + ' ' + error.plugin;
			let errorMsg = 'error: ' + error.message;
			console.error(title + '\n' + errorMsg);
		}
	}))
	.pipe(eslint({ useEslintrc: true }))
	.pipe(eslint.format())
	.pipe(eslint.failOnError())
	.pipe(config.plumber.stop());
});

config.gulp.task('jsuglify', (callback) => {
	return config.gulp.src(
		[config.publicDir + srcDir],
		{base: config.publicDir}
	)
	.pipe(uglify({output: {
		quote_keys: false,
		beautify: false,
		max_line_len: 100000
	}}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('jsuglify_wp', (callback) => {
	return config.gulp.src(
		[config.wp.publicDir + srcDir],
		{base: config.wp.publicDir}
	)
	.pipe(uglify({output: {
			quote_keys: false,
			beautify: false,
			max_line_len: 100000
	}}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});

config.gulp.task('delLintfile', (done) => {
	config.del([lintDir]);
	done();
});

config.gulp.task('js', config.gulp.series('jsinc', (done) => {
	done();
}));

config.gulp.task('js_wp', config.gulp.series('jsinc_wp', (done) => {
	done();
}));

config.gulp.task('jsprod', config.gulp.series('jsinc', 'jsuglify', 'delLintfile', (done) => {
	done();
}));

config.gulp.task('jsprod_wp', config.gulp.series('jsinc_wp', 'jsuglify_wp', 'delLintfile', (done) => {
	done();
}));