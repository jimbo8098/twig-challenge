import ArrayDivider from "./ArrayDivider";
const DIVIDER : any = process.env['DIVIDER'];
const INPUTARRAY: any = process.env['INPUTARRAY'];

function exit(code:number)
{
  //In case it's useful to log exit codes
  return process.exit(code)
}

var arrayDivider = new ArrayDivider();
try
{
  arrayDivider.parseInputs({
    DIVIDER: DIVIDER,
    INPUTARRAY: INPUTARRAY
  });
}
catch(e)
{
  //Log the message and code in console then exit with the code
  console.log(e);
  exit(e.code);
}
console.log(arrayDivider.divideArray());
