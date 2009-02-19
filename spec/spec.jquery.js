
describe 'jQuery helpers'

  before
    this.dom = this.sandbox()
  end
  
  it 'should override sandbox, providing a jQuery object'
    this.dom.jquery.should_be_a String
  end
  
  it 'should add elements to a sandbox'
    this.dom.prepend('<em>test</em>').should_have_text 'test'
  end
  
end

describe 'jQuery matchers'

  before_each
    var html = '<p><label><em>Save?</em></label>' +
    '<select class="save" style="display: none;">' +
    '<option value="0">No</option>' +
    '<option value="1">Yes</option>' +
    '</select>' +
    '<strong>test</strong>' +
    '<strong>test</strong>' +
    '</p>'
    this.elem = $(html)
  end
  
  it 'have_tag'
    this.elem.should_have_tag('label')
    this.elem.should_have_tag('em')
    this.elem.should_not_have_tag('input')
  end
  
  it 'have_tags'
    this.elem.should_have_tags('option')
    this.elem.should_not_have_tags('label')
  end
  
  it 'have_child'
    this.elem.should_have_child('label')
    this.elem.should_not_have_child('em')
  end
  
  it 'have_children'
    this.elem.should_have_children('strong')
    this.elem.should_not_have_children('select')
  end
  
  it 'have_text'
    this.elem.children('label').should_have_text('Save?')
  end
  
  it 'have_value'
    this.elem.find('option').get(1).should_have_value('1')
  end
  
  it 'have_class'
    this.elem.children('select').should_have_class('save')
  end
  
  it 'be_visible'
    this.element('#jspec-report').should_be_visible
  end
  
  it 'be_hidden'
    this.elem.children('select').should_be_hidden
  end
  
end