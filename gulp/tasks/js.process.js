'use strict';

module.exports = function() {
$.gulp.task('js:process', function() {
	return $.gulp.src($.path.app)
	.pipe($.gp.sourcemaps.init())
	.pipe($.gp.browserify()).on('error', $.gp.notify.onError({ title: 'JavaScript' }))
	.pipe($.gp.babel()).on('error', $.gp.notify.onError({ title: 'JavaScript' }))
	.pipe($.gp.uglify()).on('error', $.gp.notify.onError({ title: 'JavaScript' }))
	.pipe($.gp.sourcemaps.write())
	.pipe($.gulp.dest($.config.root + '/assets/js'))
	})
};
