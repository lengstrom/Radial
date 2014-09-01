function init(a) {
	last = Date.now();
	cumulativeTime = 0;

	window.settings = {
		gravity:1,
		startRadius:110,
		baseRadius:110,
		scale:1,
		shakeMagnitude:20 * (window.devicePixelRatio ? window.devicePixelRatio : 1),
		baseIter:5
	};

	colors = ["#e74c3c", "#f1c40f", "#3498db"];
	blocks = [];
	shakes = [];
	gdx = 0;
	gdr = 0;
	gdy = 0;
	gameState = 2;
	waveGen = new WaveGen();

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
			if (e.keyCode == 13) {
				init();
			} else {
				keys[e.keyCode] = 1;
			}
		});

		window.addEventListener('blur', function(e) {
			for (var i = 0; i < keys.length; i++) {
				keys[i] = false;
			}
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
		color:'#3498db',
		numBodies:1
	});

	player2 = new Player({
		angle:Math.PI/2,
		keyBindings:[65, 68, 87], // a / d
		color:'#e74c3c',
		numBodies:1
	});

	blocks.push();
}


init(1);
requestAnimFrame(animLoop);