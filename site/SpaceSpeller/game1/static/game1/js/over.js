var bubble_pop = bubble_pop || {};

bubble_pop.GameOver = function() {};

bubble_pop.GameOver.prototype = {
	create: function() {
            
                background = this.add.tileSprite(0, 0, $(document).width()*.9, $(document).height()*.9, "starField");
		var style = { font: "28px Arial", fill: "#ffffff", align: "center",};
		var text = this.add.text(this.game.width/2, this.game.height/2, "Gameover. Score is " + score +"\n\nSPACEBAR to restart.", style);
                text.anchor.setTo(.5,.5);
		
		this.postScore(score);
		
		var restartGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		restartGame.onDown.add(this.playAgain, this);
	},
        update: function()
        {
            background.tilePosition.x+=.2;
        },
	playAgain: function() {
		this.game.state.start('Preload', true, true);
	},
	csrfSafeMethod: function(method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	},
	postScore: function(score) {
		$(document).ready(function(){
			$.ajax({
				beforeSend: function(xhr, settings) {
					if (!((/^(GET|HEAD|OPTIONS|TRACE)$/).test(settings.type)) && !this.crossDomain) {
						xhr.setRequestHeader("X-CSRFToken", csrftoken);
					}
				},
				type: "post",
				url: "/game/newscore/",
				data: {
					userscore: score
				},
				success: function(response) {
					
				}
			})
		});
	}
}