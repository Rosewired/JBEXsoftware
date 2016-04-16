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

                    //Holds the three sprites showing how many lives the user has left
                    lives = []
                    lives[0] = this.game.add.sprite(10,10,'ship');
                    lives[1] = this.game.add.sprite(60,10,'ship');
                    lives[2] = this.game.add.sprite(110,10,'ship');
                    currLives = 2;

                    //Holds ranges of asteroid speeds for the different dificulty levels. Default difficulty is 0
                    difficultyLevels = [];
                    difficultyLevels[0]={lower:10,upper:30};
                    difficultyLevels[1]={lower:31,upper:50};
                    difficultyLevels[2]={lower:51,upper:70};
                    difficultyLevels[3]={lower:71,upper:300};
                    difficulty = 0;    
                    
                    //Group of asteroids
                    asteroids = this.game.add.group();
                    asteroids.enableBody = true;
                    asteroids.physicsBodyType = Phaser.Physics.ARCADE;
                    currAsteroids = 5;//Number of asteroids currently in the game
                    
                    //Add asteroids to the asteroid group and then set their physics properties
                    //Add word on top of the asteroid and set the word as a child of the asteroid
                    for(var k = 0; k < 5; k++) {
                          
                          this.newAsteroid();
                            /* end custom property */
                    }

                    //The anchor of a sprite is where its center is relative to the image. x=0,y=0 is the top left corner. x=1,y=1 is the bottom right corner
                    asteroids.setAll('anchor.x',.5);
                    asteroids.setAll('anchor.y',.5);
                   
                    //All asteroids are killed when the leave the screen.
                    asteroids.setAll('checkWorldBounds',true);    
                    asteroids.setAll('outOfBoundsKill',true);

                    //Get the first asteroids moving
                    this.moveAsteroid();

                    //Add new asteroids every second until 10 new asteroids have been added. This is to space the asteroids out so they don't clump together
                    var cThis = this;
                    console.log(cThis);
                    this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 10,this.newAsteroid, cThis);
                  

                    //Player
                    eSprite = this.game.add.sprite(this.game.width/2,this.game.height/2,'ship');
                    this.game.physics.arcade.enable(eSprite);
                    eSprite.body.gravity.y = 0;
                    eSprite.body.gravity.x = 0;
                    eSprite.body.collideWorldBounds = true;
                    eSprite.anchor.setTo(0.5, 0.5);

                    //This allows for arrow key input    
                    cursors = this.game.input.keyboard.createCursorKeys();

                    //Bind the space bar to the fire function
                    key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    key2.onDown.add(this.fire, this);

                    score_text = this.game.add.text(this.game.world.width/2, 5, 'Score: 0', { fontSize: '24px', fill: '#FFF' });
                    score_text.anchor.x = .5;

                    //Add pause button to top left corner
                    //why does saying 'this.pauseMenu' not work
                    p_button = this.game.add.button(5, 5, 'pause_button', pauseMenu, this);
                    p_button.inputEnabled = true;
                    
                    
                    var aniTest;//The sprite representing current difficulty
                    var oldDif;
                
                    //Called once when the game is paused.
                    function pauseMenu() {
                    this.game.paused = true;
                    
                    oldDif = difficulty;//Save the currently difficulty. We will check it later to see if the difficulty changed
                    
                    var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
                    pausedText = this.add.text(this.game.width/2, this.game.height/2, "Game paused.\nTap anywhere to continue.", style);     
                    pausedText.anchor.x =.5;
                    pausedText.anchor.y =.5;
                                                    
                    aniTest = this.game.add.sprite(3*this.game.width/8,5*this.game.height/8,'difficultyAnim');
                    aniTest.scale.x = .3;
                    aniTest.scale.y = .3;
                    aniTest.anchor.x =.5;
                    aniTest.anchor.y = .5;
                 
                    aniTest.animations.frame = (difficulty);//display the current difficulty level
                    
                }
            
                //Add a listener to unpause the game
                this.game.input.onUp.add(unpause,this);
            
                    //The above listener calls this method whenever there is a mouse click, but it only runs if the game is paused
                   function unpause(event)
                   {
                     
                       if(this.game.paused === true) 
                       {
                        //Check to see if we clicked on the adjust-difficulty button by checking the position of the clck
                        if(event.x < aniTest.position.x+aniTest.width/2 && event.x > aniTest.position.x-aniTest.width/2 && event.y < aniTest.position.y + aniTest.height/2 && event.y > aniTest.position.y - aniTest.height/2)
                        {
                            difficulty = (difficulty+1)%4;
                            aniTest.animations.frame = (difficulty);   
                        }
                        else//We didn't click the adjust-difficulty button so unpause
                        {
                            pausedText.destroy();
                            aniTest.destroy();
                            this.game.paused = false;
                            
                            if(oldDif !== difficulty)//Also make the asteroid move according to the new speed if it is different than the old speed
                            {
                                this.changeAsteroidSpeed();
                            }
                        }
                        }
                   }
                    
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
                    /*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/
                   
                var newAst = asteroids.getFirstDead();
                
                //Loop until we have no more dead asteroids and respawn them all
                while(newAst !== null)
                {
                    
                    newAst.reset(0, this.game.world.randomY);
                    var rand_num = this.game.rnd.integerInRange(0, words.length-1); //Get a random index from 'words'
                    newAst.text.text = words[rand_num][0];
                    newAst.number = rand_num;
                    
                    /* Give the asteroid a new word */
                    if (words[rand_num][1] === "0")
                            newAst.isCorrect = false;
                    else
                            newAst.isCorrect = true;

                    this.moveSingleAsteroid(newAst);
                    currAsteroids++;

                    //Move on to the next dead asteroid
                    newAst = asteroids.getFirstDead();



                }               

                    


            },
           fire: function() { //Create and fire a bullet
                    //create a new bullet in the bullets group and place it at the ships position
                    
                    var newBullet = bullets.create(eSprite.x, eSprite.y, 'bullet');
                    var laser = this.add.audio('laser');
                    laser.play();
                    newBullet.anchor.setTo(0.5,1);
                    newBullet.events.onOutOfBounds.add(this.resetBullet, this);

                    newBullet.angle = eSprite.angle;

                    //Make the bullet move in the direction the ship is facing with a speed of 1000
                    this.game.physics.arcade.velocityFromAngle(eSprite.angle-90, 1000, newBullet.body.velocity);
            },
            moveAsteroid: function() { //This function moves all of the members of the asteroids group
                console.log("Difficulty is now: "+difficulty);
                    for(var i = 0; i < asteroids.children.length; i ++) {
                            if(asteroids.children[i].alive === true) { 
                                    //Set direction to a random angle		
                                    this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.width, this.game.world.randomY,this.game.world.randomY,this.game.rnd.integerInRange(difficultyLevels[difficulty].lower,difficultyLevels[difficulty].upper));
//                                    this.game.physics.arcade.velocityFromAngle(this.game.rnd.integerInRange(0, 360), 50, asteroids.children[i].body.velocity);
                                    //Move forward
//                                    this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.world.randomX, this.game.world.randomY,300,5000);
                            }
                    }
            },
             changeAsteroidSpeed: function() { //This function moves all of the members of the asteroids group
                console.log("Difficulty is now: "+difficulty);
                    for(var i = 0; i < asteroids.children.length; i ++) {
                            if(asteroids.children[i].alive === true) { 
                                this.game.physics.arcade.moveToXY(asteroids.children[i], asteroids.children[i].x,asteroids.children[i].y,this.game.rnd.integerInRange(difficultyLevels[difficulty].lower,difficultyLevels[difficulty].upper));
                            }
                    }
            },
            moveSingleAsteroid: function(ast)
            {
                if(ast.alive === true) 
                { 
                    console.log(difficulty);
                    this.game.physics.arcade.moveToXY(ast, this.game.width, this.game.world.randomY,this.game.rnd.integerInRange(difficultyLevels[difficulty].lower,difficultyLevels[difficulty].upper));
                }
            },
            resetBullet: function(bul) {//This is called when bullets go out of the screen. It removes any bullets not on the screen.
                    bul.kill();
            },
            collisionHandler: function(bul, ast) { //This removes a bullet and an asteroid that collide.
                    var destory = this.add.audio('destory');
                    destory.play();
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
                   
                    ast.checkWorldBounds = true;    
                    ast.outOfBoundsKill = true;

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