
= JSpec

  JSpec is a minimalistic JavaScript behavior driven development framework,
  providing simple installation, usage, and extremely low learning curve.

=== Features

  * Sexiest syntax of them all
  * Evalute or load any number of suites
  * Several helpful formatters
  * Custom formatters
  * Extremely simple matcher declaration

=== Installation

  Simply download JSpec and include jspec.css and jspec.js in your markup.
  A div with the id of #jspec should be present for displaying when using
  the default formatter. 

  JSpec scripts should NOT be referenced via the <script> tag, they should be
  loaded using the exec method. Below is an example:

  ...
  <script>
	  function runSuites() {
      Jspec.exec('suite-one.js')
      Jspec.exec('suite-two.js')
    }
  </script>
  <body onLoad="runSuites()">
  ...

=== Examples

  describe 'Shopping cart'

		before each
			this.cart = new ShoppingCart
		end
		
		it 'should add products'
			this.cart.addProduct('cookie')
			this.cart.products.should_include('cookie')
		end
		
	end
	
=== Matchers

  * Core
    - be_a, be_an
    - be_at_least
    - be_at_most
    - be_empty
    - be_false
    - be_greater_than
    - be_less_than
    - be_true
    - eql
    - equal
    - have_length_of 
    - include
    - match
    - respond_to

  * jQuery
    - Coming soon
      
=== Todo

  label:
    statement 
     break label
     continue label
  
  function.length == arity
   
  * add spinner / loading stats
  * evaluate under different context as not to replace any Jspec methods
  * add match method for using other matchers within your own
  * before / after / before each / after each / global before/after/before each etc as well
    * allow access to current suite / spec
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

