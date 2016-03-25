var bubble_pop = bubble_pop || {};

//This is what starts the game by making a new Phaser game object
bubble_pop.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

//Declare variables
var eSprite;
var asteroid;
var asteroids;
var bullet;
var bullets;
var cursors;
var key2;
var key1;
var s;
var i;
var rand;
var p_button; //pause button
var score = 0; //user's score
var score_text; //display score
var game_world = [];
var game_state = { color: "", position: 0 };
var text = [];

bubble_pop.game.state.add('Preload', bubble_pop.Preload);
bubble_pop.game.state.add('MainMenu', bubble_pop.MainMenu);
bubble_pop.game.state.add('Game', bubble_pop.Game);
bubble_pop.game.state.add('Over', bubble_pop.Over);

bubble_pop.game.state.start('Preload');