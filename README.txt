
= JSpec

  JSpec is a minimalistic JavaScript behavior driven development framework,
  providing simple installation, usage, and extremely low learning curve.

=== Features

  * Sexiest syntax of them all
  * Evalute or load any number of suites
  * Several helpful formatters
  * Custom formatters
  * Allows parens to be optional when using matchers ('foobar'.should_include 'foo')
  * Extremely simple matcher declaration

=== Installation

  Simply download JSpec and include JSpec.css and JSpec.js in your markup.
  A div with the id of #JSpec should be present for displaying when using
  the default formatter. 

  JSpec scripts should NOT be referenced via the <script> tag, they should be
  loaded using the exec method. Below is an example:

  ...
  <script>
	  function runSuites() {
      JSpec.exec('suite-one.js')
      JSpec.exec('suite-two.js')
    }
  </script>
  <body onLoad="runSuites()">
  ...

	To run specific suites we first load and evaluate a JSpec script,
	then run any number of specific suites, and report.
	
	...
	function runSuites() {
		JSpec.eval(JSpec.load('test.js'))
		JSpec.runSuite(JSpec.suites['Matchers']).report()
	}
	...

=== Examples

  describe 'Shopping cart'

		before each
			this.cart = new ShoppingCart
		end
		
		it 'should add products'
			this.cart.addProduct('cookie')
			this.cart.products.should_include('cookie')
			this.cart.empty.should_be_false
		end
		
	end
	
=== Matchers

  * Core
    - eql, be          ==
    - equal            ===
    - be_a, be_an      have constructor of x
    - be_at_least      >=
    - be_at_most       <=
    - be_empty         length of 0
    - be_true          == true
    - be_false         == false
    - be_type          be type of x
    - be_greater_than  >
    - be_less_than     <
    - have_length_of   length of x
    - include          include substring, array element, or hash key
    - match            string should match regexp x
    - respond_to       property x should be a function

  * jQuery
    - Coming soon
      
=== Todo

  * evaluate under different context as not to replace any JSpec methods
  * add better banner 
  * add spinner
  * add pre-processing to prevent pollution of prototypes
  * contrib for jQuery specific matchers / dom extensions
  * add match method for using other matchers within your own
  * add hooks throughout the system
  * add more formatters
  * nesting
  * mocking
  * textmate bundle
  
=== Copyright 

(The MIT License)

Copyright (c) 2008 - 2009 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


