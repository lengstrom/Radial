function update() {
	player1.update();
	if ('player2' in window) {
		player2.update();
	}
}