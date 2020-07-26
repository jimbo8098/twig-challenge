# Usage
1. Set the relevant environment variables:

- DIVIDER: The number of nested arrays which should exist in the output
- INPUTARRAY: The array to be divided by DIVIDER

2. Run `npm install`
3. Run `npx tsc` to compile the Typescript into Javascript.
4. Run `node index.js` or `npm start` within the project directory

# Exit Codes

1 = The INPUTARRAY is not within specifications
2 = The DIVIDER is not within specifications
3 = The DIVIDER or INPUTARRAY values are not of the expected type

# Testing
There is testing implemented in the test/ directory using mocha

# CI
CI makes sure the app runs as expected

