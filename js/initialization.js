function init(a) {
	//settings global
	last = Date.now();

	window.settings = {
		gravity:1,
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

		window.addEventListener('blur', function(e) {
			for (var i = 0; i < keys.length; i++) {
				keys[i] = false;
			}
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
		angle:Math.PI/2,
		keyBindings:[65, 68, 87], // a / d
		color:'#e74c3c'
	});
}


init(1);
requestAnimFrame(animLoop);