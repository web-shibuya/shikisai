/* ==============================
 * init
 * ============================== */
const config = require('../config').base;

config.gulp.task('init', (done) => {
	config.del([config.publicDir + '*']);
	done();
});

config.gulp.task('init_wp', (done) => {
	config.del([config.wp.publicDir + '*']);
	done();
});