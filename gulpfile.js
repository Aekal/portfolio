var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer= require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        notify: false,
        server: "./"
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("assets/js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(err) { //Compile and compress sass
            console.error(err.message);
            browserSync.notify(err.message, 3000); // Display error
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        }))
        .pipe(autoprefixer({
          browsers: ['Safari >= 6.1', 'IE >= 10', 'Firefox >= 28'], cascade: false}))
        .pipe(sourcemaps.write("dist/css/maps"))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
