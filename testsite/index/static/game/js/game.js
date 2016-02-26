

//This is what starts the game by making a new Phaser game object
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'TEST', { preload: preload, create: create, update: update });

//This function loads all of the images used in the game ahead of time. It assigns each of them a tag which you can use to reference it.
function preload() {
    game.load.image('e',STATIC_URL+'images/ship.png');
    game.load.image('b',STATIC_URL+'images/bullet.png');
    game.load.image('a',STATIC_URL+'images/asteroid.png');
	game.load.spritesheet('pause_button', STATIC_URL+'images/pause.png', 30, 30);
    

//Keep the spacebar from being picked up by the website so it doesn't scroll down.
	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}

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

//This function is where we create all of our sprites, start up processes, etc.
function create() {

	//This sets how the game handles collisions, etc.
	game.physics.startSystem(Phaser.Physics.ARCADE);
     game.input.enabled = true;


    s = game.add.sprite(game.world.randomX, game.world.randomY, 'e');
    game.physics.arcade.enable(s);
    s.body.velocity.y = 10;

	//Group of bullets
    bullets = game.add.group();
    bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	//Group of asteroids
	asteroids = game.add.group();
	asteroids.enableBody = true;
	asteroids.physicsBodyType = Phaser.Physics.ARCADE;
	
	//Add asteroids to the asteroid group and then set their physics properties
	for(var k  = 0; k < 5; k++)
	{
    	var ast = asteroids.create(game.world.randomX, game.world.randomY, 'a');
		 
	}
    
	//The anchor of a sprite is where its center is relative to the image. x=0,y=0 is the top left corner. x=1,y=1 is the bottom right corner
	asteroids.setAll('anchor.x',.5);
	asteroids.setAll('anchor.y',.5);
	asteroids.setAll('body.collideWorldBounds', true);
		

	//Player
    eSprite = game.add.sprite(100,100,'e');
    game.physics.arcade.enable(eSprite);
    eSprite.body.gravity.y = 0;
    eSprite.body.gravity.x = 0;
    eSprite.body.collideWorldBounds = true;
    eSprite.anchor.setTo(0.5, 0.5);

	
	//This allows for arrow key input    
    cursors = game.input.keyboard.createCursorKeys();

	//Make the asteroids move by continually callng moveAsteroid()
	 game.time.events.loop(Phaser.Timer.SECOND*10, 
moveAsteroid, this);
	
	//fire button
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key2.onDown.add(fire, this);
    
    
	//this button creates a non moving bullet
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(addPhaserDude,this);   

    
    this.rand = new Phaser.RandomDataGenerator();

	//Add pause button to top left corner
	this.p_button = game.add.button(game.world.x, game.world.y, 'pause_button', actionOnClick, this);
}

/* functions for pause button */
function actionOnClick() {
	var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
	this.game.paused = true;
    var pausedText = this.add.text(250, 260, "Game paused.\nTap anywhere to continue.", style);
    this.input.onDown.add(function(){
        pausedText.destroy();
        this.game.paused = false;
    });
}
/* end pause button */


var xGlidePos = 0;
var xGlideNeg = 0;
var yGlidePos = 0;
var yGlideNeg = 0;
var asteroidTime = 0;

function update() {

	//Handle overlaps between members of the asteroids and bullets groups. It calls the collisionHandler method.
	game.physics.arcade.overlap(bullets, asteroids, collisionHandler, null, this);

/*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/	
    if (cursors.left.isDown)
    {
         if(!cursors.up.isDown&&!cursors.down.isDown)
            {
             eSprite.angle = -90;
            }
        
        xGlidePos = 0;
        //  Move to the left
        eSprite.body.velocity.x = -70-xGlideNeg;
        xGlideNeg+=20;  
    
    }
    else if (cursors.right.isDown)
    {
        if(!cursors.up.isDown&&!cursors.down.isDown)
            {
             eSprite.angle = 90;
				 //225;
            }
        xGlideNeg = 0;
        //  Move to the right
        eSprite.body.velocity.x = 70+xGlidePos;
        xGlidePos+=20;

    
    }
    else
        {
         xGlidePos = 0;
            xGlideNeg = 0;
                    eSprite.body.velocity.x = 0;            
        }
    
    if(cursors.up.isDown)
    {
         if(!cursors.left.isDown&&!cursors.right.isDown)
            {
             eSprite.angle = 0;
				 //135;
            }
        
        yGlidePos = 0;
        

        eSprite.body.velocity.y=-70-yGlideNeg;
        yGlideNeg+=20;
    }
    else if(cursors.down.isDown)
        {
            
             if(!cursors.left.isDown&&!cursors.right.isDown)
            {
             eSprite.angle = 180;
            }
            
            yGlideNeg = 0;
            eSprite.body.velocity.y=70+yGlidePos;
            yGlidePos+=20;
        }
    else
        {
   
            eSprite.body.velocity.y = 0;        
           yGlidePos = 0;
            yGlideNeg = 0;
            
        }
    
        if(cursors.up.isDown&&cursors.right.isDown)
            {
                eSprite.angle = 45;
            }
            else if(cursors.right.isDown&&cursors.down.isDown)
            {
                eSprite.angle = 135;
            }
        else if(cursors.down.isDown&&cursors.left.isDown)
            {
                eSprite.angle = -135;
            }
    else if(cursors.left.isDown&&cursors.up.isDown)
            {
                eSprite.angle = -45;
            } 
/*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/
  
	
}


//this is the function that is called to make a non moving bullet. Doesn't really do anything.
function addPhaserDude () {
    game.add.sprite(eSprite.x, eSprite.y, 'b');
}

//Create and fire a bullet
    function fire()
    {
		//create a new bullet in the bullets group and place it at the ships position
		var newBullet = bullets.create(eSprite.x, eSprite.y, 'b');
		newBullet.anchor.setTo(0.5,1);
		newBullet.events.onOutOfBounds.add(resetBullet, this);

        newBullet.angle = eSprite.angle;
	
	//Make the bullet move in the direction the ship is facing with a speed of 1000
        game.physics.arcade.velocityFromAngle(eSprite.angle-90, 1000, newBullet.body.velocity);
        
    }

//This function moves all of the members of the asteroids group
function moveAsteroid()
{
	
	for(var i = 0; i < asteroids.children.length; i ++)
		{
			if(asteroids.children[i].alive)
				{ 
					//Point in random angle
					asteroids.children[i].angle += game.rnd.integerInRange(-180, 180);

	//Go forwards				
	game.physics.arcade.velocityFromRotation(asteroids.children[i].rotation, 50, asteroids.children[i].body.velocity);
	game.physics.arcade.moveToXY(asteroids.childen[i], game.world.randomX, game.world.randomY,300,5000);
		}
		}

}

//This is called when bullets go out of the screen. It removes any bullets not on the screen.
function resetBullet (bul)
{
	bul.kill();
}

//This removes a bullet and an asteroid that collide.
function collisionHandler(bul, ast)
{
	bul.kill();
	ast.kill();
}
