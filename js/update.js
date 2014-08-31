function update(dt) {
	player1.update(dt);
	if ('player2' in window) {
		player2.update(dt);
	}
}