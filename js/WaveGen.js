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

function StartScreen(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	var num = 10;
	var angleMeasure = (Math.PI * 2)/num;

	for (var i in opts) {
		this[i] = opts[i];
	}

	this.update = function(dt) {
		if (this.counter == 0) {
			for (var j = .33; j < 3; j++) {
				var distFromCenter = settings.baseRadius + ((settings.baseDistFromCenter - settings.baseRadius)/3) * j
				var angle = 0;
				for (var i = 0; i < num; i++) {
					var newBlock = new Block({identity:Math.floor(j), distFromCenter:distFromCenter, angularWidth:angleMeasure, iter:0, angle:angle, color:colors[Math.floor(Math.random() * colors.length)]});
					angle += angleMeasure;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
				}
			}

			this.counter = 1;
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
	var num = Math.floor(Math.random() * 7 + 6);
	var angleMeasure = (Math.PI * 2)/num;
	this.switch = 0;
	this.speedModifier = .72;
	this.speedModifier *= (num)/(12);
	this.update = function(dt) {
		if ((this.blocks.length == 0 || (settings.baseDistFromCenter - Block.prototype.blockHeight)/(settings.baseIter * this.speedModifier) + 1 + settings.initTime >= (this.blocks[this.blocks.length - 1].distFromCenter)/(settings.baseIter * this.speedModifier) + (settings.initTime - this.blocks[this.blocks.length - 1].counter))) {
			// if (this.switch % 60 > 30) {
			// 	angle -= angleMeasure;
			// } else {
			if (this.blocks.length > 0) {
				angle = this.blocks[this.blocks.length - 1].angle + angleMeasure;
			}
			// }

			newDist = settings.baseDistFromCenter;
			if (this.blocks.length > 0) {
				newDist = this.blocks[this.blocks.length - 1].distFromCenter + Block.prototype.blockHeight;
			}

			var newBlock = new Block({distFromBlock:newDist, parent:this, angularWidth:angleMeasure, iter:settings.baseIter * this.speedModifier, angle:angle, color:colors[Math.floor(Math.random() * colors.length)]/*, peer:this.blocks[this.blocks.length - 1]*/});
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

function RandomSlowMultipleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.shouldShake = 0;
	this.openings = [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3];
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * 8 + 3);
	var angleMeasure = (Math.PI * 2)/num;
	this.speedModifier = .8; //(1.5 - (num/10));
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 100 * this.speedModifier) {
			this.shouldShake = 0;
			this.counter = 0;
			var tempAngle = Math.random() * Math.PI * 2;
			while (Math.abs(tempAngle - angle) < Math.PI/2) {
				tempAngle = Math.random() * Math.PI * 2;
			}

			angle = tempAngle;
			var numBlocksOpen = Math.floor(Math.random() * (this.openings[num]) + 1);
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
					var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * (1/6), angle:angle + i * angleMeasure, color:color, shouldShake:this.shouldShake});
					this.shouldShake = 1;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
				}
			}
		}
	};
}

function RotationAugmentation(wave) {
	this.wave = wave;
	this.cumulativeSum = 0;
	this.update = function(dt) {
		this.cumulativeSum += dt;
		for (var i = 0; i < wave.blocks.length; i++) {
			if (wave.blocks[i]) {
				if (wave.blocks[i].identity !== undefined) {
					if (wave.blocks[i].identity % 2 == 0) {
						wave.blocks[i].angle += 10 * (this.anglePerSec/60) * (Math.PI/180) * dt;
					} else {
						wave.blocks[i].angle -= 10 * (this.anglePerSec/60) * (Math.PI/180) * dt;
					}
				} else {
					wave.blocks[i].angle += Math.sin(this.cumulativeSum/20) * 20 * (this.anglePerSec/60) * (Math.PI/180) * dt * settings.scale;
				}
			}
		}
	};
}

RotationAugmentation.prototype.anglePerSec = 10;

function YAxisAugmentation(wave) {
	this.wave = wave;
	this.cumulativeSum = 0;
	this.update = function(dt) {
		this.cumulativeSum += dt;
		for (var i = 0; i < wave.blocks.length; i++) {
			if (wave.blocks[i]) {
				if (wave.blocks[0].identity !== undefined) {
					wave.blocks[i].distFromCenter += Math.sin(this.cumulativeSum/10) * (100/60) * dt * settings.scale;
				} else {
					wave.blocks[i].distFromCenter += Math.sin(this.cumulativeSum/this.heartBeatSpeedDivisor) * (this.heartBeatMagnitude/60) * dt * settings.scale;
				}
			}
		}
	};
}

YAxisAugmentation.prototype.heartBeatMagnitude = 400;
YAxisAugmentation.prototype.heartBeatSpeedDivisor = 17;

function WaveGen() {
	this.counter = 0;
	this.patternQueue = [];
	this.speedModifier = 1;
	this.maxSpeedTime = 200;
	this.patterns = [RandomSlowMultipleGeneration];
	this.augmentationQueue = [];
	this.augments = [];
	this.update = function(dt) {
		this.speedModifier = 1 - (this.counter)/(this.maxSpeedTime * 60) * .5;
		this.counter += dt;
		for (var i = 0; i < this.augmentationQueue.length; i++) {
			this.augmentationQueue[i].update(dt);
		}

		for (var i = 0; i < this.patternQueue.length; i++) {
			this.patternQueue[i].update(dt);
		}

		if (Math.round(this.counter) > 0) {
			this.patternQueue.push(this.findPattern());
			// this.augmentationQueue = [new YAxisAugmentation(this.patternQueue[0])];
			this.counter = -1111111111111;
		}
	};

	this.findPattern = function() {
		return new (this.patterns[Math.floor(Math.random() * this.patterns.length)])({speedModifier:this.speedModifier});
	};
}