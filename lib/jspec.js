
// JSpec - Core
// Copyright 2008 - 2009 TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// TODO: JSpec rename 

var Jspec = {
  
  version : '0.1.0',
  suites  : {},
  stats   : { specs : 0, assertions : 0, failures : 0, passes : 0 },
  
  // --- Matchers
  
  // TODO: matcher alias mechanism
  
  matchers : {
    eql             : '==',
    equal           : '===',
    be_greater_than : '>',
    be_less_than    : '<',
    be_at_least     : '>=',
    be_at_most      : '<=',
    be_a            : 'actual.constructor == expected',
    be_an           : 'actual.constructor == expected',
    be_empty        : 'actual.length == 0',
    be_true         : 'actual == true',
    be_false        : 'actual == false',
    match           : 'actual.match(expected)',
    have_length_of  : 'actual.length == expected',
    respond_to      : 'typeof actual[expected] == "function"',
    
    include : { match : function(expected, actual) {
      if (actual.constructor == String) return actual.match(expected)
      else return expected in actual
    }},
    
    throw_error : { match : function(expected, actual) {
      try { actual() }
      catch (e) { return true }
    }}
  },
  
  // --- Objects
  
  // TODO: allow several arguments to be passed, always consider actual array / apply
  // TODO: change include to allow several like should_include(1,2,3)
  // TODO: stop using this.func ... use this.extend {}
  // TODO: benefit of using a context for 'this' arg ? .... messages even?
  
  /**
   * Matcher.
   * 
   * There are many ways to define a matcher within JSpec. The first being
   * a string that is less than 4 characters long, which is considered a simple
   * binary operation between two expressions. For example the matcher '==' simply
   * evaluates to 'actual == expected'.
   *
   * The second way to create a matcher is with a larger string, which is evaluated,
   * and then returned such as 'actual.match(expected)'.
   *
   * Finally an object may be used, and must contain a 'match' method, which is passed
   * both the expected, and actual values. Optionally a 'message' method may be used to
   * specify a custom message. Example:
   *
   * match : function(expected, actual) {
   *   return typeof actual == expected
   * }
   *
   * @param  {string} name
   * @param  {hash, string} matcher
   * @param  {object} expected
   * @param  {object} actual
   * @param  {bool} negate
   * @return {Matcher}
   */
  
  Matcher : function (name, matcher, expected, actual, negate) {
    var self = this
    // TODO: remove these since they are not used.. well some of them, other objects too
    this.name = name
    this.message = ''
    this.passed = false
    
    if (typeof matcher == 'string') {
      if (matcher.length < 4) body = 'actual ' + matcher + ' expected'
      else body = matcher
      matcher = { match : function(expected, actual) { return eval(body) } }
    }
    
    function generateMessage() {
      return 'expected ' + actual + (negate ? ' not' : '') + ' to ' + name.replace(/_/g, ' ') + ' ' + expected
    }
    
    function setMessage() {
      if (typeof matcher.message == 'function')
        self.message = matcher.message(expected, actual, negate)
      else
        self.message = generateMessage()
    }

    function pass() {
      setMessage()
      Jspec.stats.passes += 1
      self.passed = true
    }

    function fail() {
      setMessage()
      self.message += ', but it did' + (negate ? '' : ' not')
      Jspec.stats.failures += 1
    }

    this.match = function() {
      expected = expected == null ? null : expected.valueOf()
      return matcher.match.call(Jspec, expected, actual.valueOf())
    }

    this.passes = function() {
      return negate? !this.match() : this.match()
    }

    this.exec = function() {
      if (this.passes()) pass()
      else fail()

      return this
    }
  },
      
  /**
   * Default formatter, outputting to the DOM.
   */
  
  Formatter : function(results) {
    var markup = '', report = document.getElementById('jspec')
    if (!report) throw 'JSpec requires div#jspec to output its reports'

    markup += 
      '<div id="jspec-report"><div class="heading">' +
      '<span class="passes">Passes: <em>' + results.stats.passes + '</em></span> ' +
      '<span class="failures">Failures: <em>' + results.stats.failures + '</em></span>' +
      '</div><div class="suites">'
    
    results.each(results.suites, function(description, suite){
      if (suite.ran) {
        markup += '<h2>' + description + '</h2>'
        results.each(suite.specs, function(spec){
          // TODO: utilize matcher descriptions ... and auto-generate when not present 
          // TODO: allow it to not have description
          // spec.failure().message
          var assertionCount = ' (<span class="assertion-count">' + spec.assertions.length + '</span>)'
          if (spec.requiresImplementation()) markup += '<p class="requires-implementation">' + spec.description + '</p>'
          else if (spec.passed())            markup += '<p class="pass">' + spec.description + assertionCount + '</p>'
          else                               markup += '<p class="fail">' + spec.description + assertionCount + '</p>' 
        })
      }
    })

    markup += '</div></div>'

    report.innerHTML = markup
  },
      
  /**
   * Specification Suite block object.
   *
   * @param {string} description
   */
      
  Suite : function(description) {
    this.specs = []
    this.description = description
    this.ran = false
    this.addSpec = function(spec) {
      this.specs.push(spec)
      spec.suite = this
    }
  },
  
  /**
   * Specification block object.
   *
   * @param {string} description
   * @param {string} body
   */
  
  Spec : function(description, body) {
    this.body = body
    this.description = description
    this.assertions = []
    
    this.failure = function() {
      var failure
      Jspec.each(this.assertions, function(assertion){
        if (!assertion.passed) failure = assertion
      })
      return failure
    }
        
    this.passed = function() {
      return !this.failure()
    }
    
    this.requiresImplementation = function() {
      return this.assertions.length == 0
    }
  },
  
  // --- Methods
  
  /**
   * Iterate an object, invoking the given callback.
   *
   * @param  {hash, array} object
   * @param  {function} callback
   * @return {Type}
   */
  
  each : function(object, callback) {
    for (var key in object) {
      if (typeof object[key] == 'function') continue
      if (callback.length == 1)
        callback.call(this, object[key])
      else
        callback.call(this, key, object[key])
    }
    return this
  },
  
  /**
   * Define matchers.
   *
   * @param  {hash} matchers
   * @return {Jspec}
   */
  
  defineMatchers : function(matchers) {
    this.each(matchers, function(key, callbacks){
      Object.prototype['should_' + key] = function(other) {
        var matcher = new Jspec.Matcher(key, matchers[key], other, this)
        Jspec.currentSpec.assertions.push(matcher.exec())
      }
      Object.prototype['should_not_' + key] = function(other) {
        var matcher = new Jspec.Matcher(key, matchers[key], other, this, true)
        Jspec.currentSpec.assertions.push(matcher.exec())
      }
    })
    return this
  },
  
  /**
   * Report on the results.
   *
   * @return {Jspec}
   */
  
  report : function() {
    var formatter = new Jspec.Formatter(this)
    return this
  },
  
  /**
   * Run the spec suites.
   *
   * @return {Jspec}
   */
  
  run : function() {
    this.each(this.suites, function(suite) {
      this.runSuite(suite)
    })
    return this
  },
  
  /**
   * Run a suite.
   *
   * @param  {Suite}  suite
   * @return {Jspec}
   */
  
  runSuite : function(suite) {
    suite.ran = true
    this.each(suite.specs, function(spec) {
      this.currentSpec = spec
      this.stats.specs += 1
      try { eval(spec.body) }
      catch(e) { throw "Error in spec '" + spec.description + "': " + e }
      this.stats.assertions += spec.assertions.length
    })
    return this
  },
  
  /**
   * Evaluate a string of jspec.
   *
   * @param  {string} input
   * @return {Jspec}
   */
  
  eval : function(input) {
    return this.parse(input)
  },
  
  /**
   * Parse a string.
   *
   * @param  {string} input
   * @return {Jspec}
   */
  
  parse : function(input) {
    var describing, specing, capturing
    var token, describe, spec, capture, body = []
    var tokens = this.tokenize(input)
    
    while (tokens.length) {
      token = tokens.shift()
      
      switch (token) {
        case 'end':
          if (specing) {
            var newSpec = new Jspec.Spec(spec, body.join(''))
            this.suites[describe] = this.suites[describe] || new Jspec.Suite(describe)
            this.suites[describe].addSpec(newSpec)
            body = [], spec = specing = null
          }
          else if (describing) {
            describing = describe = null
          }
          else if (capturing) {
            // TODO: finish evaluation ... fix issue with body
            // console.log(body.join(' '));
            body = [], capturing = capture = null
          }
          break
          
        case 'before':
        case 'after':
        case 'before_each':
        case 'after_each':
          capturing = true
          break
          
        case 'describe':
          describing = true
          break
          
        case 'it':
          specing = true
          break
      }
      
      if (spec || capture) {
        body.push(token)
      }
      else {
        if (capturing) capture = true      
        if (/'.*?'/.test(token)) {
          if (specing) spec = token.replace(/'/g, '')
          else if (describing) describe = token.replace(/'/g, '')
        }
      }
    }
    
    return this
  },
  
  /**
   * Tokenize a string.
   *
   * @param  {string} input
   * @return {array}
   */
  
  tokenize : function(input) {
    if (input.constructor == Array) return input
    var regexp = /before_each|after_each|before|after|it|describe|end|'.*?'|\n|./g
    return input.match(regexp)
  },
  
  /**
   * Load a files contents.
   *
   * @param  {string} file
   * @return {string}
   */
  
  load : function(file) {
    var request = new XMLHttpRequest
    request.open('GET', file, false)
    request.send(null)
    if (request.readyState == 4)
      return request.responseText
  },
  
  /**
   * Evaluate, run, and report on the file passed.
   *
   * @param {string} file
   */
  
  exec : function(file) {
    this.eval(this.load(file)).run().report()
  }
}

Jspec.defineMatchers(Jspec.matchers)
