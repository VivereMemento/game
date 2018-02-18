 const SpriteManager = (function () {
	class SpriteManager {
		constructor() {
			this.image = new Image();
			this.sprites = [];
			this.imgLoaded = false;
			this.jsonLoaded = false;
		}

		parseAtlas(data, resolve) {
			let atlas = data;

			for (let name in atlas.frames) {
				let frame = atlas.frames[name].frame;

				this.sprites.push({
					name: name,
					x: frame.x,
					y: frame.y,
					w: frame.w,
					h: frame.h
				})
			}
			this.jsonLoaded = true;
			resolve(this.sprites);
		}

		loadImg(imgName) {
			this.image.addEventListener('load', () => {
				this.imgLoaded = true;
			});

			this.image.src = imgName;
		}

		getSprite(name) {
			let self = this;

			for (let i = 0; i < self.sprites.length; i++) {
				let s = self.sprites[i];

				if (s.name === name) {
					return s;
				}
			}

			return null;
		}

		sendAjax(url, atlasImg) {
			let self = this;
			return new Promise(function(resolve, reject) {
				let httpReq = new XMLHttpRequest();
				httpReq.onreadystatechange = function() {
					let data;
					if (httpReq.readyState == 4) {
						if (httpReq.status == 200) {
							data = JSON.parse(httpReq.responseText);
							self.parseAtlas(data, resolve);
						} else {
							reject(new Error(httpReq.statusText));
						}
					}
				};
				httpReq.open("GET", url, true);
				httpReq.send();
				self.loadImg(atlasImg);
			});
		}
	}

	return SpriteManager;
}());

module.exports = new SpriteManager();