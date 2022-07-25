/* ==============================
 * copy
 * ============================== */
const config = require('../config').base;
const fileDir = require('../config').copy.fileDir;

config.gulp.task('copy', (callback) => {
	return config.gulp.src(fileDir, {base: config.srcDir})
	.pipe(config.fileRename((path) => {
		//_jquery.jsとかを、jquery.jsにリネーム
		if(path.basename.indexOf('_') == 0) {
			path.basename = path.basename.replace('_', '');
		}
	}))
	.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('copy_php', (callback) => {
	return config.gulp.src(fileDir, {base: config.srcDir})
		.pipe(config.fileRename((path) => {
		//_jquery.jsとかを、jquery.jsにリネーム
		if(path.basename.indexOf('_') == 0) {
			path.basename = path.basename.replace('_', '');
		}

		//php使う系案件用
		if(path.dirname == 'php') {
			//ファイル名がindexなら、public直下のディレクトリに
			path.dirname = '/';
			if(path.basename === 'index') {
				return;
			}

			//index以外は、ファイル名からディレクトリ名を取得
			var str = path.basename.split('_')[0];
			var namelist = str.split('-');
			var len = namelist.length-1;
			for(var i = 0; i<=len; i++) {
				path.dirname += '/' + namelist[i];
			}

			if(path.basename.indexOf('_sp') !== -1){
				path.basename = 'index_sp';
			} else {
				path.basename = 'index';
			}
		}
	}))
		.pipe(config.gulp.dest(config.publicDir));
});

config.gulp.task('copy_wp', (callback) => {
	return config.gulp.src(fileDir, {base: config.srcDir})
	.pipe(config.fileRename((path) => {

		//_jquery.jsとかを、jquery.jsにリネーム
		if(path.basename.indexOf('_') == 0) {
			path.basename = path.basename.replace('_', '');
		}

		if(path.dirname.indexOf('php') != -1) {
			path.dirname = '';
		}
	}))
	.pipe(config.gulp.dest(config.wp.publicDir));
});