const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
  './src/css/normalize.css',
  './src/css/stylesheet.css',
  './src/css/style.css'
];

const jsFiles = [
  './src/js/main.js'
];

const styles = () => {
  return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return gulp.src(jsFiles)
    .pipe(concat('index.js'))
    .pipe(uglify({
      toplevel: 3
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
};

const clean = () => {
  return del(['build/*']);
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    tunnel: true
  });
  gulp.watch('./src/css/**/*.css', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./*.html', browserSync.reload);
};

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean,
                                gulp.parallel(styles, scripts)));

gulp.task('dev', gulp.series('build', watch));

// var less = require("gulp-less");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var minify = require("gulp-csso");
// var rename = require("gulp-rename");
// var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// var del = require("del");
// var htmlmin = require("gulp-htmlmin");
// var uglify = require("gulp-uglify");
// var server = require("browser-sync").create();
// var run = require("run-sequence");

// gulp.task("copy", function() {
//   return gulp.src([
//     "source/fonts/**/*.{woff,woff2}",
// 	"source/img/**",
// 	"source/js/**"
//   ], {
// 	  base: "source"
//   })
//   .pipe(gulp.dest("build"));
// });

// gulp.task("clean", function() {
//   return del("build");
// });

// gulp.task("style", function() {
//   gulp.src("source/less/style.less")
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest("build/css"))
// 	.pipe(minify())
// 	.pipe(rename("style.min.css"))
// 	.pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });

// gulp.task("jsmin", function () {
//   return gulp.src("build/js/*.js")
//     .pipe(uglify())
//     .pipe(rename({suffix: ".min"}))
//     .pipe(gulp.dest("build/js"));
// });

// gulp.task("htmlmin", function() {
//   return gulp.src("build/*.html")
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest("build"));
// });

// gulp.task("images", function() {
//   return gulp.src("build/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("build/img"));
// });

// gulp.task("webp", function() {
//   return gulp.src("build/img/**/*.{png,jpg}")
// 	.pipe(webp({quality: 90}))
// 	.pipe(gulp.dest("build/img"));
// });

// gulp.task("sprite", function() {
//   return gulp.src("source/img/sprite-*.svg")
//     .pipe(svgstore({
// 		inlineSvg: true
// 	}))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

// gulp.task("html", function() {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
// 	  include()
// 	  ]))
//     .pipe(gulp.dest("build"));
// });

// gulp.task("serve", function() {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });

//   gulp.watch("source/less/**/*.less", ["style"]);
//   gulp.watch("source/*.html", ["html"]);
// });

// gulp.task("build", function(done) {
//   run(
//     "clean",
//     "copy",
//     "style",
//     "jsmin",
//     "images",
//     "webp",
//     "sprite",
//     "html",
//     "htmlmin",
//     done);
// });
