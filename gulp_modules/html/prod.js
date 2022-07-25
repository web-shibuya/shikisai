/* ==============================
 * Tasks
 * ============================== */
const config = require('../config').base;

config.gulp.task('prod', config.gulp.series(
	'init',
	'copy',
	config.gulp.parallel('njk', 'img', 'jsprod'),
	'cssprod',
	(done) => {
		done();
	}
));