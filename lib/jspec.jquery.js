
// TODO: fix stupid sizzle bug
// TODO: have_attr('attr', value)
// TODO: ajax
// TODO: events etc

// --- Dependencies

if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

// --- Helpers

JSpec.defaultContext.element = jQuery
JSpec.defaultContext.defaultSandbox = JSpec.defaultContext.sandbox
JSpec.defaultContext.sandbox = function() { return jQuery(JSpec.defaultContext.defaultSandbox()) }

// --- Matchers

JSpec.addMatchers({
  have_tag      : "jQuery(expected, actual).length == 1",
  have_tags     : "jQuery(expected, actual).length > 1",
  have_child    : "jQuery(actual).children(expected).length == 1",
  have_children : "jQuery(actual).children(expected).length > 1",
  have_class    : "jQuery(actual).hasClass(expected)",
  have_text     : "jQuery(actual).text() == expected",
  have_value    : "jQuery(actual).val() == expected",
  be_visible    : "jQuery(actual).css('display') != 'none'",
  be_hidden     : "jQuery(actual).css('display') == 'none'",
})
