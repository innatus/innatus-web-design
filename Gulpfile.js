////////////////////////////////////////////////////////////////////////////////
// Gulp plugins
////////////////////////////////////////////////////////////////////////////////

const gulp             = require('gulp'),
      gulpif           = require('gulp-if'),
      csso             = require('gulp-csso'),
      sass             = require('gulp-sass'),
      clean            = require('gulp-clean'),
      babel            = require('gulp-babel'),
      concat           = require('gulp-concat'),
      rename           = require('gulp-rename'),
      uglify           = require('gulp-uglify'),
      htmlmin          = require('gulp-htmlmin'),
      plumber          = require('gulp-plumber'),
      nunjucks         = require('gulp-nunjucks'),
      sequence         = require('gulp-sequence'),
      decomment        = require('gulp-decomment'),
      removeLogs       = require('gulp-removelogs'),
      sourcemaps       = require('gulp-sourcemaps'),
      special          = require('gulp-special-html'),
      autoprefixer     = require('gulp-autoprefixer'),
      browserSync      = require('browser-sync').create(),
      stripCssComments = require('gulp-strip-css-comments');

////////////////////////////////////////////////////////////////////////////////
// Enviroment (available options: dev, prod)
////////////////////////////////////////////////////////////////////////////////

let env        = { state: 'dev' };
    env.ext    = env.state === 'prod' ? '.min' : '';
    env.isProd = Boolean(env.state === 'prod');

////////////////////////////////////////////////////////////////////////////////
// Server
////////////////////////////////////////////////////////////////////////////////

gulp.task('start_server', () => browserSync.init({
  logPrefix: 'Innatus',
  host: 'localhost',
  server: {
    baseDir: './'
  },
  browser: [
    'google chrome'
  ],
}));

////////////////////////////////////////////////////////////////////////////////
// views task
////////////////////////////////////////////////////////////////////////////////

gulp.task('html', () => gulp.src(['./build/views/*.html', '!./build/views/_*.html'])
  .pipe(nunjucks.compile(require('./build/data/texts.json')))
  .pipe(plumber())
  .pipe(htmlmin())
  .pipe(special())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
);

gulp.task('delete_views', () => gulp.src('./*.html').pipe(clean()));
gulp.task('build_views', (callback) => sequence('html')(callback));
gulp.task('watch_views', () => gulp.watch('./build/views/**/*.html', ['build_views']));

////////////////////////////////////////////////////////////////////////////////
// styles task
////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', () => gulp.src(['./build/styles/**/*.scss', '!./build/styles/**/_*.scss'])
  .pipe(plumber())
  .pipe(concat('styles.css'))
  // .pipe(gulpif(!env.isProd, sourcemaps.init(options.sourcemaps)))
  .pipe(stripCssComments())
  .pipe(autoprefixer())
  .pipe(csso())
  .pipe(sass())
  // .pipe(gulpif(!env.isProd, sourcemaps.write('')))
  .pipe(gulp.dest('./public/styles/'))
  .pipe(browserSync.stream())
);

gulp.task('delete_styles', () => gulp.src('./public/styles').pipe(clean()));
gulp.task('build_styles', (callback) => sequence('sass')(callback));
gulp.task('watch_styles', () => gulp.watch('./build/styles/**/*.scss', ['build_styles']));

////////////////////////////////////////////////////////////////////////////////
// scripts task
////////////////////////////////////////////////////////////////////////////////

gulp.task('babel', () => gulp.src(['./build/scripts/*.js', '!./build/scripts/_*.js'])
  .pipe(plumber())
  .pipe(concat('scripts.js'))
  // .pipe(gulpif(!env.isProd, sourcemaps.init(options.sourcemaps)))
  .pipe(babel({ presets: ['es2015', 'es2016', 'es2017'] }))
  .pipe(decomment())
  .pipe(uglify())
  // .pipe(gulpif(!env.isProd, sourcemaps.write('')))
  .pipe(gulp.dest('./build/scripts/temp/'))
  .pipe(browserSync.stream())
);
  
gulp.task('delete_scripts', () => gulp.src(['./build/scripts/temp', './public/scripts']).pipe(clean()));
gulp.task('build_scripts', (callback) => sequence('babel')(callback));
gulp.task('watch_scripts', () => gulp.watch('./build/scripts/**/*.js', ['build_scripts']));



////////////////////////////////////////////////////////////////////////////////
// Other tasks
////////////////////////////////////////////////////////////////////////////////

gulp.task('images', () => gulp.src('./build/images/**/*.*')
  .pipe(plumber())
  .pipe(gulp.dest('./public/images/')));

gulp.task('data', () => gulp.src('./build/data/**/*.*')
  .pipe(plumber())
  .pipe(gulp.dest('./public/data/')));

////////////////////////////////////////////////////////////////////////////////
// Watches task
////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', sequence(['watch_scripts', 'watch_styles', 'watch_views']));

////////////////////////////////////////////////////////////////////////////////
// Reset task
////////////////////////////////////////////////////////////////////////////////

gulp.task('reset_app', () => gulp.src(['./public', './*.html']).pipe(clean()));

////////////////////////////////////////////////////////////////////////////////
// Compilers
////////////////////////////////////////////////////////////////////////////////

gulp.task('server', sequence('watch', 'start_server'));
gulp.task('compile', sequence(
  'reset_app',
  ['images', 'data'],
  'build_views',
  'build_styles',
  'build_scripts'
));

gulp.task('start', sequence('compile', 'server'));