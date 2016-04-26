var bubble_pop = bubble_pop || {};

bubble_pop.Preload = function() {};

bubble_pop.Preload.prototype = {
	preload: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.refresh();
		
                /**Images**/
		this.load.image('ship',STATIC_URL+'images/ship.png');
				this.load.image('ship',STATIC_URL+'images/ship.png');
                this.load.image('ship1',STATIC_URL+'images/ship1.png');
                this.load.image('ship2',STATIC_URL+'images/ship2.png');
                this.load.image('ship3',STATIC_URL+'images/ship3.png');
                this.load.image('ship4',STATIC_URL+'images/ship4.png');
                this.load.image('ship5',STATIC_URL+'images/ship5.png');
                this.load.image('shipButton',STATIC_URL+'images/ship.png');
                this.load.image('shipButton1',STATIC_URL+'images/ship1.png');
                this.load.image('shipButton2',STATIC_URL+'images/ship2.png');
                this.load.image('shipButton3',STATIC_URL+'images/ship3.png');
                this.load.image('shipButton4',STATIC_URL+'images/ship4.png');
                this.load.image('shipButton5',STATIC_URL+'images/ship5.png');
				this.load.image('bullet',STATIC_URL+'images/bullet.png');
                this.load.image('bullet1',STATIC_URL+'images/bullet1.png');
				this.load.image('bullet2',STATIC_URL+'images/bullet2.png');
                this.load.image('bullet3',STATIC_URL+'images/bullet3.png');
				this.load.image('bullet4',STATIC_URL+'images/bullet4.png');
                this.load.image('bullet5',STATIC_URL+'images/bullet5.png');
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
                    
                    /**Animations**/
                    this.load.spritesheet('difficultyAnim', STATIC_URL+'images/difficultyAnim.png',1360/4,216);
                    this.load.spritesheet('pause_button', STATIC_URL+'images/pause.png', 30, 30);
                    this.load.spritesheet('selectArrow',STATIC_URL+'images/selectArrow.png',740/10,71);
                    /**Animations**/
                    
                /**Images**/
                
                /**Sound files**/
                this.load.audio('laser',STATIC_URL+'music/laser.mp3');
                this.load.audio('destory',STATIC_URL+'music/destory.mp3');
				this.load.audio('game1',STATIC_URL+'music/game1.mp3');
                this.load.audio('game2',STATIC_URL+'music/game2.mp3');
                this.load.audio('game3',STATIC_URL+'music/game3.mp3');
                this.load.audio('game4',STATIC_URL+'music/game4.mp3');
                this.load.audio('game5',STATIC_URL+'music/game5.mp3');
                this.load.audio('game6',STATIC_URL+'music/game6.mp3');
                this.load.audio('game7',STATIC_URL+'music/game7.mp3');
                /**Sound files**/
                
                
		//Keep the spacebar from being picked up by the website so it doesn't scroll down.
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	},
	create: function() {
		this.game.state.start('MainMenu');
                
                //Choose random song to play
                var x = Math.random()*3;
//                if(x<1){
//                    var game1 = this.add.audio('game1');
//                    game1.loopFull();
//                }
//                else if(x>=1 && x<2){
//                    var game2 = this.add.audio('game2');
//                    game2.loopFull();
//                }
//                else if(x>=2 && x <=3){
//                    var game3 = this.add.audio('game3');
//                    game3.loopFull();
//                }
//                else if(x>=3 && x<4){
//                    var game4 = this.add.audio('game4');
//                    game4.loopFull();
//                }
//                else if(x>=4 && x<5){
//                    var game5 = this.add.audio('game5');
//                    game5.loopFull();
//                }
//                else if(x>=5 && x<6){
//                    var game5 = this.add.audio('game6');
//                    game5.loopFull();
//                }
//                else{
//                    var game5 = this.add.audio('game7');
//                    game5.loopFull();
//                }
                
	}
}