'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function () {
	  return $.gulp.src('./source/images/icons/*.png')
		  .pipe($.gp.spritesmith({
			imgName: 'sprite.png',
			cssName: '../style/_misc/_sprite.scss',
            imgPath: '../img/sprite.png',
			algorithm: 'top-down',
            padding: 5
	  }))
	  .pipe($.gulp.dest('./source/images'))
	});
};
