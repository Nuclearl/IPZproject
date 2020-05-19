const assert = require('assert');
const Function = require('../models/func.model');

function asyncFunction() {
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
};
// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(){

    const char = new Function({
      fullName: 'cos',
      name : 'cos(x)'
    });

    char.save().then(function(){
      assert(!char.isNew);
      done();
    });

  });

});
