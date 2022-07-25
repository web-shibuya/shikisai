/* ==============================
 * composer
 * ============================== */
const simpleGit = require('gulp-git');
const minimist = require('minimist');
const config = require('../config').base;
const gitconf = require('../config').git;
const option = {
	remote: 'origin',
	branch: gitconf.branch,
	addAll: true,
	commit: true,
	message: gitconf.branch + ' deploy!',
	push: true
};

const argv = minimist(process.argv.slice(2));

config.gulp.task('gitcommit', (done) => {
	config.gulp.src('./')
	.pipe(simpleGit.add())
	.pipe(simpleGit.commit(gitconf.branch + ' ' + argv['m']));
	return done();
});

config.gulp.task('gitpush', (done) => {
	simpleGit.push('origin', gitconf.branch, (err) => {
		if (err) throw err;
	});
	return done();
});