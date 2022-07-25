/* ==============================
 * default
 * ============================== */
const config = require('../config').base;

config.gulp.task('default', config.gulp.series(
	'init',
	'copy',
	config.gulp.parallel('njk', 'img', 'js'),
	'css',
	'watch',
	(done) => {
		done();
	}
));
