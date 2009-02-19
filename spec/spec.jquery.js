
describe 'jQuery matchers'

  before_each
    var html = '<p><label>Save?</label>' +
    '<select class="save" style="display: none;">' +
    '<option value="0">No</option>' +
    '<option value="1">Yes</option>' +
    '</select></p>'
    this.elem = $(html)
  end
  
  it 'have_selector'
    this.elem.should_have_selector('label')
    this.elem.should_not_have_selector('input')
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