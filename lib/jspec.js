/* -----------------------------------------------------------------

  JSpec: minimalistic JavaScript test driven development framework.
  Copyright 2008 TJ Holowaychuk. (MIT Licensed)

------------------------------------------------------------------ */

var JSPEC_VERSION = '0.0.4';

/* -----------------------------------------------------------------

  JSpec Manager

------------------------------------------------------------------ */

var JSpecManager = JSpecManager || {
		outputReportsTo: 'jspec',
		currentSuite: {},
		suites: [],
	};
	
/**
 * Run JSpec test suites.
 */
JSpecManager.run = function(callback) {
	callback = callback || this.report;
	for (var i = 0; i < this.suites.length; i++) {
		this.currentSuite = this.suites[i];
		this.suites[i].run();
	}
	callback(this.suites);
};

/* -----------------------------------------------------------------

  JSpec Report

------------------------------------------------------------------ */

/**
 * Report on test suites which have run.
 */
JSpecManager.report = function(suites) {
	var passTotal = 0;
	var failureTotal = 0;
	
	// Calculate totals
	for (var i = 0; i < suites.length; i++) {
		passTotal += suites[i].passes.length;
		failureTotal += suites[i].failures.length;
	}; 

	// Display reports
	with (document){
		var markup = '';
		var report = getElementById(JSpecManager.outputReportsTo);
		if (report) {
			
			// Header
			markup += '<div id="jspec-report">';
			markup += '<div class="heading">';
			markup += '<span class="passes">Passes: <em>' + passTotal + '</em></span> ';
			markup += '<span class="failures">Failures: <em>' + failureTotal + '</em></span>';
			markup += '</div>';
			
			// Suites
			markup += '<div class="suites">';
			// No suites
			if (suites.length == 0){
				markup += '<h2>No spec suites</h2>'
			}
			
			for (var i = 0; i < suites.length; i++) {
				markup += '<h2>' + suites[i].description + '</h2>';
				
				// Failures
				for (var j = 0; j < suites[i].failures.length; j++) {
					markup += '<p class="fail">' + suites[i].failures[j].spec.description + '; ' + suites[i].failures[j].message + '</p>';
				};
				
				// Passes
				for (var j = 0; j < suites[i].passes.length; j++) {
					markup += '<p class="pass">' + suites[i].passes[j].spec.description + '</p>';
				};
				
				// Nothing
				if (suites[i].failures.length == 0 && suites[i].passes.length == 0){
					markup += '<p>No specifications in this suite.</p>';
				}
			};
			markup += '</div>';
			markup += '</div>';
			
			report.innerHTML = markup;
		}
	}
};

/* -----------------------------------------------------------------

  JSpec Suite

------------------------------------------------------------------ */

var JSpecSuite = function(description) {
	return {
		specs : [],
		passes: [],
		failures: [],
		store: {},
		currentSpec: {},
		description: description,
		beforeCallback: function(){},
		beforeEachCallback: function(){},
		afterCallback: function(){},
		afterEachCallback: function(){},
		
		/**
		 * Describe a single spec.
		 *
		 * @param {string} description
		 * @param {function} callback
		 */
		it : function(description, callback) {
			this.specs.push({
				description: (typeof description == 'function') ? null : description,
				callback: callback
			});
		},
				
		/**
		 * Execute before the suite is run.
		 *
		 * @param {function} callback
		 */
		before_all : function(callback) {
			this.beforeCallback = callback;
		},
		
		/**
		 * Execute before each suite spec is run.
		 *
		 * @param {function} callback
		 */
		before_each : function(callback) {
			this.beforeEachCallback = callback;
		},
		
		/**
		 * Execute after the suite is run.
		 *
		 * @param {function} callback
		 */
		after_all : function(callback) {
			this.afterCallback = callback;
		},
		
		/**
		 * Execute after each suite spec is run.
		 *
		 * @param {function} callback
		 */
		after_each : function(callback) {
			this.afterEachCallback = callback;
		},
		
		/**
		 * Pass the current spec.
		 */
		pass : function() {
			this.passes.push({ spec: this.currentSpec });			
		},
		
		/**
		 * Fail the current spec.
		 *
		 * @param {mixed} message
		 */
		fail : function(message) {
			this.failures.push({
				spec: this.currentSpec,
				message: message	
			});
		},
						
		/**
		 * Run the suite.
		 */
		run : function() {
			this.beforeCallback.call(this.store);
			for (var i = 0; i < this.specs.length; i++) {
				this.beforeEachCallback.call(this.store);
				this.currentSpec = this.specs[i];
				if (typeof this.currentSpec.callback != 'function'){
					this.fail('Requires implementation');
				}
				else {
					this.currentSpec.callback.call(this.store);
				}
				this.afterEachCallback.call(this.store);
			}
			this.afterCallback.call(this.store); 
			this.store = {};
		}
	};
};

/* -----------------------------------------------------------------

  JSpec

------------------------------------------------------------------ */

var JSpec = function(description) {
	var suite = new JSpecSuite(description);
	JSpecManager.suites.push(suite);
	return suite;
};
	
/* -----------------------------------------------------------------

  Core methods

------------------------------------------------------------------ */

Object.prototype.should_be = function(value) { 
	return this.should_equal(value);
};

Object.prototype.should_not_be = function(value) { 
	return this.should_not_equal(value);
};

Object.prototype.should_match = function(regexp) { 
	return this.toString().match(regexp)
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Should have matched ' + regexp.toString());
};

Object.prototype.should_not_match = function(regexp) { 
	return !this.toString().match(regexp)
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Should not have matched ' + regexp.toString());
};

Object.prototype.should_not_be_empty = function() { 
	var v = this.valueOf();
	return (v != '' && v != []) 
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Should not have been empty');
};

Object.prototype.should_be_empty = function() { 
	var v = this.valueOf();
	return (v == '' || v == []) 
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Should have been empty');
};

Object.prototype.should_equal = function(value) { 
	return this.valueOf() === value 
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Expected ' + value + ', but got ' + this.toString());
};

Object.prototype.should_not_equal = function(value) { 
	return this.valueOf() !== value 
		? JSpecManager.currentSuite.pass() 
		: JSpecManager.currentSuite.fail('Should not have been equal to ' + value);
};
