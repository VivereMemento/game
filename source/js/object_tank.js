const ObjectEntity = require('./object_entity');

class Tank extends ObjectEntity {
	constructor(name) {
		super();
		this.lifetime = 100;
		this.move_x = 0;
		this.move_y = 0;
		this.speed = 1;
	}

	draw(ctx) {
		spriteManager.drawSprite(ctx, 'tank1', this.pos_x, this_y);
	};

	update() {

	};

	onTouchEntity(obj) {

	};

	kill() {

	};

	fire() {

		let r = new Rocket();
		r.size_x = 32;
		r.size_y = 32;
		r.name = 'rocket';
		r.move_x = this.move_x;
		r.move_y = this.move_y;

		switch (this.move_x + 2 * this.move_y) {
			case -1:
				r.pos_x = this.pos_x - r.size_x;
				r.pos_y = this.pos_y;
				break;
			case 1:
				r.pos_x = this.pos_x + r.size_x;
				r.pos_y = this.pos_y;
				break;
			case -2:
				r.pos_x = this.pos_x;
				r.pos_y = this.pos_y - r.size_y;
				break;
			case 2:
				r.pos_x = this.pos_x;
				r.pos_y = this.pos_y + r.size_y;
				break;
			default: return;
		}
		gameManager.entities.push(r);
	}
}

let tank1 = new Tank('player1');

module.exports = tank1;