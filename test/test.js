
with (JSpec('first suite')) {
	before (function(){
		console.log('before');            
	});                                 
	                                    
	before_each (function(){            
		console.log('before each');       
	});                                 
	                                    
	it ('Should pass', function(){      
		'test'.should_equal('test');      
	});                                 
	                                    
	it ('Should fail', function(){      
		'test'.should_not_equal('test');  
	});                                 
                                      
	after (function(){                  
		console.log('after');             
	});                                 
	                                    
	after_each (function(){             
		console.log('after each');        
	});                                 
}

with (JSpec('second suite')) {
	before (function(){
		console.log('before');            
	});                                 
	                                    
	before_each (function(){            
		console.log('before each');       
	});                                 
	                                    
	it ('Should pass', function(){      
		'test'.should_equal('test');      
	});                                 
	                                    
	it ('Should fail', function(){      
		'test'.should_not_equal('test');  
	});                                 
                                      
	after (function(){                  
		console.log('after');             
	});                                 
	                                    
	after_each (function(){             
		console.log('after each');        
	});                                 
}