
describe 'DOM Sandbox'

  before_each
    this.dom = this.defaultSandbox() // Normall sandbox() jQuery helpers override this
  end
  
  it 'should allow creation of sandboxes'
    this.dom.should_be_a(HTMLDivElement)
  end
  
end