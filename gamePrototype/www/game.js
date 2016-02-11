


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'TEST', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('e','asset/ship.png');
    game.load.image('b','asset/bullet.png');
    
//    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}
var eSprite;
var bullet;
var bullets;
var cursors;
var key;
var key1;
var i;

function create() {
     game.input.enabled = true;
    bullets = game.add.group();
    bullets.enableBody = true;
    eSprite = game.add.sprite(100,100,'e');
    
    for(i = 0; i <1; i ++)
        {
            var newBullet = bullets.create(i*10,0,'b');
            newBullet.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        newBullet.body.bounce.y = 0.7 + Math.random() * 0.2;

        }
    
    game.physics.arcade.enable(eSprite);
    cursors = game.input.keyboard.createCursorKeys();

    eSprite.body.gravity.y = 0;
    eSprite.body.gravity.x = 0;
    eSprite.body.collideWorldBounds = true;
    eSprite.anchor.setTo(0.5, 0.5);
    
    key = game.input.keyboard.addkey(Phaser.Keyboard.SPACEBAR);
    key.onDown.add(addPhaserDude,this);
    
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(addPhaserDude, this);
    
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ONE);
    


}

var xGlidePos = 0;
var xGlideNeg = 0;
var yGlidePos = 0;
var yGlideNeg = 0;
function update() {

    if (cursors.left.isDown)
    {
         if(!cursors.up.isDown&&!cursors.down.isDown)
            {
             eSprite.angle = 45;
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
             eSprite.angle = 225;
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
             eSprite.angle = 135;
            }
        
        yGlidePos = 0;
        

        eSprite.body.velocity.y=-70-yGlideNeg;
        yGlideNeg+=20;
    }
    else if(cursors.down.isDown)
        {
            
             if(!cursors.left.isDown&&!cursors.right.isDown)
            {
             eSprite.angle = -45;
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
                eSprite.angle = 180;
            }
            else if(cursors.right.isDown&&cursors.down.isDown)
            {
                eSprite.angle = 270;
            }
        else if(cursors.down.isDown&&cursors.left.isDown)
            {
                eSprite.angle = 0;
            }
    else if(cursors.left.isDown&&cursors.up.isDown)
            {
                eSprite.angle = 90;
            }

}
//
//Weapon.SingleBullet.prototype.fire = function(source)
//{
//    var x = source.x;
//    va y = source.y;
//    this.getFireExists(false).fire(x,y,0.this.bulletSpeed,0,0);
//    
//}

//var shipBullet= function(game, key)
//{
//    
//    Pahser.Sprite.call(this, game, 0,0, key);
//    this.anchor.set(.5);
//    this.checkWorldBounds = true;
//    this.outOfBoundsKill = true;
//    this.exists = false;
//    
//}
//
//    shipBullet.prototype.fire = function()
//    {
//        this.visible = true;
//    };
    

function addPhaserDude () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'b');
}

    function fire(x,y)
    {
        game.add.sprite(x,y,'b');
    }

