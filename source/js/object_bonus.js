const ObjectEntity = require('./object_entity');

class Bonus extends ObjectEntity {

	draw(ctx) {
		spriteManager.drawSprite(ctx, 'bonus', this.pos_x, this_y);
	};

	kill() {

	};
}

let bonus1 = new Bonus('player1');

module.exports = bonus1;