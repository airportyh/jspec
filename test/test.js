
describe 'Jspec' 
  it 'should pass'
    'test'.should_equal('test')
  end
  
  it 'should fail'
    'test'.should_not_equal('test')
  end
  
  it 'should fail with one faulty assertion'
    'test'.should_equal('test')
    'test'.should_equal('foo')
  end
end