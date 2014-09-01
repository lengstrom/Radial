function drawConeSectionFromCenter(cx, cy, startAngle, endAngle, blockHeight, distance, color, op) {
	if (distance <= settings.baseRadius + .00000001) {
		cx += gdx;
		cy += gdy;
	}

	if (op) ctx.globalAlpha = op;
	blockHeight *= settings.scale;
	distance *= settings.scale;

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(cx, cy, distance + blockHeight, startAngle, endAngle, 1);
	ctx.lineTo(cx + Math.cos(endAngle) * distance, cy + Math.sin(endAngle) * distance);
	ctx.arc(cx, cy, distance, endAngle, startAngle, 0);
	ctx.lineTo(cx + Math.cos(startAngle) * (distance + blockHeight), cy + Math.sin(startAngle) * (distance + blockHeight));
	ctx.fill();
	ctx.closePath();
	if (op) ctx.globalAlpha = 1;
}

function drawFilledCircle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x + gdx, y + gdy,radius * settings.scale, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}

function drawRect(x, y, sideLength, color, angle) {
	x = (x + gdx);
	y = (y + gdy);
	ctx.save();
	ctx.fillStyle = color;
	ctx.translate(x, y);
	ctx.rotate(angle);
	var sl = sideLength * settings.scale;
	ctx.fillRect(0, 0, sl, sl);
	ctx.restore();
}

function scaleCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (canvas.height > canvas.width) {
		settings.scale = (canvas.width / 800);
	} else {
		settings.scale = (canvas.height / 800);
	}

	trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};

	if (window.devicePixelRatio) {
		var cw = canvas.width;
		var ch = canvas.height;

		canvas.width = cw * window.devicePixelRatio;
		canvas.height = ch * window.devicePixelRatio;
		canvas.style.width = cw;
		canvas.style.height = ch;

		trueCanvas = {
			width: cw,
			height: ch
		};

		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}
}

function render() {
	// drawRect(300, 300, 100, "#232323", 30)
	ctx.fillStyle='#2c3e50';
	ctx.fillRect(0,0,trueCanvas.width,trueCanvas.height);
	player1.draw();
	if ('player2' in window) {
		player2.draw();
	}

	drawFilledCircle(trueCanvas.width/2, trueCanvas.height/2, settings.baseRadius + .5, '#2ecc71')
	for (var i = 0; i < blocks.length; i++) {
		console.log(blocks[i].iter);
		blocks[i].draw();
	}
	// ctx.fillStyle = '#232323';
}