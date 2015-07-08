import Ember from 'ember';

export default Ember.Service.extend({
	url: 'http://opendata.paris.fr/api/records/1.0/search?dataset=les-arbres',
	rows: 50,

	buildURL: function() {
		return this.url + '&rows=' + this.rows;
	},

	ajax: function(url) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.ajax({
				url: url,
				type: 'GET',
				dataType: "json",

				// This handler is not called for cross-domain script and cross-domain JSONP requests.
				// http://api.jquery.com/jquery.ajax/
				error: function(jqXHR, status, error) {
					Ember.run(null, reject, [jqXHR, status, error]);
				},

				success: function(data) {
					Ember.run(null, resolve, data);
				}
			});
		});
	},

	getTreesList: function() {
		var self = this;
		return this.ajax(this.buildURL())
			.then(function(data) {
				return self.serializer(data);
			});
	},

	serializer: function(data) {
		var trees = [];
		data.records.forEach(function(record) {
			var tree = {};
			tree.species = record.fields.espece;
			tree.address = record.fields.adresse;
			tree.height = record.fields.hauteurenm;
			tree.circumference = record.fields.circonfere;
			tree.geolocalisation = {};
			tree.geolocalisation.x = record.fields.geo_point_2d[0];
			tree.geolocalisation.y = record.fields.geo_point_2d[1];
			tree.age = moment(record.fields.dateplanta).fromNow(true);
			trees.push(tree);
		});

		return trees;
	}

});
