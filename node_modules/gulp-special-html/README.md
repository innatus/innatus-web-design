gulp-special-html
===========

Gulp extension to convert special characters to UTF-8.

    var special = require('gulp-special-html');

Example
-------
    
	gulp.src('./html/*.html')
	.pipe(special())
	.pipe(gulp.dest('./dist/')



License
-------

MIT