const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps')


//builda o sass em css
function sassBuild() {

    return gulp.src('./src/scss/**/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./src/css'))
   
}



exports.default = sassBuild;
