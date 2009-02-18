
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

  describe 'Shopping cart'

		before each
			this.cart = new ShoppingCart
		end
		
		it 'should add products'
			this.cart.addProduct('cookie')
			this.cart.products.should_include('cookie')
		end
		
	end
  
=== Nesting

  * evaluate under different context as not to replace any Jspec methods
  * add match method for using other matchers within your own
  * before / after / before each / after each
  * nesting
  * implementation icon / color
  * update documentation
  * split up into several js files which are packages via Rakefile
  * add hooks throughout the system
  * add license / better banner 
  * add more formatters
  * test ability to run specific suites only
  * add pre-processing to prevent pollution of prototypes
  * pre-processing so that should_be_true() can be written as should_be_true
  * contrib for jQuery specific matchers / dom extensions
  * mocking
  * textmate bundle
  
== Copyright 

  2008 - 2009 TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

