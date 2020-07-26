var ArrayDivider = require('../ArrayDivider.js');
var should = require('should');
var chai = require('chai');
var expect = require('expect');

var inputs = [
  {DIVIDER: 2,INPUTARRAY:"[1,2,3,4,5,6,7,8,9,10]"},
  {DIVIDER: 2,INPUTARRAY:"hello"}
];

function test(input)
{
  var arrDivider = new ArrayDivider();
  arrDivider.parseInputs(input);
  return arrDivider.divideArray();
}

it('Should be able to throw an exception when invalid JSON is provided in INPUTARRAY',() => {
  try
  {
    test({DIVIDER:2, INPUTARRAY:"hello"});
    assert.fail(); //Shouldn't get here
  }
  catch(e)
  {
    e.should.have.property('code');
    e.should.have.property('message');
  }
});

it('Should reject DIVIDER not being a number',() => {
  try
  {
    test({DIVIDER:"hello", INPUTARRAY:"[1,2,3,4,5]"});
    assert.fail(); //Shouldn't get here
  }
  catch(e)
  {
    e.should.have.property('code');
    e.should.have.property('message');
  }
});

it('Should handle situations where DIVIDER is 0',() => {
  var result = test({DIVIDER:0,INPUTARRAY:"[1,2,3,4,5]"});
  result.should.be.an.array;
  result.should.have.size(5);
});

it('Should handle situations where DIVIDER is 1',() => {
  var result =test({DIVIDER:1,INPUTARRAY:"[1,2,3,4,5]"});
  result.should.be.an.array;
  result.should.have.size(1);
  result[0].should.have.size(5);
});

it('Should handle multiple lengths of INPUTARRAY', () => {
  thisInput = [];
  for(var i = 0; i < 10; i++)
  {
    try
    {
      var result = test({DIVIDER:2,INPUTARRAY:thisInput.toString()});
      result.should.be.an.array;
      result.should.have.size(2);
    }
    catch(e)
    {
      //May reach here if the INPUTARRAY is <= 2
      e.should.have.property('code');
      e.should.have.property('message');
      if(i <= 2)
      {
        continue;
      }
    }
    thisInput.push(i++);
  }
});

it('Should provide the expected number of dividers', () => {
  for(var i = 1; i < 10; i++)
  {
    var result = test({DIVIDER:i,INPUTARRAY:"[1,2,3,4,5,6,7,8,9,10]"});
    result.should.be.an.array;
    result.should.have.size(i);
  }
});

it('Should output DIVIDER-1 equally sized nested arrays', () => {
  for(var i = 2; i < 10; i++)
  {
    var result = test({DIVIDER:i,INPUTARRAY:"[1,2,3,4,5,6,7,8,9,10]"});
    result.should.be.an.array;
    result.should.have.size(i);
    var sizes = []
    for(var j = 0; j < (result.length - 1); j++)
    {
      sizes.push(result[j].length);
    }
    var arrayAverageSize = sizes.reduce((acc,cur) => acc + cur, 0) / sizes.length;
    arrayAverageSize.should.be.eql(sizes[0]);
  }
});
