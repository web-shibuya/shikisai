/* ==============================
 * browserSync
 * ============================== */
const connect = require('gulp-connect');
const connectphp = require('gulp-connect-php');
const reloadphp = require('gulp-livereload');
const config = require('../config').base;
const option = require('../config').sync;


config.gulp.task('sync', (done) => {
	connect.server({
		root: config.publicDir,
		port: 3000,
		livereload: true
	});
	done();
});

config.gulp.task('sync_php', (done) => {
	connectphp.server({
		base: config.publicDir,
		host: option.host,
		port: option.port
	});
	done();
});