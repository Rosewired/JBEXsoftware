var game = new Phaser.Game(1000, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('e',STATIC_URL+'images/ship.png');
    
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}
var eSprite;
var bullet;
var cursors;
var key;
function create() {
    
    
    eSprite = game.add.sprite(100,100,'e');
    bullet = game.add.sprite(100,100,'b');
    bullet.visible = false;
    
//    eSprite.scale.setTo(.17,.17);
    game.physics.arcade.enable(eSprite);
    cursors = game.input.keyboard.createCursorKeys();

//    eSprite.body.bounce.y = 0.2;
    eSprite.body.gravity.y = 0;
    eSprite.body.gravity.x = 0;
    eSprite.body.collideWorldBounds = true;
    eSprite.anchor.setTo(0.5, 0.5);
    
//    key = game.input.keyboard.addkey(Phaser.Keyboard.spacebar);
//    key.onDown.fire();
//    add(this.shipBullet.fire,this.bullet);
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
    
function shipBullet(shipAngle, shipLocation)
    {
        this.angle = shipAngle;
        this.shipLocation = shipLocation;
    }

    shipBullet.prototype.fire = function()
    {
        this.visible = true;
    };
    
//function fire()
//    {
//        bullet.visible = true;    
//    }

