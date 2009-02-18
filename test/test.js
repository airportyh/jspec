
describe 'Positive specs' 

  it 'should pass'
    'test'.should_equal('test')
  end
  
  it 'should pass with several assertions'
    'foo'.should_equal('foo')
    'bar'.should_equal('bar')
    'bar'.should_not_equal('foo')
  end
  
end

describe 'Negative specs'

  it 'should fail'
    'test'.should_not_eql('test')
  end

  it 'should fail with one faulty assertion'
    'test'.should_equal('test')
    'test'.should_equal('foo')
  end
  
end

describe 'Misc'

  it 'requires implementation'
  end

end

describe 'Matchers'
  it 'eql'
    'test'.should_eql('test')
  end
  
  it 'equal'
    var string = 'test'
    'test'.should_not_equal('test')
    string.should_equal(string)
  end
end