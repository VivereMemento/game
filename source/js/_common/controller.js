// const Binder = require('./data-binding.js');

const Controller = (function () {
	class Controller {
		initialize(model, view) {
			this.model = model;
			this.view = view;
		}

		
		start() {
			this.model.sendAjax('./map.json').then(() => {
				this.view.draw();
			})
			
			
		}
	}

	return Controller;
}());

module.exports = Controller;