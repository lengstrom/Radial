function Block(opts) {
	this.angle = 0;
	this.blockHeight = 20;
	this.iter = 5;
	this.color = '#f1c40f';
	this.angularWidth = Math.PI/5;
	this.distFromCenter = 400;
	for (var i in opts) {
		this[i] = opts[i];
	}

	this.draw = function() {
		var normalizedDist = this.distFromCenter * settings.scale;
		var normalizedHalfWidth = trueCanvas.width/2 * settings.scale;
		var normalizedHalfHeight = trueCanvas.height/2 * settings.scale;
		ctx.beginPath();
		ctx.fillStyle = '#f1c40f';
		ctx.arc(normalizedHalfWidth, normalizedHalfHeight, normalizedDist + this.blockHeight * settings.scale, this.angle + this.angularWidth/2, this.angle - this.angularWidth/2, true);
		ctx.lineTo(normalizedHalfWidth + Math.cos(this.angle - this.angularWidth/2) * normalizedDist, normalizedHalfHeight + Math.sin(this.angle - this.angularWidth/2) * normalizedDist);
		ctx.arc(normalizedHalfWidth, normalizedHalfHeight, normalizedDist, this.angle - this.angularWidth/2, this.angle + this.angularWidth/2, false);
		ctx.lineTo(normalizedHalfWidth + Math.cos(this.angle + this.angularWidth/2) * (normalizedDist + this.blockHeight * settings.scale), normalizedHalfHeight + Math.sin(this.angle + this.angularWidth/2) * (normalizedDist + this.blockHeight));
		ctx.fill();
		ctx.closePath();
	};

	this.update = function(dt) {
		this.distFromCenter -= this.iter * dt * settings.scale;
		if (this.distFromCenter * settings.scale <= settings.baseRadius * settings.scale) {
			this.distFromCenter = settings.baseRadius;
		}
	};
}