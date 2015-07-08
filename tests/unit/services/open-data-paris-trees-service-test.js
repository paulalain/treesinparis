import { moduleFor, test } from 'ember-qunit';

moduleFor('service:open-data-paris-trees-service', 'Unit | Service | open data paris trees', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('service should return 50 rows', function(assert) {
  var service = this.subject();
  var done = assert.async();

  service.getTreesList()
  .then(function(trees) {
  	assert.equal(trees.length, 50, "service returns 50 rows");
  	done();
  });
});

test('first tree should have complete information', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList()
  .then(function(trees) {
  	var tree = trees[0];
  	assert.ok(tree.species);
  	assert.ok(tree.age);
  	assert.ok(tree.height);
  	assert.ok(tree.circumference);
  	assert.ok(tree.address);
  	assert.ok(tree.geolocalisation.x);
  	assert.ok(tree.geolocalisation.y);

  	done();
  });

  assert.ok(service);
});
