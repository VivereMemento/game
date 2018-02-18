const ObjectEntity = require('./object_entity');

class Rocket extends ObjectEntity {
	constructor(name) {
		super();
		this.move_x = 0;
		this.move_y = 0;
		this.speed = 4;
	}

	draw(ctx) {
		spriteManager.drawSprite(ctx, 'rocket', this.pos_x, this_y);
	};

	update() {

	};

	onTouchEntity(obj) {

	};

	onTouchMap(idx) {

	}

	kill() {

	};
}

module.exports = Rocket;