const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano')


let isProd;

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

function dev(cb){
    isProd = false;
    cb()
}

function prod(cb) {
    isProd = true;
    cb()   
}

function watch() {
    gulp.watch('./src/scss/**/*.scss', sassBuild)
    
}


exports.default = sassBuild;
exports.watch = watch;
exports.buildDev = gulp.series(dev, gulp.parallel(sassBuild))
exports.buildProd = gulp.series(prod, gulp.parallel(sassBuild))
