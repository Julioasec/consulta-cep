const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));


//builda o sass em css
function sassBuild() {
    
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
   
}



exports.default = sassBuild;
