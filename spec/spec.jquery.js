
describe 'jQuery matchers' 
  
  it 'have_tag'
    this.element('#jspec-report').should_have_selector('.passes')
    this.element('#jspec-report').should_not_have_selector('.foo')
  end
  
end