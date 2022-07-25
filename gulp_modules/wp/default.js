/* ==============================
 * default
 * ============================== */
const config = require('../config').base;

config.gulp.task('default', config.gulp.series(
	'init_wp',
	'copy_wp',
	config.gulp.parallel('njk_wp', 'js_wp', 'img_wp'),
	'css_wp',
	'watch_wp',
	(done) => {
		done();
	}
));
