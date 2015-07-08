import Ember from 'ember';

export default Ember.Controller.extend({
	selectedSort: '',
	sorts: ['', 'height', 'age'],
	loading: false,

	selectSortObserver: function() {
		this.set('loading', true);

		var self = this;
		this.get('trees-service').getTreesList(this.get('selectedSort'))
			.then(function(trees) {
				self.set('model', trees);
				self.set('loading', false);
			});
	}.observes('selectedSort')
});
