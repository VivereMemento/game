'use strict';

let initMap = require('./map/index');
let initObjects = require('./objects/index');
let Player = require('./object_player');
let player1 = new Player('player1');


window.onload = function() {
	initMap();
	initObjects();
}