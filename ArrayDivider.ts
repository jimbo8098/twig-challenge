class ArrayDivider
{
  divider: number = 0;
  inputArray: number[] = [];

  public parseInputs(values: any)
  {
    //Try to parse divider which should be a positive integer
    //Firstly, ensure it can be a number
    if(!isNaN(values.DIVIDER))
    {
      //Is not a decimal
      if(values.DIVIDER % 1 == 0)
      {
        this.divider = parseInt(values.DIVIDER);
      }
      else
      {
        throw {
          code: 2,
          message: "DIVIDER was a decimal"
        }
      }
    }
    else
    {
      throw {
        code: 2,
        message: `DIVIDER was not a number, ${typeof(values.DIVIDER)} provided`
      }
    }

    if(typeof(values.INPUTARRAY) == "string")
    {
      try
      {
        this.inputArray = JSON.parse(values.INPUTARRAY);
      }
      catch(e)
      {
        throw {
          code: 2,
          message: "The INPUTARRAY could not be parsed"
        };
      }
      if(Array.isArray(this.inputArray))
      {
        for(var i = 0; i < this.inputArray.length; i++)
        {
          if(isNaN(this.inputArray[i]))
          {
            throw {
              code: 1,
              message: `Element ${i} of INPUTARRAY is not numerical`
            }
          }
        }
      }
      else
      {
        throw {
          code: 1,
          message: "INPUTARRAY was valid JSON but was not a valid array"
        }
      }
    }
    else
    {
      throw {
        code: 1,
        message: "INPUTARRAY was not a string and therefore couldn't be converted to an array"
      }
    }

    //INPUTARRAY won't equally fit into more than one DIVIDER since there's not enough numbers
    //In cases where INPUTARRAY is higher, there would be enough numbers
    if(values.INPUTARRAY.length <= 2 && values.DIVIDER > 1)
    {
      throw {
        code: 3,
        message: "INPUTARRAY's length is not supported"
      }
    }
  }

  public divideArray()
  {
    if(this.divider == 0)
    {
      //No divider supplied, therefore only returning the un-nested array
      return this.inputArray;
    }
    else
    {
      //Get the number of values which each nested array should contain
      var valsInNested: number = Math.floor(this.inputArray.length / this.divider);
      var outArr: number[][] = [];
      var thisNestedArr: number[] = [];
      for(var i = 0; i < this.inputArray.length; i++)
      {
        thisNestedArr.push(this.inputArray[i]);
        if(thisNestedArr.length == valsInNested && (outArr.length + 1) < this.divider)
        {
          outArr.push(thisNestedArr);
          thisNestedArr = [];
        }
      }
      if(thisNestedArr.length > 0)
      {
        outArr.push(thisNestedArr)
      }
      return outArr;
    }
  }
}

export default ArrayDivider;
module.exports = ArrayDivider;
