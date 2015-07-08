import { moduleFor, test } from 'ember-qunit';

moduleFor('service:open-data-paris-trees-service', 'Unit | Service | open data paris trees', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('service should return 50 rows', function(assert) {
  var service = this.subject();
  var done = assert.async();

  service.getTreesList()
  .then(function(data) {
  	assert.equal(data.trees.length, 50, "service returns 50 rows");
  	done();
  });
});

test('first tree should have complete information', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList()
  .then(function(data) {
  	var tree = data.trees[0];
  	assert.ok(tree.species);
  	assert.ok(tree.age);
  	assert.ok(tree.height);
  	assert.ok(tree.circumference);
  	assert.ok(tree.address);
  	assert.ok(tree.geolocalisation.x);
  	assert.ok(tree.geolocalisation.y);

  	done();
  });
});

test('service should return sorted trees by height', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList('Height')
  .then(function(data) {
    var previousHeightValue = null;

    data.trees.forEach(function(tree) {
      if(previousHeightValue !== null) {
        assert.ok(previousHeightValue >= tree.height, 'Previous height is higher');
      }
      previousHeightValue = tree.height;
    });

    done();
  });
});

test('service should return sorted trees by age', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList('Age')
  .then(function(data) {
    var previousAgeValue = null;

    data.trees.forEach(function(tree) {
      if(previousAgeValue !== null) {
        assert.ok(previousAgeValue >= tree.age, 'Previous age is higher');
      }
      previousAgeValue = tree.age;
    });
    
    done();
  });
});

test('service should return trees with height > 100', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList('Age', 100)
  .then(function(data) {
    data.trees.forEach(function(tree) {
      assert.ok(100 < tree.height, 'Height is bigger than 100');
    });
    
    done();
  });
});

test('total number of trees should be returned', function(assert) {
  var service = this.subject();
  var done = assert.async();
  
  service.getTreesList()
  .then(function(data) {
    assert.ok(data.hits);
    done();
  });
});

