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
		
		//Group of asteroids
		asteroids = this.game.add.group();
		asteroids.enableBody = true;
		asteroids.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Add asteroids to the asteroid group and then set their physics properties
		//Add word on top of the asteroid and set the word as a child of the asteroid
		for(var k = 0; k < 5; k++) {
			var ast = asteroids.create(this.game.world.randomX, this.game.world.randomY, 'asteroid');
			
			var rand_num = this.game.rnd.integerInRange(0, words.length-1); //Get a random index from 'words'
			
			text = this.game.add.text(0, 0, words[rand_num][0], { font: "16px Arial", fill: "#ffffff", wordWrap: true, align: "center", backgroundColor: "" });
			text.anchor.set(0.5);
			ast.addChild(text); //Attach word to sprite
			
			/* Give asteroid a property for correct/misspelled word */
			if (words[rand_num][1] == "0")
				ast.isCorrect = false;
			else
				ast.isCorrect = true;
			/* end custom property */
		}
		
		//The anchor of a sprite is where its center is relative to the image. x=0,y=0 is the top left corner. x=1,y=1 is the bottom right corner
		asteroids.setAll('anchor.x',.5);
		asteroids.setAll('anchor.y',.5);
		asteroids.setAll('body.collideWorldBounds', true);

		//Player
		eSprite = this.game.add.sprite(100,100,'ship');
		this.game.physics.arcade.enable(eSprite);
		eSprite.body.gravity.y = 0;
		eSprite.body.gravity.x = 0;
		eSprite.body.collideWorldBounds = true;
		eSprite.anchor.setTo(0.5, 0.5);

		//This allows for arrow key input    
		cursors = this.game.input.keyboard.createCursorKeys();

		//Make the asteroids move by continually callng moveAsteroid()
		this.game.time.events.loop(Phaser.Timer.SECOND*10, this.moveAsteroid, this);
		
		//fire button
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
		/*~~~~~~~~~~~~~~~~~Arrow keys~~~~~~~~~~~~~~~~~~~*/
		
		// Destroy dead sprites
		var deadBody = 0;
		for(var i = 0; i < asteroids.children.length; i ++) {
			if (!asteroids.children[i].alive)
				deadBody++;
		}
		
		if (deadBody == asteroids.children.length) {
			this.game.state.start('GameOver');
		}
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
			if(asteroids.children[i].alive) { 
				//Set direction to a random angle		
				this.game.physics.arcade.velocityFromAngle(this.game.rnd.integerInRange(0, 360), 50, asteroids.children[i].body.velocity);
				//Move forward
				this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.world.randomX, this.game.world.randomY,300,5000);
			}
		}
	},
	resetBullet: function(bul) { //This is called when bullets go out of the screen. It removes any bullets not on the screen.
		bul.kill();
	},
	collisionHandler: function(bul, ast) { //This removes a bullet and an asteroid that collide.
		bul.kill(); //Kill the bullet
		ast.kill(); //Kill the asteroid that got shot
		
		if (!ast.isCorrect) //If user hits misspelled word, increase score
			score+=1; 
		score_text.text = "Score: " + score;
	}
}