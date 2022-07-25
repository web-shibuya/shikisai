/* ==============================
 * njk
 * ============================== */
const nunjucks = require('gulp-nunjucks-render');
const beautify = require('gulp-html-beautify');
const htmlhint = require('gulp-htmlhint');

const config = require('../config').base;
const njkDir = require('../config').njk.srcDir;
const njkDir_wp = require('../config').njk.srcDir_wp;

config.gulp.task('njk', (callback) => {
	return config.gulp.src([config.srcDir + njkDir], {base: config.srcDir + 'njk/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(nunjucks({path: config.srcDir + 'njk/'}))
	.pipe(beautify({indent_with_tabs: true}))
	.pipe(config.fileRename((path) => {
		//ファイル名がindexなら、public直下のディレクトリに
		if(path.basename === 'index') {
			path.dirname = '';
			return;
		}
		//index以外は、ファイル名からディレクトリ名を取得
		let namelist = path.basename.split('-');
		let len = namelist.length-1;
		for(let i = 0; i<=len; i++) {
			path.dirname += '/' + namelist[i];
		}
		if(path.basename.indexOf('>') !== -1){
			path.basename = path.basename.split('>')[1];
			path.dirname = path.dirname.split('>')[0];
		} else {
			path.basename = 'index';
		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('njk_php', (callback) => {
	return config.gulp.src([config.srcDir + njkDir], {base: config.srcDir + 'njk/'})
		.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
		.pipe(nunjucks({path: config.srcDir + 'njk/'}))
		.pipe(beautify({indent_with_tabs: true}))
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(config.fileRename((path) => {
		//htmlをphpに変更
		path.extname = '.php';

		//ファイル名がindexなら、public直下のディレクトリに
		if(path.basename.indexOf('index') !== -1) {
			path.dirname = '/inc';
			return;
		}

		//index以外は、ファイル名からディレクトリ名を取得
		path.dirname = '/';
		var str = path.basename.split('_')[0];
		var namelist = str.split('-');
		var len = namelist.length-1;
		for(var i = 0; i<=len; i++) {
			path.dirname += '/' + namelist[i];
		}
		path.dirname += '/inc';

		if(path.basename.indexOf('_sp') == -1){
			path.basename = 'index_sp';
		} else {
			path.basename = 'index';
		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('njk_wp', (callback) => {
	return config.gulp.src([config.srcDir + njkDir_wp], {base: config.srcDir + 'njk/'})
	.pipe(config.plumber({
		errorHandler: config.notify.onError('Error: <%= error.message %>')
	}))
	.pipe(config.fileRename((path) => {
		path.extname = '.html';
	}))
	.pipe(config.replace('.njk', '.twig'))
	.pipe(config.fileRename((path) => {
		if(path.basename.indexOf('_') === -1) {
			path.dirname = '';
		}
		path.extname = '.twig';
	}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});