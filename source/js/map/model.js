const Model = (function () {
	class Model {
		constructor() {
			this.mapData = null;
			this.tLayer = null;
			this.xCount = 0;
			this.yCount = 0;
			this.tSize = {
				x: null,
				y: null
			},
			this.mapSize = {
				x: null,
				y: null
			},
			this.imgLoadCount = 0;
			this.imgLoaded = false;
			this.jsonLoaded = false;
			this.tilesets = [];
			this.view = {
				x: 0,
				y: 0,
				w: 0,
				h: 0
			}
		}

		parseMap(tilesJSON, resolve) {
			let self = this;

			self.mapData = tilesJSON;
			self.xCount = self.mapData.width;
			self.yCount = self.mapData.height;
			self.tSize.x = self.mapData.tilewidth;
			self.tSize.y = self.mapData.tileheight;
			self.mapSize.x = self.xCount * self.tSize.x;
			self.mapSize.y = self.yCount * self.tSize.y;
			self.view.w = self.mapSize.x;
			self.view.h = self.mapSize.y;



			for (let i = 0; i < self.mapData.tilesets.length; i++) {
				let img = new Image();

				img.addEventListener('load', () => {
					self.imgLoadCount++;
					
					if (self.imgLoadCount === self.mapData.tilesets.length) {
						self.imgLoaded = true;
						resolve();
					}
				});

				img.src = self.mapData.tilesets[i].image;

				let t = self.mapData.tilesets[i];
				let ts = {
					firstgid: t.firstgid,
					image: img,
					name: t.name,
					xCount: Math.floor(t.imagewidth / self.tSize.x),
					yCount: Math.floor(t.imageheight / self.tSize.y)
				};
				
				self.tilesets.push(ts);
			}

			for (let id = 0; id < self.mapData.layers.length; id++) {
				let layer = self.mapData.layers[id];

				if (layer.type === 'tilelayer') {
					self.tLayer = layer;
				}
			}

			self.jsonLoaded = true;
		}

		sendAjax(url) {
			let self = this;
			return new Promise(function(resolve, reject) {
				let httpReq = new XMLHttpRequest();
				httpReq.onreadystatechange = function() {
					let data;
					if (httpReq.readyState == 4) {
						if (httpReq.status == 200) {
							data = JSON.parse(httpReq.responseText);
								self.parseMap(data, resolve);
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