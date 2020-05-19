const assert = require('assert');
const Function = require('../models/func.model');

function asyncFunction() {
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
};
// Describe our tests
describe('Deleting records', function(){
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
  it('Deletes a record from the database', function(){
    Function.findOneAndRemove({fullName: 'cos', name : 'cos(x)'}).then(function(){
      Function.findOne({fullName: 'cos', name : 'cos(x)'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

});
