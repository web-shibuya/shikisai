/* ==============================
 * composer
 * ============================== */
const composer = require('gulp-composer');
const config = require('../config').base;

config.gulp.task('composer', (done) => {
	composer();
	done();
});