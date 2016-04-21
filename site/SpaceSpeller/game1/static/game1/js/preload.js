var bubble_pop = bubble_pop || {};

bubble_pop.Preload = function() {};

bubble_pop.Preload.prototype = {
	preload: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.refresh();
		
		this.load.image('ship',STATIC_URL+'images/ship.png');
        this.load.image('ship1',STATIC_URL+'images/ship1.png');
        this.load.image('shipButton',STATIC_URL+'images/ship.png');
        this.load.image('shipButton1',STATIC_URL+'images/ship1.png');
		this.load.image('bullet',STATIC_URL+'images/bullet.png');
        this.load.image('bullet2',STATIC_URL+'images/bullet2.png');
		this.load.image('asteroid',STATIC_URL+'images/asteroid.png');
        this.load.image('asteroid1',STATIC_URL+'images/asteroid1.png');
        this.load.image('map',STATIC_URL+'images/map.jpg');
        this.load.image('map2',STATIC_URL+'images/map2.jpg');
        this.load.image('map3',STATIC_URL+'images/map3.jpg');
        this.load.image('mapButton1',STATIC_URL+'images/mapButton1.jpg');
        this.load.image('mapButton2',STATIC_URL+'images/mapButton2.jpg');
        this.load.image('mapButton3',STATIC_URL+'images/mapButton3.jpg');
                this.load.image('difficulty',STATIC_URL+'images/difficultyAnim.png');
                this.load.image('starField', STATIC_URL+'images/starField.png');
                this.load.image('quit', STATIC_URL+'images/quit.png');
                this.load.spritesheet('difficultyAnim', STATIC_URL+'images/difficultyAnim.png',1360/4,216);
		this.load.spritesheet('pause_button', STATIC_URL+'images/pause.png', 30, 30);
        this.load.audio('game1',STATIC_URL+'music/game1.mp3');
        this.load.audio('laser',STATIC_URL+'music/laser.mp3');
        this.load.audio('destory',STATIC_URL+'music/destory.mp3');
        this.load.audio('game2',STATIC_URL+'music/game2.mp3');
        this.load.audio('game3',STATIC_URL+'music/game3.mp3');
        this.load.audio('game4',STATIC_URL+'music/game4.mp3');
        this.load.audio('game5',STATIC_URL+'music/game5.mp3');
		//Keep the spacebar from being picked up by the website so it doesn't scroll down.
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	},
	create: function() {
		this.game.state.start('MainMenu');
        var x = Math.random();
        if(x<=0.2){
            var game1 = this.add.audio('game1');
            game1.play();
        }
        else if(x>0.2 && x<=0.4){
            var game2 = this.add.audio('game2');
            game2.play();
        }
        else if(x>0.4 && x <=0.6){
            var game3 = this.add.audio('game3');
            game3.play();
        }
        else if(x>0.6 && x<=0.8){
            var game4 = this.add.audio('game4');
            game4.play();
        }
        else{
            var game5 = this.add.audio('game5');
            game5.play();
        }
	}
}