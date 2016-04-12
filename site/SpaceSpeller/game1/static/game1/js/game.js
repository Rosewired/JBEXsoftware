    var bubble_pop = bubble_pop || {}

    bubble_pop.PlayGame = function() {}

    bubble_pop.PlayGame.prototype = {
            create: function() {
                    //Restart the score
                    score = 0;
                     
                     
                    //This sets how the game handles collisions, etc.
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.game.input.enabled = true;

                    //Group of bullets
                    bullets = this.game.add.group();
                    bullets.enableBody = true;
                    bullets.physicsBodyType = Phaser.Physics.ARCADE;

                    lives = []
                    lives[0] = this.game.add.sprite(10,10,'ship');
                    lives[1] = this.game.add.sprite(60,10,'ship');
                    lives[2] = this.game.add.sprite(110,10,'ship');
                    currLives = 2;

                    //Group of asteroids
                    currAsteroids = 5;
                    asteroids = this.game.add.group();
                    asteroids.enableBody = true;
                    asteroids.physicsBodyType = Phaser.Physics.ARCADE;

                    var numAst = 12;
                    //Add asteroids to the asteroid group and then set their physics properties
                    //Add word on top of the asteroid and set the word as a child of the asteroid
                    for(var k = 0; k < 1; k++) {
                          
                          this.newAsteroid();
                            /* end custom property */
                    }

                    //The anchor of a sprite is where its center is relative to the image. x=0,y=0 is the top left corner. x=1,y=1 is the bottom right corner
                    asteroids.setAll('anchor.x',.5);
                    asteroids.setAll('anchor.y',.5);
                   
                    asteroids.setAll('checkWorldBounds',true);    
                    asteroids.setAll('outOfBoundsKill',true);
                    

                    //Player
                    eSprite = this.game.add.sprite(100,100,'ship');
                    this.game.physics.arcade.enable(eSprite);
                    eSprite.body.gravity.y = 0;
                    eSprite.body.gravity.x = 0;
                    eSprite.body.collideWorldBounds = true;
                    eSprite.anchor.setTo(0.5, 0.5);

                    //This allows for arrow key input    
                    cursors = this.game.input.keyboard.createCursorKeys();

                    //Make the asteroids move by continually calling moveAsteroid()
                    this.moveAsteroid();
//                    this.game.time.events.repeat(Phaser.Timer.SECOND,numAst-numAst/3,this.newAsteroid(), this);
                    var cThis = this;
                    console.log(cThis);
                    this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 2,this.newAsteroid, cThis);
                    //fire button,
                    key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    key2.onDown.add(this.fire, this);


                    //Add pause button to top left corner
                    p_button = this.game.add.button(5, 5, 'pause_button', this.actionOnClick, this);

                    score_text = this.game.add.text(this.game.world.width/2, 5, 'Score: 0', { fontSize: '24px', fill: '#FFF' });
            },
            update: function() {
                    //Handle overlaps between members of the asteroids and bullets groups. It calls the collisionHandler method.
                    this.game.physics.arcade.collide(bullets, asteroids, this.collisionHandler, null, this);

                    /*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/
                    if (cursors.left.isDown) {
                            if(!cursors.up.isDown&&!cursors.down.isDown) {
                                    eSprite.angle = -90;
                }

                            xGlidePos = 0;
                            //  Move to the left
                            eSprite.body.velocity.x = -70-xGlideNeg;
                            xGlideNeg+=20;  
                    }
                    else if (cursors.right.isDown) {
                            if(!cursors.up.isDown&&!cursors.down.isDown) {
                                    eSprite.angle = 90;
                }
                            xGlideNeg = 0;
                            //  Move to the right
                            eSprite.body.velocity.x = 70+xGlidePos;
                            xGlidePos+=20;
                    }
                    else {
                            xGlidePos = 0;
                            xGlideNeg = 0;
                            eSprite.body.velocity.x = 0;            
                    }

                    if(cursors.up.isDown) {
                            if(!cursors.left.isDown&&!cursors.right.isDown) {
                                    eSprite.angle = 0;
                            }
                            yGlidePos = 0;

                            eSprite.body.velocity.y=-70-yGlideNeg;
                            yGlideNeg+=20;
                    }
                    else if(cursors.down.isDown) {
                            if(!cursors.left.isDown&&!cursors.right.isDown) {
                                    eSprite.angle = 180;
                            }

                            yGlideNeg = 0;
                            eSprite.body.velocity.y=70+yGlidePos;
                            yGlidePos+=20;
                    }
                    else {
                            eSprite.body.velocity.y = 0;        
                            yGlidePos = 0;
                            yGlideNeg = 0; 
                    }

            if(cursors.up.isDown&&cursors.right.isDown) {
                            eSprite.angle = 45;
                    }
            else if(cursors.right.isDown&&cursors.down.isDown) {
                            eSprite.angle = 135;
                    }
            else if(cursors.down.isDown&&cursors.left.isDown){
                            eSprite.angle = -135;
                    }
                    else if(cursors.left.isDown&&cursors.up.isDown) {
                            eSprite.angle = -45;
                    }
                    
//                    if(currAsteroids < 5)
                    
                        var newAst = asteroids.getFirstDead();
                        while(newAst !== null)
                        {
//                            newAst.text.destroy();
                            newAst.reset(0, this.game.world.randomY);
                            var rand_num = this.game.rnd.integerInRange(0, words.length-1); //Get a random index from 'words'
//words[rand_num][0]
//                            text = this.game.add.text(0, 0, words[rand_num][0],{ font: "16px Arial", fill: "#ffffff", wordWrap: true, align: "center", backgroundColor: "" });
                            newAst.text.text = words[rand_num][0];
                            newAst.number = rand_num;
                            /* Give asteroid a property for correct/misspelled word */
                            if (words[rand_num][1] === "0")
                                    newAst.isCorrect = false;
                            else
                                    newAst.isCorrect = true;
                            
                            this.moveSingleAsteroid(newAst);
                            currAsteroids++;
                            
                            //Move on to the next dead asteroid
                            newAst = asteroids.getFirstDead();
                            
                            
                            
                        }               

                    
                    /*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/

                    // Destroy dead sprites
//                    var deadBody = 0;
//                    for(var i = 0; i < asteroids.children.length; i ++) {
//                            if (!asteroids.children[i].alive)
//                                    deadBody++;
//                    }
//
//                    if (deadBody === asteroids.children.length) {
//                            this.game.state.start('GameOver');
//                    }
            },
            actionOnClick: function() { //For pause button
                    var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
                    this.game.paused = true;
                    var pausedText = this.add.text(250, 260, "Game paused.\nTap anywhere to continue.", style);
                    this.input.onDown.add(function(){ //unpause
                            pausedText.destroy();
                            this.game.paused = false;
                    }, this);
            },
            fire: function() { //Create and fire a bullet
                    //create a new bullet in the bullets group and place it at the ships position
                    var newBullet = bullets.create(eSprite.x, eSprite.y, 'bullet');
                    newBullet.anchor.setTo(0.5,1);
                    newBullet.events.onOutOfBounds.add(this.resetBullet, this);

                    newBullet.angle = eSprite.angle;

                    //Make the bullet move in the direction the ship is facing with a speed of 1000
                    this.game.physics.arcade.velocityFromAngle(eSprite.angle-90, 1000, newBullet.body.velocity);
            },
            moveAsteroid: function() { //This function moves all of the members of the asteroids group
                    for(var i = 0; i < asteroids.children.length; i ++) {
                            if(asteroids.children[i].alive === true) { 
                                    //Set direction to a random angle		
                                    this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.width, this.game.world.randomY,this.game.world.randomY,this.game.rnd.integerInRange(20,60));
//                                    this.game.physics.arcade.velocityFromAngle(this.game.rnd.integerInRange(0, 360), 50, asteroids.children[i].body.velocity);
                                    //Move forward
//                                    this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.world.randomX, this.game.world.randomY,300,5000);
                            }
                    }
            },
            moveSingleAsteroid: function(ast)
            {
                if(ast.alive === true) 
                { 
                                    //Set direction to a random angle		
//                                    this.game.physics.arcade.velocityFromAngle(this.game.rnd.integerInRange(0, 360), 50, ast.body.velocity);
                                    //Move forward
                                    this.game.physics.arcade.moveToXY(ast, this.game.width, this.game.world.randomY,this.game.rnd.integerInRange(300,400));
                }
            },
            resetBullet: function(bul) {//This is called when bullets go out of the screen. It removes any bullets not on the screen.
                    bul.kill();
            },
            collisionHandler: function(bul, ast) { //This removes a bullet and an asteroid that collide.
                    bul.kill(); //Kill the bullet
                    ast.kill(); //Kill the asteroid that got shot
                    currAsteroids--;
                    if (!ast.isCorrect){ //If user hits misspelled word, increase score
                            score+=1; 
                    score_text.text = "Score: " + score;
            text = this.game.add.text(ast.x, ast.y, words[ast.number][2], { font: "16px Arial", fill: "#ffffff", wordWrap: true, align: "center", backgroundColor: "" });

            }
            else
            {
                lives[currLives].kill();
                currLives--;
                if(currLives < 0)
                {
                       this.game.state.start('GameOver');
                }
            }
    },
            astOutOfBounds: function()
            {
                currAsteroids--;
            },
            
            newAsteroid: function()
            {
                var ast = asteroids.create(10, this.game.world.randomY, 'asteroid');

                    ast.anchor.x =.5;
                    ast.anchor.y =.5;
                   
                    ast.body.checkWorldBounds = true;    
                    ast.body.outOfBoundsKill = true;

                var rand_num = this.game.rnd.integerInRange(0, words.length-1); //Get a random index from 'words'

                text = this.game.add.text(0, 0, words[rand_num][0], { font: "16px Arial", fill: "#ffffff", wordWrap: true, align: "center", backgroundColor: "" });
                text.anchor.set(0.5);
                ast.text = ast.addChild(text); //Attach word to sprite

                ast.number = rand_num;
                /* Give asteroid a property for correct/misspelled word */
                if (words[rand_num][1] === "0")
                        ast.isCorrect = false;
                else
                        ast.isCorrect = true;
                    
                this.moveSingleAsteroid(ast);
            },
            
    };