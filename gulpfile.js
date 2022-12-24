const gulp        	= require('gulp');
const sass        	= require('gulp-sass')(require('sass'));
const rename 		= require("gulp-rename");
const autoprefixer 	= require('gulp-autoprefixer');
const cleanCSS 		= require('gulp-clean-css');
const browserSync 	= require('browser-sync');

// Задача для запуска сервера

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });
});

// Задача для компиляции стилей

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Задача для отслежки изминении в файлах

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
	gulp.watch("src/*.html").on('change', browserSync.reload);
})

// Запуск задач по умолчанию

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));