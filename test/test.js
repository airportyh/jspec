
/**
 * Iterate values.
 */
Array.prototype.each = function(callback) {
  for (var i = 0; i < this.length; i++) {
		callback.call(this, i, this[i]);
  };
};


with (JSpec('array method .remove')) {
	
	before_each (function(){
		this.array = ['a', 'b', 'c'];
	});
	
	it ('Should remove single elements', function(){
		this.array.slice(0, 0).length.should_equal(2);
	});
	
	it ('Should remove multiple elements', function(){
		this.array.slice(0, 1).length.should_equal(1);
	});
	
}