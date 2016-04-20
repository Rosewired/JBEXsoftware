var bubble_pop = bubble_pop || {};

bubble_pop.MainMenu = function() {};



bubble_pop.MainMenu.prototype = {
	create: function() {
        //background = this.game.add.sprite(0, 0, 'map');
        //background.name = 'background';
        var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
        var text = this.add.text(250, 50, "Choose your map ", style);
        var text = this.add.text(250, 300, "Choose your ship ", style);
        button1 = this.game.add.button(100, 200, 'mapButton1', this.map, this);
        button1.name = 'map';
        button1.anchor.setTo(0.5, 0.5);
        
        button2 = this.game.add.button(350, 200, 'mapButton2', this.map2, this);
        button2.name = 'map2';
        button2.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(650, 200, 'mapButton3', this.map3, this);
        button3.name = 'map3';
        button3.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(100, 400, 'shipButton', this.ship, this);
        button3.name = 'ship';
        button3.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(350, 400, 'shipButton1', this.ship1, this);
        button3.name = 'ship1';
        button3.anchor.setTo(0.5, 0.5);
        
        var startGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		startGame.onDown.add(this.play, this);
	},
    changeMap: function(button){
        background.loadTexture(button.name);
    },
    play: function() {
		this.game.state.start('PlayGame');
	},
    map: function(){
        console.log("test3");
      x = 1;  
    },
    map2: function(){
      x = 2;  
    },
    map3: function(){
      x = 3;  
    },
    ship: function(){
      y = 1;  
    },
    ship1: function(){
      y = 2;  
    },
	update: function() {
		//this.game.state.start('PlayGame');
	}
}