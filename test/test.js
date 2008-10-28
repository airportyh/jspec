
with (JSpec('suite 1')) {
	it ('Should pass', function(){
		'foo'.should_equal('foo');
	});
	
	it ('Should fail', function(){
		'foo'.should_equal('bar');
	});
}

with (JSpec('suite 2')) {
	it ('Should fail', function(){
		'hello'.should_equal('world');
	});
	
	it ('Should fail', function(){
		v = 0;
		v.should_equal(10);
	});
	
	it ('Should fail', function(){
		v = ['a', 'b', 'c'];
		v.length.should_not_equal(3);
	});
}