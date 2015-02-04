var concat = require('gulp-concat'),
    nib    = require('nib'),
    path   = require('path'),
    stylus = require('gulp-stylus')

/*
Note: sourcemaps are funky atm so they are disabled until this funkyness is resolved
*/
module.exports = (options) => {

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
      .pipe(stylus({
        cache: cache,
        import: imports,
        paths: paths,
        /*sourcemap: {
          basePath: 'public/css',
          inline: true,
          sourceRoot: '/'
        },*/
        use: [nib()]
      }))
      /*.pipe(sourcemaps.init({
      loadMaps: true
      }))*/
      .pipe(concat(destFile))
      /*.pipe(sourcemaps.write('./public/css', {
      includeContent: false,
      sourceRoot: '/app'
      }))*/
      .pipe(gulp.dest(path.join(process.cwd(), destPath)))

  })

}
