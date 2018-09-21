/**
 * Directory variables
 */
var base_path = {
    src: {
        npm: 'node_modules',
        js: 'src/js',
        scss: 'src/scss'
    },
    dist: {
        js: 'dist/js',
        css: 'dist/css'
    }
};

// Defining requirements
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;




/**
 *  Compile SCSS to CSS
 *  Go into main.scss, include other pages/modules, autoprefix, compile to css and output to css folder
 */
gulp.task('scss', function () {
    return gulp.src( base_path.src.scss + '/main.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([autoprefixer()]))
        // .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(base_path.dist.css))
        .pipe(browserSync.stream())
        .pipe(notify({message: 'scss - task finished', onLast: true}));
});

/**
 *  Compile JS
 *  Concat all js files into one, transpile ES7/6 to ES5 and output to dist folder..
 */
gulp.task('js', function () {
    return gulp.src([
        base_path.src.npm + '/jquery/dist/jquery.js',
        'src/js/custom-module.js',
        'src/js/main.js',
    ])
    .pipe(babel({
        presets: ['babel-preset-env']
    }))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message: 'js - task finished', onLast: true}));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js:watch', ['js'], function (done) {
    browserSync.reload();
    notify({message: 'js:watch - task finished'});
    done();
});

/**
 *  Compile SCSS to CSS
 *  Go into main.scss, include other pages/modules, autoprefix, compile to css and output to css folder
 */
gulp.task('watch', function () {

    // Browsersync for Windows
    // access at http://localhost:3000/front-end-gulp-scaffold/
    browserSync.init({
        proxy: "localhost",
        open: false
    });

    // Watch .scss files
    gulp.watch(base_path.src.scss + '/**/*.scss', ['scss']);

    // Watch .js files
    gulp.watch(base_path.src.js + '/**/*.js', ['js:watch']);

    // Watch any files in dist/, reload on change
    gulp.watch(['./**/*.{html,php}']).on('change', reload);

});



/**
 *  Default gulp task if you run gulp
 */
gulp.task('default', function () {
    runSequence(['js','scss'], 'watch');
});