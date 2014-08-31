function animLoop() {
	var now = Date.now();
	var dt = (now - last)/16.66666666666666;
	switch (gameState) {
		case 0: //main menu
			break;

		case 1: //transition from main menu to gameplay
			break;

		case 2: //gameplay
			update(dt);
			break;

		case 3: //pause
			break;

		case 4: //game end
			break;
	}

	render();
	requestAnimFrame(animLoop);
}