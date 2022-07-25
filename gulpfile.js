//共通で使うNode Moduleの定義
const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp_modules/common', {recurse: true});
requireDir('./gulp_modules/html', {recurse: true});