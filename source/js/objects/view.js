let spriteManager = require('../sprite_manager');

const View = (function () {
	class View {
		constructor(model, controller) {
			this.model = model;
			this.controller = controller;
			this.canvas = document.querySelector('canvas');
			this.ctx = this.canvas.getContext('2d');
		}


		drawSprite(name,x, y) {

			if (!spriteManager.imgLoaded || !spriteManager.jsonLoaded) {
				setTimeout(() => {
					spriteManager.getSprite(name);	
				}, 100);
			} else {
				let sprite = spriteManager.getSprite(name);
				
				
				// if (!mapManager.isVisible(x,y,sprite.w,sprite.h)) {
				// 	return;
				// }

				// x -= mapManager.view.x;
				// y -= mapManager.view.y;

				if (sprite) {

					this.ctx.drawImage(spriteManager.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
				}
			}
		}
	}

	return View;
}());

module.exports = View;