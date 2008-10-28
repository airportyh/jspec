
= JSpec

  JSpec is a minimalistic JavaScript test driven development framework,
  providing both simple installation as well as usage.

== TODO

  * host it so people put uri in script tag... (from github)
  * textmate bundle
  * screencast / vision page

== Examples

  with (JSpec('shopping cart')) {                         

		before_each (function(){            
			this.cart = new Cart();
		});                                 

		it ('Should have no products to begin with', function(){      
			this.cart.products.should_equal(0);      
		});                                 

		it ('Should add products correctly', function(){      
			this.cart.addProduct('cookies');
			this.cart.addProduct('more cookies');
			this.cart.addProduct('lots of cookies!!!');
			this.cart.products.should_equal(3);
		});                                                               
	}
	
== Copyright 

	2008 TJ Holowaychuk (MIT Licensed)

