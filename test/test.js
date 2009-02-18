
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
    '1'.should_eql(1)
  end
  
  it 'equal'
    'test'.should_equal('test')
    '1'.should_not_equal(1)
  end
  
  it 'match'
    'foobar'.should_match(/foo/)
    'foobar'.should_not_match(/barfoo/)
  end
  
  it 'be_empty'
    var string = '', array = []
    string.should_be_empty()
    array.should_be_empty()
  end
  
  it 'have_length'
    'test'.should_have_length_of(4)
  end
  
end