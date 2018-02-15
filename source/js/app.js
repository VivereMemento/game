'use strict';

let Model = require('./_common/model');
let View = require('./_common/view');
let Controller = require('./_common/controller');

window.onload = function() {
	let model = new Model();
	let controller = new Controller();
	let view = new View(model, controller);
	controller.initialize(model, view);
	controller.start();
}