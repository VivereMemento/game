const gameManager = require('../game_manager');

const Model = (function () {
	class Model {
		constructor() {
			this.mapData = null;
			this.xCount = 0;
			this.yCount = 0;
			this.tSize = {
				x: null,
				y: null
			};
			this.mapSize = {
				x: null,
				y: null
			};
		}

		parseObjects(tilesJSON, resolve) {

			let self = this;
			self.mapData = tilesJSON;
			self.xCount = self.mapData.width;
			self.yCount = self.mapData.height;
			self.tSize.x = self.mapData.tilewidth;
			self.tSize.y = self.mapData.tileheight;
			self.mapSize.x = self.xCount * self.tSize.x;
			self.mapSize.y = self.yCount * self.tSize.y;
			

			for (let j = 0; j < this.mapData.layers.length; j++) {
				if (this.mapData.layers[j].type === 'objectgroup') {
					let entities = self.mapData.layers[j];

					for (let i = 0; i < entities.objects.length; i++) {
						let e = entities.objects[i];
						
						try {

							let obj = gameManager.factory(e.type);

							obj.name = e.name;
							obj.pos_x = e.x;
							obj.pos_y = e.y;
							obj.size_x = e.width;
							obj.size_y = e.height;

							gameManager.entities.push(obj);

							if (obj.name === 'player') {
								gameManager.initPlayer(obj);
							}

						} catch (ex) {
							console.log(`Error while creating: ${e.gid} ${e.type} ${ex}`);
						}
					}
				}
			}
			resolve(gameManager.entities);
		};

		sendAjax(url) {
			let self = this;
			return new Promise(function(resolve, reject) {
				let httpReq = new XMLHttpRequest();
				httpReq.onreadystatechange = function() {
					let data;
					if (httpReq.readyState == 4) {
						if (httpReq.status == 200) {
							data = JSON.parse(httpReq.responseText);
							self.parseObjects(data, resolve);
						} else {
							reject(new Error(httpReq.statusText));
						}
					}
				};
				httpReq.open("GET", url, true);
				httpReq.send();
			});
		}
		
	}

	return Model;
}());

module.exports = Model;