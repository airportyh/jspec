
// TODO: fix stupid sizzle bug
// TODO: have_attr('attr', value)
// TODO: ajax
// TODO: events etc

if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

JSpec.defaultContext.element = jQuery

JSpec.addMatchers({
  have_selector : "jQuery(expected, actual).length > 0",
  have_class    : "jQuery(actual).hasClass(expected)",
  have_text     : "jQuery(actual).text() == expected",
  have_value    : "jQuery(actual).val() == expected",
  be_visible    : "jQuery(actual).css('display') != 'none'",
  be_hidden     : "jQuery(actual).css('display') == 'none'",
})
