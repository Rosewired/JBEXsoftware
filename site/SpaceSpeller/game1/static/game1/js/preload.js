var bubble_pop = bubble_pop || {};

bubble_pop.Preload = function() {};

bubble_pop.Preload.prototype = {
	preload: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.refresh();
		
		this.load.image('ship',STATIC_URL+'images/ship.png');
		this.load.image('bullet',STATIC_URL+'images/bullet.png');
		this.load.image('asteroid',STATIC_URL+'images/asteroid.png');
                this.load.image('difficulty',STATIC_URL+'images/difficultyAnim.png');
                this.load.spritesheet('difficultyAnim', STATIC_URL+'images/difficultyAnim.png',1360/4,216);
		this.load.spritesheet('pause_button', STATIC_URL+'images/pause.png', 30, 30);

		//Keep the spacebar from being picked up by the website so it doesn't scroll down.
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
}