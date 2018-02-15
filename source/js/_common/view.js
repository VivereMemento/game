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

				tile.px = x * this.model.mapManager.tSize.x;
				tile.py = y * this.model.mapManager.tSize.y;
			}
			

			return tile;
		}

		getTileset(tileIndex) {

			for(let i = this.model.mapManager.tilesets.length - 1; i >= 0; i--) {

				if (this.model.mapManager.tilesets[i].firstgid <= tileIndex) {
					
					return this.model.mapManager.tilesets[i];
				}
			}
			return null;
		}

		draw(ctx) {

			let self = this;

			if (!this.model.mapManager.imgLoaded || !this.model.mapManager.jsonLoaded) {
				setTimeout(() => {
					this.draw(ctx);
				}, 100);
			} else {
				if (this.model.mapManager.tLayer === null) {

					for (let id = 0; id < this.model.mapManager.mapData.layers.length; id++) {
						let layer = this.model.mapManager.mapData.layers[id];

						if (layer.type === 'tilelayer') {
							this.model.mapManager.tLayer = layer;
							break;
						}
					}

					for (let i = 0; i < this.model.mapManager.tLayer.data.length; i++) {
						let tile = this.getTile(this.model.mapManager.tLayer.data[i]);

						let pX = (i % this.model.mapManager.xCount) * this.model.mapManager.tSize.x;

						let pY = Math.floor(i / this.model.mapManager.xCount) * this.model.mapManager.tSize.y;
						
						if (tile.img) {
							this.ctx.drawImage(tile.img, tile.px, tile.py, this.model.mapManager.tSize.x, this.model.mapManager.tSize.y, pX, pY, this.model.mapManager.tSize.x, this.model.mapManager.tSize.y)
						}
						
					}
				}
			}
		}
	}

	return View;
}());

module.exports = View;