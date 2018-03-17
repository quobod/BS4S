const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('browser-sync').create();

// compile Sass & Inject into browser
gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browser.stream());
});

// Move JS files toGMTString src/js
gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browser.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], () => {
    browser.init({
        server: './src'
    });
    
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browser.reload);
});

// Move fonts folder to src
gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome folder to src
gulp.task('fa', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);