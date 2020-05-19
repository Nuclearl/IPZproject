const assert = require('assert');
const Function = require('../models/func.model');
function asyncFunction() {
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
};
// Describe our tests
describe('Finding records', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(){
    char = new Function({
      fullName: 'cos',
      name : 'cos(x)'
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Finds a record from the database', function(){
    Function .findOne({fullName: 'cos', name : 'cos(x)'}).then(function(result){
      assert(result.fullName === 'cos');
      assert(result.name === 'cos(x)');
      done();
    });
  });

  it('Finds a record by unique id', function(){
    Function .findOne({_id: char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();
    });
  });

});
