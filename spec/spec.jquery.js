
describe 'jQuery matchers'

  before_each
    this.elem = $('<select class="save"><option value="yes">Yes</value></select>')
  end
  
  it 'have_selector'
    this.elem.should_have_selector('option')
    this.elem.should_not_have_selector('input')
  end
  
  it 'have_text'
    this.elem.should_have_text('Yes')
  end
  
  it 'have_value'
    this.elem.children('option').should_have_value('yes')
  end
  
  it 'have_class'
    this.elem.should_have_class('save')
  end
  
end