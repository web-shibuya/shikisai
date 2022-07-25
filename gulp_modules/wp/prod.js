/* ==============================
 * Tasks
 * ============================== */
const config = require('../config').base;

config.gulp.task('prod', config.gulp.series(
	'init_wp',
	'copy_wp',
	config.gulp.parallel('njk_wp', 'jsprod_wp', 'img_wp'),
	'cssprod_wp',
	(done) => {
		done();
	}
));