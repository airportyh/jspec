
if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

JSpec.defaultContext.element = function(selector, context) {
  return jQuery(selector, context || null)
}

JSpec.addMatchers({
  have_selector : {
    match : function(expected, actual) {
      return jQuery(expected, actual).length > 0
    },
    
    message : function(expected, actual, negate) {
     return "expected '" + actual.selector + "' " + (negate ? 'not' : '') + " to have selector '" + expected + "'"
    }
  }
})