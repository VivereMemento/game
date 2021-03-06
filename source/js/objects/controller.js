let spriteManager = require('../sprite_manager');
const gameManager = require('../game_manager');

const Controller = (function () {
	class Controller {
		initialize(model, view) {
			this.model = model;
			this.view = view;
		}

		
		start() {
			let self = this;
			self.model.sendAjax('./map.json').then(() => {
				spriteManager.sendAjax('./sprites.json', './assets/img/spritesheet.png').then(() => {
					this.view.drawSprite();
				});
			})
		}
	}

	return Controller;
}());

module.exports = Controller;