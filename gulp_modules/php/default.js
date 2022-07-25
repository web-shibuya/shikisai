/* ==============================
 * default
 * ============================== */
const config = require('../config').base;

config.gulp.task('default', config.gulp.series(
	'init',
	'copy_php',
//	'composer',
	config.gulp.parallel('njk_php', 'img', 'js'),
	'css',
	'sync_php',
	'watch_php',
	(done) => {
		done();
	}
));