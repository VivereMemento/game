const View = (function () {
	class View {
		constructor(model, controller) {
			this.model = model;
			this.controller = controller;
			this.canvas = document.querySelector('canvas');
			this.ctx = this.canvas.getContext('2d');
		}

		getTile(tileIndex) {
			let tile = {
				img: null,
				px: 0,
				py: 0
			};

			let tileset = this.getTileset(tileIndex);
			

			if (tileset) {
				tile.img = tileset.image;

				let id = tileIndex - tileset.firstgid;
				
				let x = id % tileset.xCount;

				let y = Math.floor(id / tileset.xCount);

				tile.px = x * this.model.tSize.x;
				tile.py = y * this.model.tSize.y;
			}
			

			return tile;
		}

		getTileset(tileIndex) {

			for(let i = this.model.tilesets.length - 1; i >= 0; i--) {

				if (this.model.tilesets[i].firstgid <= tileIndex) {
					
					return this.model.tilesets[i];
				}
			}
			return null;
		}

		draw() {

			let self = this;
			
			if (!self.model.imgLoaded || !self.model.jsonLoaded) {
				setTimeout(() => {
					self.draw();
				}, 100);
			} else {
				if (self.model.tLayer) {

					self.canvas.setAttribute('width', self.model.mapSize.x);
					self.canvas.setAttribute('height', self.model.mapSize.y);

					for (let i = 0; i < self.model.tLayer.data.length; i++) {
						let tile = self.getTile(self.model.tLayer.data[i]);

						let pX = (i % self.model.xCount) * self.model.tSize.x;

						let pY = Math.floor(i / self.model.xCount) * self.model.tSize.y;
						
						if (tile.img) {
							self.ctx.drawImage(tile.img, tile.px, tile.py, self.model.tSize.x, self.model.tSize.y, pX, pY, self.model.tSize.x, self.model.tSize.y)
						}
						
					}
				}
			}
		}
	}

	return View;
}());

module.exports = View;