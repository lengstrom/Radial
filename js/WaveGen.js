function SingleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	var angle = Math.random() * Math.PI * 2;

	for (var i in opts) {
		this[i] = opts[i];
	}
	var num = Math.floor(Math.random() * 5 + 2);
	var angleMeasure = (Math.PI)/Math.floor(Math.random() * 4 + 1);
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 40 * this.speedModifier * (1 - .8 * ((num - 1)/5))) {
			this.counter = 0;
			var tempAngle = Math.random() * Math.PI * 2;
			while (Math.abs(tempAngle - angle) < angleMeasure * (3/4)) {
				tempAngle = Math.random() * Math.PI * 2;
			}

			angle = tempAngle;
			var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle, color:colors[Math.floor(Math.random() * colors.length)]});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
		}
	};
}

function DoubleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	this.shouldShake = 0;
	var angle = Math.random() * Math.PI * 2;

	for (var i in opts) {
		this[i] = opts[i];
	}
	var num = Math.floor(Math.random() * 5 + 3);
	var angleMeasure = (Math.PI * 2)/num;
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 30 * this.speedModifier * (num)/7) {
			this.shouldShake = 0;
			this.counter = 0;
			var tempAngle = Math.random() * Math.PI * 2;
			while (Math.abs(tempAngle - angle) < angleMeasure * (3/4)) {
				tempAngle = Math.random() * Math.PI * 2;
			}

			angle = tempAngle;
			var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle, color:colors[Math.floor(Math.random() * colors.length)], shouldShake:this.shouldShake});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
			this.shouldShake = 1;
			newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle + Math.PI, color:colors[Math.floor(Math.random() * colors.length)], shouldShake:this.shouldShake});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
		}
	};
}

function TripleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	this.shouldShake = 0;
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * 4 + 2) * 3;
	var angleMeasure = (Math.PI * 2)/num;
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 30 * this.speedModifier - (1 - 1 * (num + 6)/12) * 70) {
			this.shouldShake = 0;
			this.counter = 0;
			var tempAngle = Math.random() * Math.PI * 2;
			var ct = 0;
			while (Math.abs(tempAngle - angle) < angleMeasure * (3/4)) {
				ct++;
				tempAngle = Math.random() * Math.PI * 2;
			}

			angle = tempAngle;
			var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle, color:colors[Math.floor(Math.random() * colors.length)], shouldShake:this.shouldShake});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
			this.shouldShake = 1;

			newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle + (2 * Math.PI)/3, color:colors[Math.floor(Math.random() * colors.length)], shouldShake:this.shouldShake});
			blocks.push(newBlock);
			this.blocks.push(newBlock);

			newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle + 2 * ((2 * Math.PI)/3), color:colors[Math.floor(Math.random() * colors.length)], shouldShake:this.shouldShake});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
		}
	};
}

function SpiralGeneration(opts) {
	this.blocks = [];
	this.speedModifier = 1;
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var angleMeasure = Math.random() * (1/10) * Math.PI * 2 + (1/20) * Math.PI * 2;
	angle -= angleMeasure;
	this.switch = 0;
	this.speedModifier = .445;
	this.speedModifier *= ((1/10) * Math.PI * 2 + (1/20) * Math.PI * 2)/angleMeasure;
	this.update = function(dt) {
		if (this.blocks.length == 0 || (settings.baseDistFromCenter - Block.prototype.blockHeight)/(settings.baseIter * this.speedModifier) + settings.initTime + .5 >= (this.blocks[this.blocks.length - 1].distFromCenter)/(settings.baseIter * this.speedModifier) + (settings.initTime - this.blocks[this.blocks.length - 1].counter)) {
			this.switch += 1;
			if (this.switch % 60 > 30) {
				angle -= angleMeasure;
			} else {
				angle += angleMeasure
			}

			newDist = settings.baseDistFromCenter;
			if (this.blocks.length > 0) {
				newDist = this.blocks[this.blocks.length - 1].distFromCenter + Block.prototype.blockHeight;
			}

			var newBlock = new Block({distFromBlock:newDist, parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle, color:colors[Math.floor(Math.random() * colors.length)]});
			blocks.push(newBlock);
			this.blocks.push(newBlock);
		}
	};
}

function AlternateGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	this.shouldShake = 0;
	this.angle = false;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * 3 + 3) * 2;
	var angleMeasure = (Math.PI * 2)/num;

	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 60 * this.speedModifier) {
			this.shouldShake = 0;
			if (this.angle === false) {
				this.angle = Math.random() * Math.PI * 2;
			} else {
				this.angle += angleMeasure;
			}

			this.counter = 0;
			var color = colors[Math.floor(Math.random() * colors.length)];
			for (var i = 0; i < num; i++) {
				if (i % 2 == 0) {
					var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter, angle:this.angle + i * angleMeasure, color:color, shouldShake:this.shouldShake});
					this.shouldShake = 1;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
				}
			}
		}
	};
}


function RandomMultipleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.shouldShake = 0;
	this.speedModifier = 1;
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * 7 + 3);
	var angleMeasure = (Math.PI * 2)/num;
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 60 * this.speedModifier) {
			this.shouldShake = 0;
			this.counter = 0;
			var tempAngle = Math.random() * Math.PI * 2;
			while (Math.abs(tempAngle - angle) < Math.PI/2) {
				tempAngle = Math.random() * Math.PI * 2;
			}

			angle = tempAngle;
			var numBlocksOpen = Math.floor(Math.random() * (this.openings[num] + 1) + 1);
			var blocksToLeaveOpen = [];
			var blocking = 0;
			while (numBlocksOpen > 0) {
				var t = Math.floor(Math.random() * (num));
				if (blocksToLeaveOpen.indexOf(t) == -1) {
					blocksToLeaveOpen.push(t);
					numBlocksOpen--;
				}
			}
			var color = colors[Math.floor(Math.random() * colors.length)];
			for (var i = 0; i < num; i++) {
				if (blocksToLeaveOpen.indexOf(i) == -1) {
					var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter, angle:angle + i * angleMeasure, color:color, shouldShake:this.shouldShake});
					this.shouldShake = 1;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
				}
			}
		}
	};
}

function waveAugmentation(wave) {
	this.wave = wave;
	this.update = function(dt) {
		for (var i = 0; i < wave.blocks.length; i++) {
			if (blocks[i]) {
				blocks[i].angle += 2 * (Math.PI / 1111) * dt;
			}
		}
	};
}

function WaveGen() {
	this.counter = 0;
	this.patternQueue = [];
	this.speedModifier = 1;
	this.maxSpeedTime = 200;
	this.patterns = [SpiralGeneration];
	this.augments = [waveAugmentation];
	this.augmentationQueue = [];
	this.update = function(dt) {
		this.speedModifier = 1 - (this.counter)/(this.maxSpeedTime * 60) * .5;
		this.counter += dt;
		for (var i = 0; i < this.patternQueue.length; i++) {
			this.patternQueue[i].update(dt);
		}

		for (var i = 0; i < this.augmentationQueue.length; i++) {
			this.augmentationQueue[i].update(dt);
		}

		if (Math.round(this.counter) > 0) {
			this.patternQueue.push(this.findPattern());
			this.augmentationQueue.push(new (this.augments[0])(this.patternQueue[0]));
			this.counter = -1111111111111;
		}
	};

	this.findPattern = function() {
		return new (this.patterns[Math.floor(Math.random() * this.patterns.length)])({speedModifier:this.speedModifier});
	};
}