const gulp = require('gulp');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const realpathify = require('realpathify');
const notify = require('gulp-notify');

//Port to run webserver
const port = 8080;
//Path of NPM modules
const modules = './node_modules/';
//Paths of Project
const paths = {
  js: './js/',
  css: './css/',
  img: './img/',
  bootstrapjs: modules + 'bootstrap/dist/js/bootstrap.js',
  bootstrapcss: modules + 'bootstrap/dist/css/bootstrap.css',
  vue: modules + 'vue/dist/vue.js'
};

gulp.task("build", function () {
  return browserify({
    entries: ["./js/app.js"]
  })
    .transform(babelify)
    .plugin(realpathify)
    .bundle()
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(notify({ title: "Success", message: "Built app.js!", sound: false }));
});

gulp.task('libs', () => {
  return gulp.src(
    [paths.vue])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', () => {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: port,
      open: true
    }));
});


gulp.task('sass', () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});


gulp.task('watch', () => {
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch(paths.js + '*.js', ['build']);
});

gulp.task('dev', () => {
  gulp.start(['libs', 'build', 'webserver', 'watch', 'sass']);
});
