const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel')


let isProd = false;

//builda o sass em css
function sassBuild() {
    let urlSrc = isProd ?'./src/css/style.css':'./src/scss/**/*.scss';
    let urlDest= isProd ? './dist/css':'./src/css';

    if(isProd){
        return gulp.src(urlSrc)
        .pipe(cssnano({
            autoprefixer: {
                    browsers:['>1%','last 2  versions'],
                    add:true
                }
            }))
        .pipe(gulp.dest(urlDest))
    }

    return gulp.src(urlSrc)
    .pipe(sourceMaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(urlDest))
   
}

function jsBuild() {
    
    // if (isProd) {
        return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
    // }

    // return gulp.src('./src/js/**/*.js')
    // .pipe(concat('all.js'))
    // .pipe(babel({
    //     presets:['@babel/env']
    // }))
    // .pipe(gulp.dest(urlDest))
}

function watch() {
    gulp.watch('./src/scss/**/*.scss', sassBuild)
    gulp.watch(['./src/js/**/*.js','!./src/js/app.js'],  jsBuild)
    
}

function dev(cb){
    isProd = false;
    cb()
}

function prod(cb) {
    isProd = true;
    cb()   
}

function html() {
   return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
}

exports.default = gulp.parallel(sassBuild, jsBuild);
exports.js = jsBuild;
exports.watch = watch;
exports.buildDev = gulp.series(dev, gulp.parallel(sassBuild, jsBuild))
exports.buildProd = gulp.series(prod, gulp.parallel(sassBuild, jsBuild, html))
