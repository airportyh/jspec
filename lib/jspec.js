/* -----------------------------------------------------------------

  JSpec: minimalistic JavaScript test driven development framework.
  Copyright 2008 TJ Holowaychuk. (MIT Licensed)

------------------------------------------------------------------ */

/* -----------------------------------------------------------------

  JSpec Manager

------------------------------------------------------------------ */

var JSpecManager = JSpecManager || {
		initRunDelay: 800,
		outputReports: true,
		currentSuite: {},
		suites: []
	};
	
/**
 * Run JSpec test suites.
 */
JSpecManager.run = function() {
	for (var i = 0; i < this.suites.length; i++) {
		this.currentSuite = this.suites[i];
		this.suites[i].run();
	}
	if (this.outputReports) {
		this.report();
	}
};

/**
 * Report on test suites which have run.
 */
JSpecManager.report = function() {
	console.log(this);
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
				description: description,
				callback: callback
			});
		},
				
		/**
		 * Execute before the suite is run.
		 *
		 * @param {function} callback
		 */
		before : function(callback) {
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
		after : function(callback) {
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
		 * @param {mixed} expected this result
		 * @param {mixed} got this result
		 */
		fail : function(expected, got) {
			this.failures.push({
				spec: this.currentSpec,
				expected: expected,
				got: got	
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
				this.currentSpec.callback.call(this.store);
				this.afterEachCallback.call(this.store);
			}
			this.afterCallback.call(this.store);
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

  Core extensions

------------------------------------------------------------------ */

Object.prototype.should_equal = function(value) { 
	return this.valueOf() === value ? JSpecManager.currentSuite.pass() : JSpecManager.currentSuite.fail(value, this);
};

Object.prototype.should_not_equal = function(value) { 
	return this.valueOf() !== value ? JSpecManager.currentSuite.pass() : JSpecManager.currentSuite.fail(value, this);
};

setTimeout('JSpecManager.run()', JSpecManager.initRunDelay); // @todo: remove