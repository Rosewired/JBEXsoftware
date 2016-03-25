var bubble_pop = bubble_pop || {};

bubble_pop.Game = function() {};

bubble_pop.Game.prototype = {
	create: function() {
		//This sets how the game handles collisions, etc.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.input.enabled = true;

		s = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'e');
		this.game.physics.arcade.enable(s);
		s.body.velocity.y = 10;

		//Group of bullets
		bullets = this.game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Group of asteroids
		asteroids = this.game.add.group();
		asteroids.enableBody = true;
		asteroids.physicsBodyType = Phaser.Physics.ARCADE;
		
		//Add asteroids to the asteroid group and then set their physics properties
		for(var k  = 0; k < 5; k++) {
			var ast = asteroids.create(this.game.world.randomX, this.game.world.randomY, 'a');
		}
		
		//The anchor of a sprite is where its center is relative to the image. x=0,y=0 is the top left corner. x=1,y=1 is the bottom right corner
		asteroids.setAll('anchor.x',.5);
		asteroids.setAll('anchor.y',.5);
		asteroids.setAll('body.collideWorldBounds', true);

		//Player
		eSprite = this.game.add.sprite(100,100,'e');
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
		
		/* text on sprite */
		var style = { font: "16px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: eSprite.width, align: "center", backgroundColor: "" };
		
		for(var i = 0; i < asteroids.children.length; i ++) {
			text[i] = this.game.add.text(0, 0, words[i], style);
			text[i].anchor.set(0.5);
		}
		/* end text on sprite */
	},
	update: function() {
		//Attach word to sprite
		for(var i = 0; i < asteroids.children.length; i ++) {
			text[i].x = Math.floor(asteroids.children[i].x + asteroids.children[i].width/2.0 - text[i].width/2);
			text[i].y = Math.floor(asteroids.children[i].y + asteroids.children[i].height/2.0 - text[i].height/2);
		}
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
			this.game.state.start('Over', true, false);
		}
	},
	actionOnClick: function() {
		var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
		this.game.paused = true;
		var pausedText = this.add.text(250, 260, "Game paused.\nTap anywhere to continue.", style);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
		});
	},
	fire: function() { //Create and fire a bullet
		//create a new bullet in the bullets group and place it at the ships position
		var newBullet = bullets.create(eSprite.x, eSprite.y, 'b');
		newBullet.anchor.setTo(0.5,1);
		newBullet.events.onOutOfBounds.add(this.resetBullet, this);

		newBullet.angle = eSprite.angle;
		
		//Make the bullet move in the direction the ship is facing with a speed of 1000
		this.game.physics.arcade.velocityFromAngle(eSprite.angle-90, 1000, newBullet.body.velocity);
	},
	moveAsteroid: function() { //This function moves all of the members of the asteroids group
		for(var i = 0; i < asteroids.children.length; i ++) {
			if(asteroids.children[i].alive) { 
				//Point in random angle
				asteroids.children[i].angle += this.game.rnd.integerInRange(-180, 180);

				//Go forwards				
				this.game.physics.arcade.velocityFromRotation(asteroids.children[i].rotation, 50, asteroids.children[i].body.velocity);
				this.game.physics.arcade.moveToXY(asteroids.children[i], this.game.world.randomX, this.game.world.randomY,300,5000);
			}
		}
	},
	resetBullet: function(bul) { //This is called when bullets go out of the screen. It removes any bullets not on the screen.
		bul.kill();
	},
	collisionHandler: function(bul, ast) { //This removes a bullet and an asteroid that collide.
		bul.kill();
		ast.kill();
		
		score+=1; //update score
		score_text.text = "Score: " + score;
	}
}