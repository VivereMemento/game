'use strict';

module.exports = function() {
  $.gulp.task('js:copy', function() {
    return $.gulp.src('./source/js/common/*.js', { since: $.gulp.lastRun('js:copy') })
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};