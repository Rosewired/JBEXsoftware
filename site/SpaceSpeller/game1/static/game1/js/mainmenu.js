var bubble_pop = bubble_pop || {};

bubble_pop.MainMenu = function() {};

var textMap;
var text;
var textShip;
var style = { font: "28px Arial", fill: "#ffffff", align: "center"};
var selectionArrow;
bubble_pop.MainMenu.prototype = {
	create: function() {
 
        bubble_pop.MainMenu.prototype.sendShip = 'ship';
        bubble_pop.MainMenu.prototype.sendBackground = 'map';
        background = this.add.tileSprite(0, 0, $(document).width()*.9, $(document).height()*.9, "starField");
        
        textMap = this.add.text(this.game.width/2, this.game.height*.7/8, "Choose your map: Earthscape", style);
        textMap.anchor.setTo(0.5, 0.5);
        //if(x == 1){
           // var textMap = this.add.text(this.game.width/1.6, this.game.height*1.5/8, "(1)", style);
            //textMap.anchor.setTo(0.5, 0.5);
        //}
       
        textShip = this.add.text(this.game.width/2, this.game.height*4/8, "Choose your ship: Blue Ship", style);
        textShip.anchor.setTo(0.5, 0.5);
       // if(y == 1){
         //   var text = this.add.text(this.game.width/1.6, this.game.height*5/8, "(1)", style);
           // text.anchor.setTo(0.5, 0.5);
        //}
        var text = this.add.text(this.game.width/2, this.game.height*7.7/8, "Press Space to start ", style);
        text.anchor.setTo(0.5, 0.5);
        button1 = this.game.add.button(this.game.width/4, .73*this.game.height*3/8, 'mapButton1', this.map, this);
        button1.name = 'map';
        button1.anchor.setTo(0.5, 0.5);
        
        button2 = this.game.add.button(this.game.width/2, .73*this.game.height*3/8, 'mapButton2', this.map2, this);
        button2.name = 'map2';
        button2.anchor.setTo(0.5, 0.5);
        
        button3 = this.game.add.button(this.game.width*3/4, .73*this.game.height*3/8, 'mapButton3', this.map3, this);
        button3.name = 'map3';
        button3.anchor.setTo(0.5, 0.5);
        
        ship1 = this.game.add.button(this.game.width*1/7, this.game.height*5/8, 'shipButton', this.ship, this);
        ship1.name = 'ship';
        ship1.anchor.setTo(0.5, 0.5);
        
        ship2 = this.game.add.button(this.game.width*2/7, this.game.height*5/8, 'shipButton1', this.ship1, this);
        ship2.name = 'ship1';
        ship2.anchor.setTo(0.5, 0.5);
        
        ship3 = this.game.add.button(this.game.width*3/7, this.game.height*5/8, 'shipButton2', this.ship2, this);
        ship3.name = 'ship2';
        ship3.anchor.setTo(0.5, 0.5);
        
        ship4 = this.game.add.button(this.game.width*4/7, this.game.height*5/8, 'shipButton3', this.ship3, this);
        ship4.name = 'ship3';
        ship4.anchor.setTo(0.5, 0.5);
        
        ship5 = this.game.add.button(this.game.width*5/7, this.game.height*5/8, 'shipButton4', this.ship4, this);
        ship5.name = 'ship4';
        ship5.anchor.setTo(0.5, 0.5);
        
        ship6 = this.game.add.button(this.game.width*6/7, this.game.height*5/8, 'shipButton5', this.ship5, this);
        ship6.name = 'ship5';
        ship6.anchor.setTo(0.5, 0.5);
        
        selectionArrow = this.game.add.sprite(button1.position.x,button1.position.y,'selectArrow');
        selectionArrow.anchor.setTo(.5,.5);
        selectionArrow.scale.x = .5;
        selectionArrow.scale.y = .5;
        selectionArrow.animations.frame = 0;
        selectionArrow.animations.add('glow');
        selectionArrow.animations.play('glow',10,true);
        
        
        shipArrow = this.game.add.sprite(ship1.position.x,ship1.position.y,'selectArrow');
        shipArrow.anchor.setTo(.5,-2);
        shipArrow.scale.x = .5;
        shipArrow.scale.y = .5;
        shipArrow.animations.frame = 0;
        shipArrow.animations.add('glow');
        shipArrow.animations.play('glow',10,true);
        
        var startGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startGame.onDown.add(this.play, this);
        
	},
    update: function(){
      background.tilePosition.x += .2;  
    },
    changeMap: function(button){
        background.loadTexture(button.name);
    },
    play: function() {
		this.game.state.start('PlayGame',true,false,bubble_pop.MainMenu.prototype.sendShip,bubble_pop.MainMenu.prototype.sendBackground);
	},
    map: function(){
        
      bubble_pop.MainMenu.prototype.sendBackground = 'map';
      selectionArrow.position.x=button1.position.x;
      selectionArrow.position.y=button1.position.y;
      textMap.text =  "Choose your map: Earthscape";
      x = 1;
    },
    map2: function(){
      bubble_pop.MainMenu.prototype.sendBackground = 'map2';
      selectionArrow.position.x=button2.position.x;
      selectionArrow.position.y=button2.position.y;
      textMap.text =  "Choose your map: Nebula";
      x = 2;
     
    },
    map3: function(){
      bubble_pop.MainMenu.prototype.sendBackground = 'map3';
      selectionArrow.position.x=button3.position.x;
      selectionArrow.position.y=button3.position.y;
      textMap.text =  "Choose your map: Jerry's Map";
      x = 3;
    },
    ship: function(){
      y = 1; 
      shipArrow.position.x=ship1.position.x;
      shipArrow.position.y=ship1.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship';
      textShip.text =  "Choose your ship: Blue Ship";
     
    },
    ship1: function(){
      y = 2;
      shipArrow.position.x=ship2.position.x;
      shipArrow.position.y=ship2.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship1';
      textShip.text =  "Choose your ship: Red Ship";
      
    },
    ship2: function(){
      y = 3;
      shipArrow.position.x=ship3.position.x;
      shipArrow.position.y=ship3.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship2';
      textShip.text =  "Choose your ship: Green Ship";
      
    },
    ship3: function(){
      y = 4;
      shipArrow.position.x=ship4.position.x;
      shipArrow.position.y=ship4.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship3';
      textShip.text =  "Choose your ship: Orange Ship";
      
    },
    ship4: function(){
      y = 5;
      shipArrow.position.x=ship5.position.x;
      shipArrow.position.y=ship5.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship4';
      textShip.text =  "Choose your ship: Purple Ship";
      
    },
    ship5: function(){
      y = 6;
      shipArrow.position.x=ship6.position.x;
      shipArrow.position.y=ship6.position.y;
      bubble_pop.MainMenu.prototype.sendShip = 'ship5';
      textShip.text =  "Choose your ship: Yellow Ship";
      
    }
};