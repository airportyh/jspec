
= JSpec

  JSpec is a minimalistic JavaScript behavior driven development framework,
  providing both simple installation as well as usage.

== Installation

  Simply download JSpec and include jspec.css and jspec.js in your markup.
  Alternatively you may do this directly from within the github repository
  such as (master version changes rapidly so choose a tag):

  http://github.com/visionmedia/jspec/tree/master%2Flib%2Fjspec.js?raw=true
  http://github.com/visionmedia/jspec/tree/master%2Flib%2Fjspec.css?raw=true

  NOTE: this method may be slow, and images will not display.

== Examples

  with (JSpec('shopping cart')) {                         

    before_each (function(){            
      this.cart = new Cart(); // NOTE: 'this' becomes access to an empty object used as storage
    });                                 

    it ('Should have no products to begin with', function(){      
      this.cart.products.should_equal(0); // NOTE: 'this' references anything we added during before_all or before_each
    });                                 

    it ('Should add products correctly', function(){      
      this.cart.addProduct('cookies');
      this.cart.addProduct('more cookies');
      this.cart.addProduct('lots of cookies!!!');
      this.cart.products.should_equal(3);
    });                                                               
  }
  
== TODO

  * Fix javascript error when no suites are present
  * add / test ability to run specific suites only
  * add ability to click 'passes' / 'failures' to filter
  * add selenium support (optional, research)
  * test cross browsers
  * textmate bundle
  
== Copyright 

  2008 TJ Holowaychuk (MIT Licensed)

