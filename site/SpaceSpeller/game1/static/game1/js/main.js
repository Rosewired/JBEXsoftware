var bubble_pop = bubble_pop || {};

//This is what starts the game by making a new Phaser game object
bubble_pop.game = new Phaser.Game($(document).width()*.9, $(document).height()*.9, Phaser.AUTO, '');

//Declare variables
var eSprite;
var asteroid;
var asteroids;
var bullet;
var bullets;
var fadeWords;
var cursors;
var key2;
var key1;
var s;
var i;
var rand;
var p_button; //pause button
var score = 0; //user's score
var score_text; //display score
var spaceSpellerBackground;
var x = 1;
var y = 1;

bubble_pop.game.state.add('Preload', bubble_pop.Preload);
bubble_pop.game.state.add('MainMenu', bubble_pop.MainMenu);
bubble_pop.game.state.add('PlayGame', bubble_pop.PlayGame);
bubble_pop.game.state.add('GameOver', bubble_pop.GameOver);

bubble_pop.game.state.start('Preload');