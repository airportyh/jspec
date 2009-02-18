
if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

JSpec.defaultContext.element = function(selector, context) {
  return jQuery(selector, context || null)
}

// TODO: better message mechanism for cases like these
// TODO: have_attr('attr', value)
// TODO: have_class
// TODO: have_html
// TODO: have_text
// TODO: have_value val
function selectorMessage(expected, actual, negate) {
  return "expected '" + actual.selector + "' " + (negate ? 'not' : '') + " to have selector '" + expected + "'"
}

JSpec.addMatchers({
  have_selector : {
    match : function(expected, actual) {
      return jQuery(expected, actual).length > 0
    },
    
    message : function() { return selectorMessage.apply(this, arguments) }
  }
})