
// TODO: fix stupid sizzle bug
// TODO: have_attr('attr', value)
// TODO: have_css('prop', value)
// TODO: visibility
// TODO: ajax
// TODO: events etc

if (typeof jQuery == 'undefined') throw 'jQuery is required to use JSpec jQuery matchers'

JSpec.defaultContext.element = jQuery

JSpec.addMatchers({
  have_selector : "jQuery(actual.selector + '' + expected).length > 0",
  have_class    : "jQuery(actual).hasClass(expected)",
  have_html     : "jQuery(actual).html() == expected",
  have_text     : "jQuery(actual).text() == expected",
  have_value    : "jQuery(actual).val() == expected",
  be_hidden     : "jQuery(actual).css('display') != 'none'",
  be_visible    : "jQuery(actual).css('display') == 'none'",
})
