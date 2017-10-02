const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const zip = require('gulp-zip')


gulp.task('js', function () {
    return gulp.src(['jquery/jquery.js', 'jquery/jquery.fullscreen.js',
        'js/FullScreen.js', 'js/SecondManager.js',
        'js/Label.js', 'js/Differences.js',
        'js/Scene.js', 'js/StartScene.js',
        'js/GameScene.js', 'js/TimeoutScene.js',
        'js/CompleteScene.js', 'js/Audio.js',
        'js/Game.js', 'js/GameSceneDatas.js',
        'js/Main.js'])
        .pipe(concat('game.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
})

gulp.task('css', function () {
    return gulp.src('index.css')
        .pipe(cleanCSS('index.css'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('resources', function () {
    return gulp.src(['images/*', '!images/其它图片', 'mp3/**'], { base: './' })
        .pipe(gulp.dest('dist/'))
})

gulp.task('dist', ['build', 'resources'], function () {
    return gulp.src('dist/**')
        .pipe(zip('找不同.zip'))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', function () {
    gulp.watch('js/*', ['js'])
    gulp.watch('index.css', ['css'])
    gulp.watch('index.html', ['html'])
})

gulp.task('build', ['js', 'css', 'html'])
gulp.task('default', ['build', 'watch'])