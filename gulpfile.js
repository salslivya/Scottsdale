var gulp = require('gulp');
var less = require('gulp-less'); //(преобразуем все файлы less в css)
var autoprefixer = require('gulp-autoprefixer'); //(автоматическое добавление префиксов для разных браузеров)
var concat = require('gulp-concat'); //(все файлы less, данного проекта, сохраняем в один файл rezstyle.css)
var sourcemaps = require('gulp-sourcemaps'); //(отслеживание позиции изменения less файла)
var cleancss = require('gulp-clean-css'); //(сжатие css файла)
var browserSync = require("browser-sync").create(); //(автоматическое обновление)
var reload = browserSync.reload; 
var config = {
	paths:{
		less: './less/**/*.less', // путь к файлам less
		html: './index.html' // путь к index.html
	},
	output:{
		cssname: 'rezstyle.css', // все файлы less, данного проекта, сохраняем в один файл rezstyle.css
		path: 'css' // путь к файлу css
	}
};
 
gulp.task('less', function(){
	// получаем все файлы less, инициализируем sourcemaps, компилируем less в css, объединение всех less в rezstyle.css, добавление автопрефиксов, минификация css, куда сохранять результат, синхронизация
 
	return gulp.src("./less/styles.less")
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat("rezstyle.css"))
	.pipe(autoprefixer())
	.pipe(cleancss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("./css"))
	.pipe(browserSync.stream());
});
 
gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		} 
	});
 
	// смотреть за файлами всеми less
	gulp.watch(("./less/**/*.less"), gulp.series("less"));
 
	gulp.watch("./index.html")
	.on('change', browserSync.reload);
});
 
// запуск функций less и serve
gulp.task("default", gulp.series("less", "serve"));
