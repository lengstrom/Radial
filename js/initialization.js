function init(a) {
	//settings global
	last = Date.now();

	window.settings = {
		baseRadius:110,
		scale:1
	};

	gameState = 2;

	// only do if restarting the first time
	if (a) {
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / framerate);
			};
		})();
		//rendering
		window.addEventListener('resize', scaleCanvas);
		canvas = document.getElementById('c');
		ctx = canvas.getContext('2d');

		//input
		document.addEventListener('keydown', function(e) {
			keys[e.keyCode] = 1;
		});

		document.addEventListener('keyup', function(e) {
			keys[e.keyCode] = 0;
		});
	}

	//rendering
	scaleCanvas();

	//input
	keys = [];

	// change later
	player1 = new Player({
		color:'#3498db'
	});

	player2 = new Player({
		angle:Math.PI,
		keyBindings:[65, 68], // a / d
		color:'#e74c3c'
	});
}


init(1);
requestAnimFrame(animLoop);