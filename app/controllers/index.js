import Ember from 'ember';

export default Ember.Controller.extend({
	selectedSort: '',
	minimumHeight: null,
	sorts: ['', 'height', 'age'],
	loading: false,

	reloadData: function() {
		this.set('loading', true);

		var self = this;
		this.get('trees-service').getTreesList(this.get('selectedSort'), this.get('minimumHeight'))
			.then(function(trees) {
				self.set('model', trees);
				self.set('loading', false);
			});
	},

	selectSortObserver: function() {
		this.reloadData();
	}.observes('selectedSort'),

	minimumHeightChanged: function() {
		Ember.run.debounce(this, this.reloadData, 1000);
	}.observes('minimumHeight'),
});
