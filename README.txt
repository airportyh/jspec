
= JSpec

  JSpec is a minimalistic JavaScript test driven development framework,
  providing both simple installation as well as usage.

== Installation

  Simply download JSpec and include jspec.css and jspec.js in your markup.
  Alternatively you may do this directly from within the github repository
  such as (master version changes rapidly so choose a tag):

  http://github.com/visionmedia/jspec/tree/master%2Flib%2Fjspec.js?raw=true
  http://github.com/visionmedia/jspec/tree/master%2Flib%2Fjspec.css?raw=true

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
	
== TODO

	* textmate bundle
	* screencast / page on vision-media.ca
	
== Copyright 

	2008 TJ Holowaychuk (MIT Licensed)

