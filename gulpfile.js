var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync"),
    autoprefixer = require("gulp-autoprefixer"),
    include = require("gulp-include"),
    gulpEjs = require('gulp-ejs-template'),
    concatCss = require("gulp-concat-css"),
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
        config.bowerComponentsDir + '/backgrid/lib/backgrid.js',
        config.bowerComponentsDir + '/backgrid-filter/backgrid-filter.js',
        config.bowerComponentsDir + '/backbone.paginator/lib/backbone.paginator.js',
        config.bowerComponentsDir + '/backgrid-paginator/backgrid-paginator.js',
        config.bowerComponentsDir + '/ejs/ejs.js',
        config.bowerComponentsDir + '/modulejs/dist/modulejs.js',
        config.bowerComponentsDir + '/Materialize/bin/materialize.js'
    ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/js/"));

    gulp.src([
        "src/javascripts/application.es6"])
        .pipe(plumber())
        .pipe(include(["js"]))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/js/"));
});

gulp.task('templates', function () {
    return gulp.src('./src/templates/**/*.ejs')
        .pipe(gulpEjs({
            moduleName: 'templates'
        }))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/js/"))
        .pipe(browserSync.stream());
});


//////////////////////////////////////////////
///// Styles Task
//////////////////////////////////////////////
gulp.task("sass", function () {
    gulp.src(
        [
            config.bowerComponentsDir + '/backgrid/lib/backgrid.css',
            config.bowerComponentsDir + '/backgrid-filter/backgrid-filter.css',
            config.bowerComponentsDir + '/backgrid-paginator/backgrid-paginator.css'
        ])
        .pipe(concatCss("vendors.css"))
        .pipe(rename({suffix: ".min"}))
        //.pipe(uglify())
        .pipe(gulp.dest("public/assets/css/"));
    
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
    gulp.watch("src/javascripts/**/*.es6", ['scripts']);
    gulp.watch("src/stylesheets/**/*.scss", ['sass']);
    gulp.watch("public/**/*.html", ['html']);
    gulp.watch("./src/templates/**/*.ejs", ['templates']);
});


//////////////////////////////////////////////
///// Default Task
//////////////////////////////////////////////
gulp.task("default", ['scripts', 'browser-sync', 'sass', 'html', 'templates', 'watch']);