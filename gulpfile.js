// initialize modues
const { src, watch, dest, series, parallel } = require('gulp')
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel')
const webpack = require('webpack-stream')


// File path variables
const files = {
  scssPath: 'src/scss/**/*.scss',
  scssMainPath: 'src/scss/main.scss',
  jsPath: 'src/js/**/*.js',
  htmlIndexPath: 'src/index.html',
  htmlPagesPath: 'src/pages/**/*.html',
  htmlPath: 'src/**/*.html',
  imagePath: 'src/images/*'
}
// BrowserSync Hot Reloading

watch("./src/**/*.html").on('change', browserSync.reload);

// Sass task

function scssTask(done) {
  src(files.scssMainPath)
    .pipe(postcss([tailwindcss(), autoprefixer(), cssnano()]))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
  done()
}


// Image Optimizer

function imageOpt(done) {
  src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('build/images'));
  done()
}


// JS task

function jsTask(done) {
  src(files.jsPath)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack())
    .pipe(concat('main.js'))
    .pipe(dest('build/js'));
  done()
}
function htmlIndexTask(done) {
  src(files.htmlIndexPath, { allowEmpty: true })
    .pipe(dest('build/', { allowEmpty: true })
    );
  done();

}

function htmlPagesTask(done) {
  src(files.htmlPagesPath, { allowEmpty: true })
    .pipe(dest('./build', { allowEmpty: true })
    );
  done();
}

// BrowserSync method

function browserSyncTask(done) {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  });
  done()
}
//Reload method

function reload(done) {
  browserSync.reload();
  done();
}


// Cachebusting task
const cbString = new Date().getTime();
function cacheBustTask(done) {
  src(['build/index.html'], { allowEmpty: true })
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'))
  done()
}
// watch task

function watchTask(done) {
  watch([files.scssPath, files.jsPath, files.htmlPagesPath, files.htmlIndexPath],
    parallel(scssTask, jsTask, htmlPagesTask, htmlIndexTask));
  done()
}

// Default task

exports.dev = series(
  parallel(htmlPagesTask, htmlIndexTask, scssTask, jsTask, browserSyncTask),
  cacheBustTask,
  watchTask
)

exports.build = series(
  parallel(htmlPagesTask, scssTask, jsTask, imageOpt),
  cacheBustTask,
)
