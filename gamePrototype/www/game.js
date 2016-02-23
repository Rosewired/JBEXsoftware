


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'TEST', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('e','asset/ship.png');
    game.load.image('b','asset/bullet.png');
    game.load.image('a','asset/asteroid.png');
    
   game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}
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

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

    s = game.add.sprite(game.world.randomX, game.world.randomY, 'e');
    game.physics.arcade.enable(s);
    s.body.velocity.y = 10;
     game.input.enabled = true;
    bullets = game.add.group();
    bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
	
	asteroids = game.add.group();
	asteroids.enableBody = true;
	asteroids.physicsBodyType = Phaser.Physics.ARCADE;
	
    eSprite = game.add.sprite(100,100,'e');
    
    //This is the minumum you have to do to add a sprite to the game.

	   game.physics.arcade.enable(eSprite);
//    game.physics.arcade.enable(asteroid);
	
	for(var k  = 0; k < 10; k++)
		{
    	var ast = asteroids.create(game.world.randomX, game.world.randomY, 'a');
			moveAsteroid(ast);
		}
    
    //Enable physics on these two sprites
 
    
    cursors = game.input.keyboard.createCursorKeys();

//    asteroid.body.gravity.y = 0;
//    asteroid.body.gravity.x = 0;
//    asteroid.body.collideWorldBounds = true;
//    asteroid.anchor.setTo(0.5,0);
   

    eSprite.body.gravity.y = 0;
    eSprite.body.gravity.x = 0;
    eSprite.body.collideWorldBounds = true;
    eSprite.anchor.setTo(0.5, 0.5);
    
//	 game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
	
	
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key2.onDown.add(fire,this);
    
    
    //Here
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(addPhaserDude, this);   

    
    
    


}

var xGlidePos = 0;
var xGlideNeg = 0;
var yGlidePos = 0;
var yGlideNeg = 0;
var asteroidTime = 0;

function update() {

	game.physics.arcade.overlap(bullets, asteroids, collisionHandler, null, this);
	
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
  
	
}

function addPhaserDude () {
//    
    game.add.sprite(eSprite.x, eSprite.y, 'b');
}

    function fire()
    {
//          var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
//      var newBullet = game.add.sprite(eSprite.x, eSprite.y, 'b');
		var newBullet = bullets.create(eSprite.x, eSprite.y, 'b');
//        game.physics.arcade.enable(newBullet);
		newBullet.anchor.setTo(0.5,1);
        newBullet.angle = eSprite.angle;
//        newBullet.body.velocity.y = -50;
        newBullet.angle = eSprite.angle;
        game.physics.arcade.velocityFromAngle(eSprite.angle-90, 1000, newBullet.body.velocity);
        
    }

function moveAsteroid(asteroid)
{
	asteroid.rotation = game.physics.arcade.moveToXY(asteroid, game.world.randomX, game.world.randomY,300,5000);
	game.time.events.loop(Phaser.Timer.SECOND * 5, moveAsteroid(asteroid), this);
}

function collisionHandler(bul, ast)
{
	bul.kill();
	ast.kill();
}
