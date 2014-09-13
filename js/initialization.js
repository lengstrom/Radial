ft = 1;

function init(a, restart) {
	last = Date.now();
	cumulativeTime = 0;
	settings = {
		startTime:last,
		gravity:1,
		startRadius:110,
		baseRadius:110,
		scale:1,
		mobile:/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		initTime:20,
		baseDistFromCenter:400,
		shakeMagnitude:20 * (window.devicePixelRatio ? window.devicePixelRatio : 1),
		baseIter:5
	};
	left = false;
	right = false;
	endCt = 0;
	colors = ["#e74c3c", "#ecf0f1", "#3498db", "#db8835"];
	score = 0;
	shakes = [];
	gdx = 0;
	gdr = 0;
	gdy = 0;
	gameState = (restart ? 2 : 0);
	waveGen = new WaveGen();

	// only do if restarting the first time
	if (a) {
		document.getElementById('a').addEventListener('mousedown', function(){init(0, 1)})
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
				init(0, 1);
			} else {
				keys[e.keyCode] = 1;
			}
		});

		window.addEventListener('blur', function(e) {
			for (var i = 0; i < keys.length; i++) {
				keys[i] = 0;
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

		canvas.addEventListener('mousedown tapstart');
		document.addEventListener("mousedown", function(e) {
			console.log("touch down");
			if(e.x < trueCanvas.width/2){
				left = true;
				console.log("left");
			}
			if(e.x > trueCanvas.width/2){
				right = true;		
				console.log("right");				
			}
		});

		canvas.addEventListener("mouseup", function(e) {
			console.log("touch up");
			left = false;
			right = false;

		});
	}

	if (restart) {
		initText = 0;
		if (ft) initText = 200;
		document.getElementById('a').style.display = 'none';
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].shouldDeleteSelf = 2 * settings.baseDistFromCenter; // covering all the bases
		}
		ft = 0;
	} else {
		blocks = [];
	}

	//rendering
	scaleCanvas();

	//input
	keys = [];

	// change later
	player1 = new Player({
		color:'#3498db'
	});

	// player2 = new Player({
	// 	angle:Math.PI,
	// 	keyBindings:[65, 68, 87], // a / d
	// 	color:'#e74c3c',
	// 	numBodies:1
	// });

	blocks.push();
}


init(1);
requestAnimFrame(animLoop);

function endGame() {
	gameState = 3;
}