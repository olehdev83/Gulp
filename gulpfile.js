const gulp          = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const browserSync   = require('browser-sync');

// Задача для запуска сервера

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

// Задача для компиляции стилей

gulp.task('styles', function(){
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("scr/scss"))
        .pipe(browserSync.stream());
});

// Задача для отслежки изминении в файлах

gulp.task('watch', function(){
    gulp.watch("src/scss/**/*.+(scss|sass)", gulp.parallel("styles"))
    gulp.watch("src*.html", browserSync).on("change", browserSync.reload)
});

// Запуск задач по умолчанию

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));