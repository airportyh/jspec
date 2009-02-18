
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
    '1'.should_be(1)
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
    var numbers = [1, 2, 3], object = { hey : 'there' }
    numbers.should_include(2)
    numbers.should_not_include(5)
    object.should_include('hey')
  end
  
  it 'be_a'
    var array = []
    'test'.should_be_a(String)
    array.should_be_an(Array)
  end
  
  it 'throw_error'
    var lambda = function() { throw 'error' }
    lambda.should_throw_error()
    var lambda = function() { return 'test' }
    lambda.should_not_throw_error()
  end
  
  it 'be_type'
    var object = {}, func = function(){}
    'hey'.should_be_type('string')
    object.should_be_type('object')
    func.should_be_type('function')
  end

end

describe 'Position hooks'
  
  before 
    this.beforeSpecNum = 0
    this.afterSpecNum = 0
    this.passBefore = true
  end
  
  before_each
    this.beforeSpecNum++
  end
  
  after_each 
    this.afterSpecNum++
  end
  
  it 'before should work'
    this.passBefore.should_be_true()
  end
  
  it 'before should work again'
    this.passBefore.should_be_true()
  end
  
  it 'before / after each should work'
    this.beforeSpecNum.should_equal(3)
    this.afterSpecNum.should_equal(2)
  end
  
end

describe 'Matcher messages'

  it 'Fail with negative message'
    '1'.should_not_be(true)
  end
  
  it 'Fail with positive message'
    false.should_be(true)
  end
  
  it 'Fail second assertion message'
    true.should_be(true)
    'bar'.should_include('foo')
    'bar'.should_match(/foo/)
  end
end