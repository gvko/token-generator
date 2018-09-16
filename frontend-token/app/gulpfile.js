var gulp = require('gulp');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var realpathify = require('realpathify');
var notify = require('gulp-notify');

//Port to run webserver
var port = 8080;
//Path of NPM modules
var modules = './node_modules/';
//Paths of Project
var paths = {
    js: './js/',
    css: './css/',
    img: './img/',
    bootstrapjs: modules + 'bootstrap/dist/js/bootstrap.js',
    bootstrapcss: modules + 'bootstrap/dist/css/bootstrap.css',
    vue: modules + 'vue/dist/vue.js'
};

gulp.task("build", function(){
    return browserify({
        entries: ["./js/app.js"]
    })
    .transform(babelify)
    .plugin(realpathify)
    .bundle()
    .on('error', function (error) { console.log(error) })
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(notify({ title: "Success", message: "Built app.js!", sound: false }));;
});

gulp.task('libs', function () {
    return gulp.src(
        [paths.vue])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            port: port,
            open: true
        }));
});


gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('watch', function () {
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch(paths.js + '*.js', ['build']);
});

gulp.task('dev', function () {
    gulp.start(['libs', 'build', 'webserver', 'watch', 'sass']);
});