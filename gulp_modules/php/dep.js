/* ==============================
 * Tasks
 * ============================== */
const config = require('../config').base;
const git = require('../config').git;

config.gulp.task('dep', config.gulp.series(
	'init',
	'copy_php',
//	'composer',
	config.gulp.parallel('njk_php', 'img', 'jsprod'),
	'cssprod',
	'cssprod',
	'gitcommit',
	'gitpush',
	'sftp',
	(done) => {
		done();
	}
));