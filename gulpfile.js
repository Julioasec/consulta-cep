const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');
const cssNano = require('gulp-cssnano');
const sourceMaps = require('gulp-sourcemaps')
let isProd;


//builda o sass em css
function sassBuild() {

    if(isProd){
        return gulp.src('./src/css/style.css')
        .pipe(cssNano({
                autoprefixer: {
                    browsers:['>1%','last 2  versions'],
                    add:true
                }
        }))
        .pipe(gulp.dest('./dest/css'))
    }
    
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./src/css'))
   
}


//modo watch
function watchFiles() {
    return watch('./src/scss/**/*.scss', gulp.series(dev, sassBuild))
}


function dev(cb) {
    isProd = false;
    cb()
}

function prod(cb) {
    isProd = true;
    cb()
}




exports.watch = watchFiles;
exports.dev = gulp.series(dev, gulp.parallel(sassBuild))
exports.prod = gulp.series(prod, gulp.parallel(sassBuild))
