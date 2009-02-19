
// TODO: test with matcher mechanism .. not the one below (are messages ok?)
// TODO: fix stupid sizzle bug
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
  
  addMatchers : function(matchers) {
    JSpec.each(matchers, function(name, body){
      this.addMatcher(name, {
        match : function(expected, actual) { return eval(body) },
        message : function() { return JSpec.jQuery.selectorMessage.apply(this, arguments) }
      })
    })
  }
  
}

JSpec.jQuery.addMatchers({
  //have_selector : 'jQuery(actual, expected).length > 0',
  have_class    : 'jQuery(actual).hasClass(expected)',
  have_html     : 'jQuery(actual).html() == expected',
  have_text     : 'jQuery(actual).text() == expected',
  have_value    : 'jQuery(actual).val() == expected',
})

JSpec.addMatcher('have_selector', 'jQuery(actual.selector + " " + expected).length > 0')
