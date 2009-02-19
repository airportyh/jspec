
describe 'jQuery matchers' 
  
  it 'have_selector'
    $('<p class="article"><h2>Test</h2></p>').should_have_selector('h2')
  end
  
  it 'have_text'
    this.element('<p>Test</p>').should_have_text('Test')
  end
  
  it 'have_html'
    this.element('<p><em>Test</em></p>').should_have_html('<em>Test</em>')
  end
    
  it 'have_value'
    this.element('<input type="textfield" value="cookies">').should_have_value('cookies')
  end
  
  it 'have_class'
    this.element('<p class="foo bar"></p>').should_have_class('bar')
  end
  
end