// 共通定数
let baseConfig = {
	srcDir: 'trunk/src/',
	publicDir: 'trunk/public/mock/findyourtruecolors/',
	wp: {
		themeName: 'shikisai'
	},
	gulp: require('gulp'),
	del: require('del'),
	plumber: require('gulp-plumber'),
	notify: require('gulp-notify'),
	fileRename: require('gulp-rename'),
	livereload: require('gulp-livereload'),
	replace: require('gulp-replace')
};

baseConfig['wp']['publicDir'] = 'trunk/public/' + baseConfig.wp.themeName + '/';
//baseConfig['wp']['publicDir'] = 'wp/wp-content/themes/' + baseConfig.wp.themeName + '/'

module.exports = {
	base: baseConfig,
	git: {
		branch: 'develop'
	},
	ftp: {
		host: 'ys-creative.sakura.ne.jp',
		id: 'ys-creative',
		pw: '1b7d70c402',
		locaclPath: 'trunk/public/mock/**/*',
		remotePath: '/home/ys-creative/www/preview1/starterskit/'
	},
	sync: {
		host: 'localhost',
		port: 3000,
		https: false,
		proxy: [],
	},
	watch: {
		njk: 'njk/**/*.njk',
		js: 'js/**/*.js',
		css: 'css/**/*.scss',
		php: 'php/*.php'
	},
	copy: {
		fileDir: [
			baseConfig.srcDir + 'favicon/*'
		]
	},
	njk: {
		srcDir: 'njk/**/!(_)*.njk',
		srcDir_wp: 'njk/**/*.njk'
	},
	css: {
		srcDir: 'css/**/!(_)*.scss',
		lintDir: 'css/**/_*.scss',
		svgDir: 'trunk/src/img/',
		cssname: 'style'
	},
	js: {
		srcDir: 'js/**/!(_)*.js',
		lintDir: 'trunk/lintcheck/',
		jsname: 'script'
	},
	img: {
		srcDir: 'img/**/!(_)*.{png,jpg,svg}'
	}
};