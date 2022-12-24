const gulp        	= require('gulp');
const sass        	= require('gulp-sass')(require('sass'));
const rename 		= require("gulp-rename");
const autoprefixer 	= require('gulp-autoprefixer');
const cleanCSS 		= require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const htmlmin       = require('gulp-htmlmin');
const browserSync 	= require('browser-sync');

// Задача для запуска сервера

gulp.task('taskServer', function() {

	browserSync({
		server: {
			baseDir: "dist"
		}
	});

	gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Задача для компиляции стилей

gulp.task('taskStyles', function() {
	return gulp.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

// Задача для отслежки изминении в файлах

gulp.task('taskWatch', function() {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('taskStyles'));
	gulp.watch("src/*.html").on('change', gulp.parallel('taskHtml'));
})

// Задача для минимизации и перемищения html папку dist

gulp.task('taskHtml', function(){
	return gulp.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
})

// Задача для перемищения fonts в папку dist

gulp.task('taskFonts', function(){
	return gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));
})

// Задача для минимизации и перемищения images в папку dist

gulp.task('taskImages', function(){
	gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
})

// Задача для перемищения icons в папку dist

gulp.task('taskIcons', function(){
	return gulp.src("src/icons/**/*")
		.pipe(gulp.dest("dist/js"));
})

// Задача для перемищения script в папку dist

gulp.task('taskScript', function(){
	return gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"));
})

// Задача для минимизации и перемищения mailer в папку dist

gulp.task('taskMailer', function(){
	return gulp.src("src/mailer/**/*")
		.pipe(gulp.dest("dist/js"));
})

// Запуск задач по умолчанию

gulp.task('default', gulp.parallel('taskWatch', 'taskServer', 'taskStyles', 'taskHtml', 'taskFonts', 'taskIcons', 'taskImages', 'taskScript', 'taskMailer'));