/* ==============================
 * Watch
 * ============================== */
const config = require('../config').base;
const srcDir = require('../config').watch;

config.gulp.task('watch', (done) => {
	config.gulp.watch([config.srcDir + srcDir.njk], config.gulp.series('njk'));
	config.gulp.watch([config.srcDir + srcDir.js], config.gulp.series('js'));
	config.gulp.watch([config.srcDir + srcDir.css], config.gulp.series('css'));
	done();
});

config.gulp.task('watch_php', (done) => {
	config.gulp.watch([config.srcDir + srcDir.njk], config.gulp.series('njk_php'));
	config.gulp.watch([config.srcDir + srcDir.js], config.gulp.series('js'));
	config.gulp.watch([config.srcDir + srcDir.css], config.gulp.series('css'));
	config.gulp.watch([config.srcDir + srcDir.php], config.gulp.series('copy_php'));
	done();
});

config.gulp.task('watch_wp', (done) => {
	config.gulp.watch([config.srcDir + srcDir.njk], config.gulp.series('njk_wp'));
	config.gulp.watch([config.srcDir + srcDir.js], config.gulp.series('js_wp'));
	config.gulp.watch([config.srcDir + srcDir.css], config.gulp.series('css_wp'));
	config.gulp.watch([config.srcDir + srcDir.php], config.gulp.series('copy_wp'));
	done();
});