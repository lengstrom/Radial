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
			while (Math.abs(tempAngle - angle) < angleMeasure * (5/6)) {
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
	this.shouldDeleteBlocks = 0;
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
				var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter, angle:this.angle + i * angleMeasure, color:color, shouldShake:this.shouldShake});
				if (this.shouldDeleteBlocks) {
					this.shouldShake = 1;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
					if (i % 2 == 0) {
						newBlock.shouldDeleteSelf = settings.baseRadius + (settings.baseDistFromCenter - settings.baseRadius) * (3/4);
					} else {
						newBlock.shouldDeleteSelf = 0;
					}
				} else {
					if (i % 2 != 0) {
						this.shouldShake = 1;
						blocks.push(newBlock);
						this.blocks.push(newBlock);
					}
				}
			}
		}
	};
}

function RandomSlowMultipleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.shouldShake = 0;
	this.openings = [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3];
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * (4) + (8));
	var angleMeasure = (Math.PI * 2)/num;
	this.speedModifier = .8;
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

function RandomFastMultipleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.shouldShake = 0;
	this.openings = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3];
	var angle = Math.random() * Math.PI * 2;
	for (var i in opts) {
		this[i] = opts[i];
	}

	var num = Math.floor(Math.random() * 4 + 6);
	var angleMeasure = (Math.PI * 2)/num;
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 55) {
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
					var newBlock = new Block({parent:this, angularWidth:angleMeasure, iter:settings.baseIter * (.9), angle:angle + i * angleMeasure, color:color, shouldShake:this.shouldShake});
					this.shouldShake = 1;
					blocks.push(newBlock);
					this.blocks.push(newBlock);
				}
			}
		}
	};
}

function RotationAugmentation(wave, opts) {
	this.wave = wave;
	this.cumulativeSum = 0;
	this.anglePerSec = 10;
	this.speed = 1 || speed;
	for (var i in opts) {
		this[i] = opts[i];
	}

	this.update = function(dt) {
		this.cumulativeSum += dt;
		for (var i = 0; i < this.wave.blocks.length; i++) {
			if (this.wave instanceof StartScreen) {
				if (this.wave.blocks[i].identity % 2 == 0) {
					this.wave.blocks[i].angle += 10 * (this.anglePerSec/60) * (Math.PI/180) * dt;
				} else {
					this.wave.blocks[i].angle -= 10 * (this.anglePerSec/60) * (Math.PI/180) * dt;
				}
			} else {
				this.wave.blocks[i].angle += Math.sin(this.cumulativeSum/20) * 20 * (this.anglePerSec/60) * (Math.PI/180) * dt * settings.scale;
			}
		}
	};
}

function SinusoidalYAxisAugmentation(wave, opts) {
	this.wave = wave;
	this.cumulativeSum = 0;
	for (var i in opts) {
		this[i] = opts[i];
	}

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

SinusoidalYAxisAugmentation.prototype.heartBeatMagnitude = 400;
SinusoidalYAxisAugmentation.prototype.heartBeatSpeedDivisor = 17;

function WaveGen() {
	this.update = function(dt) {
		if (this.shouldSwitch == -9) {
			this.loadConfig(this.configs[3]);
		} else if (this.shouldSwitch < 0) {
			this.loadConfig(this.configs[Math.floor(Math.random() * this.configs.length)]);
		}

		// this.speedModifier = 1 - (this.counter)/(this.maxSpeedTime * 60) * .5;
		for (var i = 0; i < this.augmentationQueue.length; i++) {
			this.augmentationQueue[i].update(dt);
		}

		for (var i = 0; i < this.patternQueue.length; i++) {
			this.patternQueue[i].update(dt);
		}
	};

	this.loadConfig = function(config) {
		var generator = new config[0](config.length == 3 ? config[2] : {});
		this.patternQueue.push(generator);
		if (config.length > 2) {
			this.augments.push(new (config[1])(generator));
		}
	}

	this.init = function() {
		this.shouldSwitch = -9;
		this.counter = 0;
		this.speedModifier = 1;
		this.patternQueue = [];
		this.augmentationQueue = [];
		this.maxSpeedTime = 200;
		this.configs = [
			[SpiralGeneration,RotationAugmentation], 
			[SpiralGeneration,SinusoidalYAxisAugmentation],
			[SpiralGeneration,0],
			[SingleGeneration,0],
			[DoubleGeneration,0],
			[TripleGeneration,0],
			[AlternateGeneration,0],
			[AlternateGeneration,0,{shouldDeleteBlocks:1}],
			[RandomSlowMultipleGeneration,0],
			[RandomFastMultipleGeneration,0]
		];
	}

	this.init();
}