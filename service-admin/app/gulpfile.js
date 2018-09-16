const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const srcGlobTsc = ['src/**/*.js'];

/*
 * Starts dev environment: watch over .js files and run default
 */
gulp.task('start', () => {
  return nodemon({
    script: 'src/app.js',
    watch: srcGlobTsc,
    nodeArgs: ['--inspect=0.0.0.0:5858'], // args used for attaching to a debugger
    ext: 'js'
  });
});

