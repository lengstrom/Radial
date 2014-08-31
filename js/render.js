function drawFilledCircle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x * settings.scale, y * settings.scale,radius * settings.scale, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
}

function drawRect(x, y, sideLength, color, angle) {
	x *= settings.scale;
	y *= settings.scale;
	sideLength *= settings.scale;
	ctx.save();
	ctx.fillStyle = color;
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.fillRect(0, 0, sideLength, sideLength);
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
	ctx.fillRect(0,0,trueCanvas.width * settings.scale,trueCanvas.height * settings.scale);
	player1.draw();
	if ('player2' in window) {
		player2.draw();
	}

	drawFilledCircle(trueCanvas.width/2, trueCanvas.height/2, settings.baseRadius, '#2ecc71')
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].draw();
	}
	// ctx.fillStyle = '#232323';
}