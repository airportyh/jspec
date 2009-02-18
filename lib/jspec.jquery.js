
// TODO: make pretty :)
// TODO: have_attr('attr', value)
// TODO: have_css('prop', value)
// TODO: visibility
// TODO: ajax
// TODO: events etc

if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

JSpec.defaultContext.element = jQuery
JSpec.jQuery = {
  
  selectorMessage : function(expected, actual, negate) {
    return "expected '" + actual.selector + "' " + (negate ? 'not' : '') + " to have selector '" + expected + "'"
  },
  
  matcher : function(name, body) {
    var matchers = {}
    matchers[name] = {
      match : function(expected, actual) { return eval(body) },
      message : function() { return JSpec.jQuery.selectorMessage.apply(this, arguments) }
    }
    JSpec.addMatchers(matchers)
  }
  
}

with (JSpec.jQuery) {
 matcher('have_selector', 'jQuery(actual, expected)')
 matcher('have_class',    'jQuery(actual).hasClass(expected)')
 matcher('have_html',     'jQuery(actual).html() == expected')
 matcher('have_text',     'jQuery(actual).text() == expected')
 matcher('have_value',    'jQuery(actual).val() == expected')
}
