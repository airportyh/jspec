
// JSpec - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

var JSpec = {
  
  version : '0.3.2',
  main    : this,
  suites  : {},
  stats   : { specs : 0, assertions : 0, failures : 0, passes : 0 },
  
  // --- Matchers
  
  matchers : {
    eql             : "==",
    be              : "alias eql",
    equal           : "===",
    be_greater_than : ">",
    be_less_than    : "<",
    be_at_least     : ">=",
    be_at_most      : "<=",
    be_a            : "actual.constructor == expected",
    be_an           : "alias be_a",
    be_empty        : "actual.length == 0",
    be_true         : "actual == true",
    be_false        : "actual == false",
    be_type         : "typeof actual == expected",
    match           : "typeof actual == 'string' ? actual.match(expected) : false",
    have_length     : "actual.length == expected",
    respond_to      : "typeof actual[expected] == 'function'",

    include : { match : function(expected, actual) {
      if (actual.constructor == String) return actual.match(expected)
      else return expected in actual
    }},
    
    throw_error : { match : function(expected, actual) {
      try { actual() }
      catch (e) { return true }
    }}
  },
  
  /**
   * Default context in which bodies are evaluated.
   * This allows specs and hooks to use the 'this' keyword in
   * order to store variables, as well as allowing the context
   * to provide helper methods or properties.
   *
   * Replace context simply by setting JSpec.context
   * to your own like below:
   *
   * JSpec.context = { foo : 'bar' }
   *
   * Contexts can be changed within any body, this can be useful
   * in order to provide specific helper methods to specific suites.
   *
   * To reset (usually in after hook) simply set to null like below:
   *
   * JSpec.context = null
   */
  
  defaultContext : {
    sandbox : function(name) {
      var sandbox = document.createElement('div')
      sandbox.setAttribute('class', 'jspec-sandbox')
      document.body.appendChild(sandbox)
      return sandbox
    }
  },
  
  // --- Objects
  
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
   * You may alias simply by starting a string with 'alias', such as 'be' : 'alias eql'.
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
   * @api private 
   */
  
  Matcher : function (name, matcher, expected, actual, negate) {
    var self = this
    this.name = name, this.message = '', this.passed = false
    
    // Define matchers from strings
    
    if (typeof matcher == 'string') {
      if (matcher.match(/^alias (\w+)/)) matcher = JSpec.matchers[matcher.match(/^alias (\w+)/)[1]]
      if (matcher.length < 4) body = 'actual ' + matcher + ' expected'
      else body = matcher
      matcher = { match : function(expected, actual) { return eval(body) } }
    }
    
    // Convert common objects to read-friendly strings
    
    function print(object) {
      if (object == null) return ''
      else if (object.jquery) return object.selector.length == 0 ? object.get(0) : "'" + object.selector + "'"
      else if (typeof object == 'string') return "'" + object + "'"
      else return object
    }
    
    // Generate matcher message

    function generateMessage() {
      return 'expected ' + print(actual) + ' to ' + (negate ? ' not ' : '') + name.replace(/_/g, ' ') + ' ' + print(expected)
    }
    
    // Set message to matcher callback invocation or auto-generated message
    
    function setMessage() {
      if (typeof matcher.message == 'function')
        self.message = matcher.message(expected, actual, negate)
      else
        self.message = generateMessage()
    }
    
    // Pass the matcher

    function pass() {
      setMessage()
      JSpec.stats.passes += 1
      self.passed = true
    }
    
    // Fail the matcher

    function fail() {
      setMessage()
      JSpec.stats.failures += 1
    }
    
    // Return result of match

    this.match = function() {
      expected = expected == null ? null : expected.valueOf()
      return matcher.match.call(JSpec, expected, actual.valueOf())
    }
    
    // Boolean match result

    this.passes = function() {
      this.result = this.match()
      return negate? !this.result : this.result
    }
    
    // Performs match, and passes / fails the matcher

    this.exec = function() {
      this.passes() ? pass() : fail()
      return this
    }
  },
      
  /**
   * Default formatter, outputting to the DOM.
   * @api public
   */
  
  DOMFormatter : function(results, options) {
    var markup = '', report = document.getElementById('jspec')
    if (!report) throw 'JSpec requires div#jspec to output its reports'

    markup += 
    '<div id="jspec-report"><div class="heading">' +
    '<span class="passes">Passes: <em>' + results.stats.passes + '</em></span> ' +
    '<span class="failures">Failures: <em>' + results.stats.failures + '</em></span>' +
    '</div><div class="suites">'
    
    results.each(results.suites, function(description, suite){
      if (suite.ran) {
        markup += '<div class="suite"><h2>' + description + '</h2>'
        results.each(suite.specs, function(spec){
          var assertionCount = ' (<span class="assertion-count">' + spec.assertions.length + '</span>)'
          if (spec.requiresImplementation()) { 
            markup += '<p class="requires-implementation">' + spec.description + '</p>'
          }
          else if (spec.passed()) {
            markup += '<p class="pass">' + spec.description + assertionCount + '</p>'
          }
          else {
            markup += '<p class="fail">' + spec.description + assertionCount + ' <em>' + spec.failure().message + '</em>' + '</p>' 
          }
        })
        markup += '</div>'
      }
    })

    markup += '</div></div>'

    report.innerHTML = markup
  },
  
  /**
   * Terminal formatter.
   * @api public
   */
   
   TerminalFormatter : function(results) {
     // TODO: me!
   },
      
  /**
   * Specification Suite block object.
   *
   * @param {string} description
   * @api private
   */
      
  Suite : function(description) {
    this.specs = [], this.hooks = {}, this.description = description, this.ran = false
    
    // Add a spec to the suite
    
    this.addSpec = function(spec) {
      this.specs.push(spec)
      spec.suite = this
    }
    
    // Invoke a hook in context to this suite
    
    this.hook = function(hook) {
      if (body = this.hooks[hook]) 
        JSpec.evalBody(body, "Error in hook '" + hook + "', suite '" + this.description + "'")  
    }
  },
  
  /**
   * Specification block object.
   *
   * @param {string} description
   * @param {string} body
   * @api private
   */
  
  Spec : function(description, body) {
    this.body = body, this.description = description, this.assertions = []
    
    // Find first failing assertion
    
    this.failure = function() {
      var failure
      JSpec.each(this.assertions, function(assertion){
        if (!assertion.passed && !failure) failure = assertion
      })
      return failure
    }
    
    // Weither or not the spec passed
        
    this.passed = function() {
      return !this.failure()
    }
    
    // Weither or not the spec requires implementation (no assertions)
    
    this.requiresImplementation = function() {
      return this.assertions.length == 0
    }
  },
  
  // --- Methods
  
  /**
   * Invoke a matcher. Useful when creating custom matchers
   * so that you may utilize, or negate others when creating your own.
   *
   * this.match('test', 'be_a', String)
   * 
   * @param  {object} actual
   * @param  {string} name
   * @param  {object} expected
   * @param  {bool} negate
   * @return {bool}
   * @api public
   */
  
  match : function(actual, name, expected, negate) {
    negate = negate || false
    var matcher = new JSpec.Matcher(name, this.matchers[name], expected, actual, negate)
    return matcher.passes()
  },
  
  /**
   * Iterate an object, invoking the given callback.
   *
   * @param  {hash, array} object
   * @param  {function} callback
   * @return {Type}
   * @api private
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
   * @return {JSpec}
   * @api public
   */
  
  addMatchers : function(matchers) {
    this.each(matchers, function(name, body){
      this.addMatcher(name, body)
    })
    return this
  },
  
  /**
   * Add a matcher.
   *
   * @param  {string} name
   * @param  {string, hash} body
   * @return {JSpec}
   * @api public
   */
   
   addMatcher : function(name, body) {
     this._addMatcher(name, body, true)._addMatcher(name, body, false)
   },
  
  /**
   * Add raw matcher, this requires that you specify the negate
   * parameter, use addMatcher instead.
   *
   * @param  {string} name
   * @param  {string, hash} body
   * @param  {bool} negate
   * @return {JSpec}
   * @api private
   */
  
  _addMatcher : function(name, body, negate) {
    Object.prototype['should_' + (negate ? 'not_' : '') + name] = function(other) {
      var matcher = new JSpec.Matcher(name, body, other, this, negate)
      if (JSpec.currentSpec) {
        JSpec.currentSpec.assertions.push(matcher.exec())
        return matcher.result
      }
    }
    return this
  },
  
  /**
   * Evaluate a JSpec capture body.
   *
   * @param  {string} body
   * @param  {string} errorMessage (optional)
   * @return {Type}
   * @api private
   */
  
  evalBody : function(body, errorMessage) {
    try {
      var runner = function() { eval(JSpec.preProcessBody(body)) }
      runner.call(this.context || this.defaultContext)
    } 
    catch(e) { throw (errorMessage || 'Error: ') + e }
  },
  
  /**
   * Pre-process capture body.
   *
   * - Allow optional parents like should_be_true
   *
   * @param  {string} body
   * @return {Type}
   * @api private
   */
  
  preProcessBody : function(body) {
    body = body.replace(/\.should_(\w+)(?: |$)(.*)$/gm, '.should_$1($2)')
    return body
  },
  
  /**
   * Parse a string.
   *
   * @param  {string} input
   * @return {JSpec}
   * @api private
   */
   
  parse : function(input) {
    var describing, specing, capturing
    var token, describe, spec, capture, body = []
    var tokens = this.tokenize(input)
    
    while (tokens.length) {
      token = tokens.shift()
      
      switch (token) {
        case 'end':
          if (describing) this.suites[describe] = this.suites[describe] || new JSpec.Suite(describe)
          if (specing) {
            var newSpec = new JSpec.Spec(spec, body.join(''))
            this.suites[describe].addSpec(newSpec)
            body = [], spec = specing = null
          }
          else if (capturing) {
            var body = body.join('')
            if (describing) this.suites[describe].hooks[capture] = body
            body = [], capturing = capture = null
          }
          else if (describing) {
            describing = describe = null
          }
          break
          
        case 'before':
        case 'after':
        case 'before_each':
        case 'after_each': capturing = true; break
        
        case 'describe': describing = true; break
        case 'it'      : specing = true;    break
        case '__END__' : return this;       break
      }
      
      if (spec || capture) {
        body.push(token)
      }
      else {
        if (capturing) capture = token
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
   * @api private
   */
  
  tokenize : function(input) {
    if (input.constructor == Array) return input
    var regexp = /(?:__END__|end|before_each|after_each|before|after|it|describe|'.*?')(?= |\n|$)|\n|./gm
    return input.match(regexp)
  },
  
  /**
   * Report on the results. Options are passed to formatter.
   *
   * @param  {hash} options
   * @return {JSpec}
   * @api public
   */
  
  report : function(options) {
    options = options || {}
    this.formatter ? new this.formatter(this, options) : new JSpec.DOMFormatter(this, options)
    return this
  },
  
  /**
   * Run the spec suites.
   *
   * @return {JSpec}
   * @api public
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
   * @return {JSpec}
   * @api public
   */
  
  runSuite : function(suite) {
    suite.ran = true
    suite.hook('before')
    this.each(suite.specs, function(spec) {
      suite.hook('before_each')
      this.currentSpec = spec
      this.stats.specs += 1
      this.evalBody(spec.body, "Error in spec '" + spec.description + "': ")
      this.stats.assertions += spec.assertions.length
      suite.hook('after_each')
    })
    suite.hook('after')
    return this
  },
  
  /**
   * Evaluate a string of JSpec.
   *
   * @param  {string} input
   * @return {JSpec}
   * @api public
   */
  
  eval : function(input) {
    return this.parse(input)
  },
  
  /**
   * Load a files contents.
   *
   * @param  {string} file
   * @return {string}
   * @api public
   */
  
  load : function(file) {
    if ('XMLHttpRequest' in this.main) {
      var request = new XMLHttpRequest
      request.open('GET', file, false)
      request.send(null)
      if (request.readyState == 4)
        return request.responseText
    }
    else if ('load' in this.main) {
      // TODO: workaround for IO issue / preprocessing
      load(file)
    }
    else {
      throw 'Cannot load ' + file
    }
  },
  
  /**
   * Load and evaluate a file.
   *
   * @param {string} file
   * @param {JSpec}
   * @api public
   */
  
  exec : function(file) {
    return this.eval(this.load(file))
  }
}

JSpec.addMatchers(JSpec.matchers)
