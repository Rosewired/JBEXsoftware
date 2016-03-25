var bubble_pop = bubble_pop || {};

bubble_pop.Over = function() {};

bubble_pop.Over.prototype = {
	create: function() {
		var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
		this.game.paused = true;
		var pausedText = this.add.text(250, 260, "Gameover. Score is " + score, style);
		
		//var restart = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//restart.onDown.add(this.playAgain, this);
	},
	update: function() {
		console.log("before");
		this.game.state.start('Game');
		console.log("after");
	}
}