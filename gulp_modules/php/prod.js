/* ==============================
 * Tasks
 * ============================== */
const config = require('../config').base;

config.gulp.task('prod', config.gulp.series(
	'init',
	'copy_php',
//	'composer',
	config.gulp.parallel('njk_php', 'img', 'jsprod'),
	'cssprod',
	(done) => {
		done();
	}
));