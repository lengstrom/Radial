function update(dt) {
	var players = [player1];
	if ('player2' in window) {
		players.push(player2);
	}

	for (var i in players) {
		players[i].update(dt);
	}

	for (var i in blocks) {
		blocks[i].update(dt);
	}
}