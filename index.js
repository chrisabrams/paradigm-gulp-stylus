var concat = require('gulp-concat'),
    nib    = require('nib'),
    path   = require('path'),
    size   = require('gulp-size'),
    stylus = require('gulp-stylus')

/*
Note: sourcemaps are funky atm so they are disabled until this funkyness is resolved
*/
module.exports = function(options) {

  var gulp = options.gulp

  gulp.task('stylus', function () {

    var cache    = (options.cache || false),
        imports  = options.imports,
        parts    = options.dest.split('/'),
        paths    = options.paths,
        src      = options.src

    var destFile = parts.pop(),
        destPath = parts.join('/')

    return gulp.src(src)
      .pipe(concat(destFile + '.styl')) // This is a temp concat (the file is not physically created); it speeds up stylus processing by ~70%.
      .pipe(stylus({
        cache: cache,
        import: imports,
        paths: paths,
        /*sourcemap: {
          basePath: 'public/css',
          inline: true,
          sourceRoot: '/'
        },*/
        use: [nib()] // This accounts for ~90% of compilation time.
      }))
      /*.pipe(sourcemaps.init({
      loadMaps: true
      }))*/
      .pipe(concat(destFile))
      /*.pipe(sourcemaps.write('./public/css', {
      includeContent: false,
      sourceRoot: '/app'
      }))*/
      .pipe(size({showFiles: true}))
      .pipe(gulp.dest(path.join(process.cwd(), destPath)))

  })

}
