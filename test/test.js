
/**
 * Iterate values.
 */
Array.prototype.each = function(callback) {
  for (var i = 0; i < this.length; i++) {
		callback.call(this, i, this[i]);
  };
};

