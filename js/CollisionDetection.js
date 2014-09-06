function isPlayerTouchingBlock(player, block){	
	if (block != null){
	/*
	console.log("collision detection begin");
	console.log("Blocks.length" + blocks.length);
	console.log("Base Radius:" + window.settings.baseRadius);
	console.log("Player yOffset:" + player.yOffset);
	console.log("SideLength:" + player.sideLength);
	*/
	var playerHeightBottom = player.yOffset + window.settings.baseRadius;
	var playerHeightTop = playerHeightBottom + player.sideLength;

	var blockTop = block.angle + block.angularWidth/2;
	var blockBottom = block.angle - block.angularWidth/2; 
	/*
	console.log("playerHeightBottom:" + playerHeightBottom);
	console.log("playerHeightTop:" + playerHeightTop);
	console.log("block.distFromCenter:" + block.distFromCenter);
	*/

	/*@Meadow
	console.log("blockTopAngle: " + blockTop%6.28);
	console.log("blockBottomAngle: " + blockBottom%6.28);
	console.log("player.angle: " + player.angle%6.28); 
	*/
	if (block.distFromCenter >= playerHeightBottom && block.distFromCenter <= playerHeightTop
		&& player.angle%6.28 < blockTop%6.28 && player.angle%6.28 > blockBottom%6.28){
		(player.color == "#FFFFFF") ? player.color = "#000000" : player.color = "#FFFFFF";
		// console.log("HIT!");
		return true;
	}
	return false;
	}

}

function isPLayerTouchingPlayer(player1, player2) {
	var player1HeightBottom = player1.yOffset + window.settings.baseRadius;
	var player1HeightTop = player1HeightBottom + player1.sideLength;

	var player1Top = player1.angle + .5;
	var player1Bottom = player1.angle - .5;

	var player2HeightBottom = player2.yOffset + window.settings.baseRadius;
	var player2HeightTop = player2HeightBottom + player2.sideLength;

	var player2Top = player2.angle + .5;
	var player2Bottom = player2.angle - .5;

	if ((player1HeightBottom >= player2HeightBottom && player1HeightBottom <= player2HeightTop)
		|| (player2HeightBottom >= player1HeightBottom && player2HeightBottom <= player1HeightTop)){//Heights overlap one way or another
		if((player1Top >= player2Bottom && player1Top <= player2Top) 
			||(player2Top >= player1Bottom && player2Top <= player1Top)) //Angles overlap one way or another
		{
			player1.color = "#AFAFAF";
			//player2.color = "#FFAAFF";
			return true;
		} 		
	}
}

function currentlyTouching() {
	this.TouchingOtherPlayer = false;
	this.TouchingBLock = false;
}