let spriteManager = require('../sprite_manager');
let gameManager = require('../game_manager');

const View = (function () {
	class View {
		constructor(model, controller) {
			this.model = model;
			this.controller = controller;
			this.canvas = document.querySelector('canvas');
			this.ctx = this.canvas.getContext('2d');
		}

		isVisible(x,y,width,height) {
			if (
				x + width < this.model.view.x ||
				y + height < this.model.view.y ||
				x > this.model.view.x + this.model.view.w
				|| y > this.model.view.y + this.model.view.h
			) {
				return false;
			}

			return true;
		}

		drawSprite(name,x, y) {
			console.log(gameManager.entities);
			console.log(spriteManager.sprites);
			if (!spriteManager.imgLoaded || !spriteManager.jsonLoaded) {
				
				setTimeout(() => {
					spriteManager.getSprite(name);	
				}, 100);
			} else {
				let sprite = spriteManager.getSprite(spriteManager.sprites[13].name);
				
				if (!this.isVisible(70,70,sprite.w,sprite.h)) {
					return;
				}

				x -= this.model.view.x;
				y -= this.model.view.y;

				if (sprite) {
					this.ctx.drawImage(spriteManager.image, sprite.x, sprite.y, sprite.w, sprite.h, 70, 70, sprite.w, sprite.h);
				}
			}
		}
	}

	return View;
}());

module.exports = View;