var bubble_pop = bubble_pop || {};

bubble_pop.GameOver = function() {};

bubble_pop.GameOver.prototype = {
	create: function() {
		var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
		var text = this.add.text(250, 260, "Gameover. Score is " + score +"\n\nSPACEBAR to restart.", style);
		
		var restartGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		restartGame.onDown.add(this.playAgain, this);
	},
	playAgain: function() {
		this.game.state.start('Preload', true, true);
	}
}