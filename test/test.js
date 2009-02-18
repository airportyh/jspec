
describe 'Positive specs'

  before 
    console.log('once');
  end

  before_each 
    console.log('each');
  end

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
  
  it 'respond_to'
    var string = 'test'
    string.should_not_respond_to('whatever')
    string.should_respond_to('toString')
  end
  
  it 'include'
    'hey there'.should_include('hey')
    var numbers = [1, 2, 3]
    numbers.should_include(2)
    numbers.should_not_include(5)
  end
  
  it 'be_a'
    var array = []
    'test'.should_be_a(String)
    array.should_be_an(Array)
  end

end