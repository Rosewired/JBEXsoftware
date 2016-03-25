var bubble_pop = bubble_pop || {};

bubble_pop.Preload = function() {};

bubble_pop.Preload.prototype = {
	preload: function() {
		this.load.image('e',STATIC_URL+'images/ship.png');
		this.load.image('b',STATIC_URL+'images/bullet.png');
		this.load.image('a',STATIC_URL+'images/asteroid.png');
		this.load.spritesheet('pause_button', STATIC_URL+'images/pause.png', 30, 30);

		//Keep the spacebar from being picked up by the website so it doesn't scroll down.
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
}