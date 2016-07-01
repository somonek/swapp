var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    autoprefixer = require("gulp-autoprefixer"),
    reload = browserSync.reload,
    config = {
        bowerComponentsDir: "./bower_components",
        publicDir: './public/assets'
    };

//////////////////////////////////////////////
///// Scripts Task
//////////////////////////////////////////////
gulp.task("scripts", function () {
    gulp.src([
        config.bowerComponentsDir + '/jquery/dist/jquery.js',
        config.bowerComponentsDir + '/underscore/underscore.js',
        config.bowerComponentsDir + '/backbone/backbone.js',
        config.bowerComponentsDir + '/backbone.marionette/lib/backbone.marionette.js',
        config.bowerComponentsDir + '/ejs/ejs.js',
        config.bowerComponentsDir + '/modulejs/dist/modulejs.js'
    ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/js/"));

    gulp.src([
        "src/javascripts/**/*.es6"])
        .pipe(plumber())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/js/"));
});


//////////////////////////////////////////////
///// Styles Task
//////////////////////////////////////////////
gulp.task("sass", function () {
    gulp.src("src/stylesheets/application.scss")
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/css/"))
        .pipe(reload({stream: true}))
    ;
});


//////////////////////////////////////////////
///// HTML Task
//////////////////////////////////////////////
gulp.task("html", function () {
    gulp.src("public/**/*.html");
});


//////////////////////////////////////////////
///// Browser Sync Task
//////////////////////////////////////////////
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./public/"
        }
    });
});


//////////////////////////////////////////////
///// Watch Task
//////////////////////////////////////////////
gulp.task("watch", function () {
    gulp.watch("src/javascripts/**/*.js", ['scripts']);
    gulp.watch("src/stylesheets/**/*.scss", ['sass']);
    gulp.watch("public/**/*.html", ['html']);
});


//////////////////////////////////////////////
///// Default Task
//////////////////////////////////////////////
gulp.task("default", ['scripts', 'browser-sync', 'sass', 'html', 'watch']);