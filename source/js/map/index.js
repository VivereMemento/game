let Model = require('./model');
let View = require('./view');
let Controller = require('./controller');

module.exports = function init() {
	let model = new Model();
	let controller = new Controller();
	let view = new View(model, controller);
	controller.initialize(model, view);
	controller.start();
}