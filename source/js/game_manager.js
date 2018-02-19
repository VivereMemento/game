 const GameManager = (function () {
	class GameManager {
		constructor() {
			this.factory = function (type) {
				this.type = type
			}
			this.entities = [];
		}

		initPlayer(player) {
			// console.log(player)
		}
	}

	return GameManager;
}());

module.exports = new GameManager();