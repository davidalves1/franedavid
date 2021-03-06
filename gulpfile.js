var gulp = require('gulp');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');

// Minificação dos arquivos .js
gulp.task('minjs', function() {
    return gulp
        // Define a origem dos arquivos .js
        .src(['./src/js/**/*'])
        // Prevençãao de erros
        .pipe(plumber())
        // Realiza minificação
        .pipe(uglify())
        // Altera a extenção do arquivo
        .pipe(concat('main.min.js'))
        // Salva os arquivos minificados na pasta de destino
        .pipe(gulp.dest('dist/js'));
});

gulp.task('stylus', function() {
    return gulp
        // Define a origem dos arquivos .styl
        .src('./src/stylus/main.styl')
        // Prevençãao de erros
        .pipe(plumber())
        // Realiza o pré-processamento para css
        .pipe(stylus())
        // Realiza a minificação do css
        .pipe(cleanCss())
        // Altera a extenção do arquivo
        .pipe(concat('style.min.css'))
        // Salva os arquivos processados na pasta de destino
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.start('default')
    gulp.watch('src/js/**/*.js', ['minjs'])
    gulp.watch('src/stylus/main.styl', ['stylus'])
});

gulp.task('default', ['minjs', 'stylus']);