/* ==============================
 * composer
 * ============================== */
const sftp = require('gulp-sftp-up4');
const config = require('../config').base;
const ftpconf = require('../config').ftp;

config.gulp.task('sftp', (done) => {
	config.gulp.src([ftpconf.locaclPath])
	.pipe(sftp({
		host: ftpconf.host,
		user: ftpconf.id,
		pass: ftpconf.pw,
		remotePath: ftpconf.remotePath
	}));
	return done();
});