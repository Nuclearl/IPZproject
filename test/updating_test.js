const assert = require('assert');
const Function = require('../models/func.model');

function asyncFunction() {
    return new Promise(resolve => {
        setTimeout(resolve, 10);
    });
};
// Describe our tests
describe('Updating records', function(){
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
  it('Updates the name of a record', function(){
      Function.findOneAndUpdate({fullName: 'cos', name : 'cos(x)'}).then(function(){
          Function.findOne({_id: char._id}).then(function(result){
            assert(result.fullName === 'cos');
            assert(result.name === 'cos(x)');
              done();
          });
      });
  });

 it('Adds x to the name of every record', function(){
    Function.update({}, { $inc: { name: 'x' } }).then(function(){
        Function.findOne({fullName: 'cos'}).then(function(record){
          assert(result.name === 'cos(x)x');
            done();
        });
    });
 });


});
