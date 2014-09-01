function update(dt) {
	gdx = 0;
	gdy = 0;

	for (var i = 0; i < shakes.length; i++) {
		var r = shakes[i].m * settings.scale;
		gdx += Math.cos(shakes[i].a) * r;
		gdy += Math.sin(shakes[i].a) * r;

		shakes[i].m /= 2 * dt;
		if (shakes[i].m < 1) {
			shakes.splice(i, 1);
			i--;
		}
	}

	var players = [player1];
	if ('player2' in window) {
		players.push(player2);
	}

	for (var i = 0; i < players.length; i++) {
		players[i].update(dt);
	}

	for (var i = 0; i < blocks.length; i++) {
		blocks[i].update(dt);
	}
}