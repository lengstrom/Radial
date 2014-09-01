function SingleGeneration(opts) {
	this.counter = 0;
	this.blocks = [];
	this.speedModifier = 1;
	var angle = Math.random() * Math.PI * 2;

	for (var i in opts) {
		this[i] = opts[i];
	}
	var num = Math.floor(Math.random() * 5 + 2);
	var angleMeasure = (Math.PI * 2)/Math.floor(Math.random() * 4 + 2);
	this.update = function(dt) {
		this.counter += dt;
		if (this.counter > 40 * this.speedModifier * (1 - .8 * ((num - 2)/6))) {
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

function WaveGen() {
	this.counter = 0;
	this.patternQueue = [];
	this.speedModifier = 1;
	this.maxSpeedTime = 200;
	this.patterns = [SingleGeneration];

	this.update = function(dt) {
		this.speedModifier = 1 - (this.counter)/(this.maxSpeedTime * 60) * .5;
		this.counter += dt;
		for (var i = 0; i < this.patternQueue.length; i++) {
			this.patternQueue[i].update(dt);
		}

		if (Math.round(this.counter) > 0) {
			this.patternQueue.push(this.findPattern());
			this.counter = -1111111111111;
		}
	};

	this.findPattern = function() {
		return new (this.patterns[Math.floor(Math.random() * this.patterns.length)])({speedModifier:this.speedModifier});
	};
}