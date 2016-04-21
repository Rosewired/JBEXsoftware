var bubble_pop = bubble_pop || {};

bubble_pop.MainMenu = function() {};

var textMap;
var text;
var textShip;
var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
bubble_pop.MainMenu.prototype = {
	create: function() {
        //background = this.game.add.sprite(0, 0, 'map');
        //background.name = 'background';
        
        textMap = this.add.text(this.game.width/2, this.game.height*1.5/8, "Choose your map " + x, style);
        textMap.anchor.setTo(0.5, 0.5);
        //if(x == 1){
           // var textMap = this.add.text(this.game.width/1.6, this.game.height*1.5/8, "(1)", style);
            //textMap.anchor.setTo(0.5, 0.5);
        //}
       
        textShip = this.add.text(this.game.width/2, this.game.height*5/8, "Choose your ship " + y, style);
        textShip.anchor.setTo(0.5, 0.5);
       // if(y == 1){
         //   var text = this.add.text(this.game.width/1.6, this.game.height*5/8, "(1)", style);
           // text.anchor.setTo(0.5, 0.5);
        //}
        var text = this.add.text(this.game.width/2, this.game.height*7/8, "Press Space to start ", style);
        text.anchor.setTo(0.5, 0.5);
        button1 = this.game.add.button(this.game.width/4, this.game.height*3/8, 'mapButton1', this.map, this);
        button1.name = 'map';
        button1.anchor.setTo(0.5, 0.5);
        
        button2 = this.game.add.button(this.game.width/2, this.game.height*3/8, 'mapButton2', this.map2, this);
        button2.name = 'map2';
        button2.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(this.game.width*3/4, this.game.height*3/8, 'mapButton3', this.map3, this);
        button3.name = 'map3';
        button3.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(this.game.width/4, this.game.height*6/8, 'shipButton', this.ship, this);
        button3.name = 'ship';
        button3.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(this.game.width/2, this.game.height*6/8, 'shipButton1', this.ship1, this);
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
        
      x = 1; 
      textMap.text =  "Choose your map " + x;
    },
    map2: function(){
      x = 2;
      textMap.text =  "Choose your map " + x;
     
     
    },
    map3: function(){
      x = 3;
      textMap.text =  "Choose your map " + x;
     
    },
    ship: function(){
      y = 1; 
      textShip.text =  "Choose your ship " + y;
     
    },
    ship1: function(){
      y = 2;
      textShip.text =  "Choose your ship " + y;
      
    },
	update: function() {
		//this.game.state.start('PlayGame');
	}
}