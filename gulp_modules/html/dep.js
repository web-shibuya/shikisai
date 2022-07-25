/* ==============================
 * Tasks
 * ============================== */
const config = require('../config').base;

config.gulp.task('dep', config.gulp.series(
	'init',
	'copy',
	config.gulp.parallel('njk', 'img', 'jsprod'),
	'cssprod',
	'gitcommit',
	'gitpush',
	'sftp',
	(done) => {
		done();
	}
));