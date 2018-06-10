var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');

// Static Server + watching scss/html files
gulp.task('serve', ['build'], function() {
    browserSync.init({
        notify: false,
        server: "./"
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['js']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(err) { //Compile and compress sass
            console.error(err.message);
            browserSync.notify(err.message, 3000); // Display error
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        }))
        .pipe(autoprefixer({
            browsers: ['Safari >= 6.1', 'IE >= 10', 'Firefox >= 28'], cascade: false}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src(['src/js/jquery-3.3.1.js', 'src/js/jquery.waypoints.js', 'src/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['sass', 'js']);

gulp.task('default', ['serve']);
