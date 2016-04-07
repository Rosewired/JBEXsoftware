var bubble_pop = bubble_pop || {};

bubble_pop.MainMenu = function() {};

bubble_pop.MainMenu.prototype = {
	create: function() {
		
	},
	update: function() {
		this.game.state.start('PlayGame');
	}
}