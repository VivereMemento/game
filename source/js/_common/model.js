const Model = (function () {
	class Model {
		constructor() {
			this.mapManager = {
				mapData: null,
				tLayer: null,
				xCount: 0,
				yCount: 0,
				tSize: {
					x: null,
					y: null
				},
				mapSize: {
					x: null,
					y: null
				},
				imgLoadCount: 0,
				imgLoaded: false,
				jsonLoaded: false,
				tilesets: []
			}
		}

		parseMap(tilesJSON, resolve) {
			let self = this;

			self.mapManager.mapData = tilesJSON;
			self.mapManager.xCount = self.mapManager.mapData.width;
			self.mapManager.yCount = self.mapManager.mapData.height;
			self.mapManager.tSize.x = self.mapManager.mapData.tilewidth;
			self.mapManager.tSize.y = self.mapManager.mapData.tileheight;
			self.mapManager.mapSize.x = self.mapManager.xCount * self.mapManager.xSize;
			self.mapManager.mapSize.y = self.mapManager.yCount * self.mapManager.ySize;



			for (let i = 0; i < self.mapManager.mapData.tilesets.length; i++) {
				let img = new Image();

				img.addEventListener('load', () => {
					self.mapManager.imgLoadCount++;
					
					if (self.mapManager.imgLoadCount === self.mapManager.mapData.tilesets.length) {
						self.mapManager.imgLoaded = true;
						resolve();
					}
				});

				img.src = self.mapManager.mapData.tilesets[i].image;

				let t = self.mapManager.mapData.tilesets[i];
				let ts = {
					firstgid: t.firstgid,
					image: img,
					name: t.name,
					xCount: Math.floor(t.imagewidth / self.mapManager.tSize.x),
					yCount: Math.floor(t.imageheight / self.mapManager.tSize.y)
				};
				
				self.mapManager.tilesets.push(ts);
			}

			self.mapManager.jsonLoaded = true;
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