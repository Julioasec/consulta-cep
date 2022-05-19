const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');
const cssNano = require('gulp-cssnano');
const sourceMaps = require('gulp-sourcemaps')
let isProd;


//builda o sass em css
function sassBuild() {

    let srcUrl = isProd ? './src/css/style.css' : './src/scss/**/*.scss';
    let destUrl = isProd ? './dist/css': './src/css';

    if(isProd){
        return gulp.src(srcUrl)
        .pipe(cssNano({
                autoprefixer: {
                    browsers:['>1%','last 2  versions'],
                    add:true
                }
        }))
        .pipe(gulp.dest(destUrl))
    }
    
    return gulp.src(srcUrl)
    .pipe(sourceMaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(destUrl))
   
}

//modo watch

function watchFiles() {
    return watch('./src/scss/**/*.scss', exports.buildprod)
}



function dev(cb) {
    isProd = false;
    cb();
}

function prod(cb) {
    isProd = true;
    cb();
}




exports.watch = watchFiles;
exports.buildDev = gulp.series(dev, gulp.parallel(sassBuild))
exports.buildProd = gulp.series(prod, gulp.parallel(sassBuild))
