'use strict';

require('babel-eslint');
const fs = require('fs');
const path = require('path');

const rule = require('../../../lib/rules/jsx-no-invalid-props');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('jsx-no-invalid-props', rule, {
  valid: [
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'valid-1.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'valid-2.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'ignored-1.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  invalid: [
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'invalid-2.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'property \'h\': arrayOf expects to be called like a function with an argument of type proptype or function',
          line: 15,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'j\': instanceOf expects to be called like a function with an argument of type JavaScript type',
          line: 17,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'l\': objectOf expects to be called like a function with an argument of type proptype or function',
          line: 19,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'m\': oneOf expects to be called like a function with an argument of type array with strings',
          line: 20,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'n\': oneOfType expects to be called like a function with an argument of type array with proptypes',
          line: 21,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'o\': shape expects to be called like a function with an argument of type object with proptypes as values',
          line: 22,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'w\': arrayOf expects to be called like a function with an argument of type proptype or function',
          line: 30,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'y\': instanceOf expects to be called like a function with an argument of type JavaScript type',
          line: 32,
          column: 6,
          type: 'MemberExpression',
        },
        {
          message: 'property \'aa\': objectOf expects to be called like a function with an argument of type proptype or function',
          line: 34,
          column: 7,
          type: 'MemberExpression',
        },
        {
          message: 'property \'ab\': oneOf expects to be called like a function with an argument of type array with strings',
          line: 35,
          column: 7,
          type: 'MemberExpression',
        },
        {
          message: 'property \'ac\': oneOfType expects to be called like a function with an argument of type array with proptypes',
          line: 36,
          column: 7,
          type: 'MemberExpression',
        },
        {
          message: 'property \'ad\': shape expects to be called like a function with an argument of type object with proptypes as values',
          line: 37,
          column: 7,
          type: 'MemberExpression',
        },
      ],
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'invalid-1.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'property \'badBool\': boolean is a misspelled prop type. Please correct spelling',
          line: 14,
          column: 12,
          type: 'MemberExpression',
        },
        {
          message: 'property \'badFunc\': function is a misspelled prop type. Please correct spelling',
          line: 15,
          column: 12,
          type: 'MemberExpression',
        },
        {
          message: 'property \'badUnknown\': unknown is not a valid PropType',
          line: 16,
          column: 15,
          type: 'MemberExpression',
        },
        {
          message: 'property \'badMessage\': instanceOf argument must not be a literal',
          line: 17,
          column: 15,
          type: 'CallExpression',
        },
        {
          message: 'property \'badEnum\': oneOf array entries must be literals',
          line: 18,
          column: 12,
          type: 'CallExpression',
        },
        {
          message: 'property \'badUnion\': please move isRequired qualifier outside the oneOfType() declaration e.g. \'(React.)PropTypes.oneOfType(...).isRequired\'',
          line: 20,
          column: 5,
          type: 'MemberExpression',
        },
        {
          message: 'property \'badUnion\': please move isRequired qualifier outside the oneOfType() declaration e.g. \'(React.)PropTypes.oneOfType(...).isRequired\'',
          line: 21,
          column: 5,
          type: 'MemberExpression',
        },
        {
          message: 'property \'badArrayOf\': unknown use of PropTypes',
          line: 23,
          column: 39,
          type: 'Literal',
        },
        {
          message: 'property \'badObjectOf\': unknown use of PropTypes',
          line: 24,
          column: 41,
          type: 'Literal',
        },
        {
          message: 'property \'badObjectWithShape\': unknown use of PropTypes',
          line: 26,
          column: 12,
          type: 'Literal',
        },
        {
          message: 'property \'badObjectWithShape\': unknown use of PropTypes',
          line: 27,
          column: 15,
          type: 'Literal',
        },
        {
          message: 'property \'nonFuncArray\': array is a simple prop type, should not be called like a function',
          line: 30,
          column: 17,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncBool\': bool is a simple prop type, should not be called like a function',
          line: 31,
          column: 16,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncFunc\': func is a simple prop type, should not be called like a function',
          line: 32,
          column: 16,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncNumber\': number is a simple prop type, should not be called like a function',
          line: 33,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncObject\': object is a simple prop type, should not be called like a function',
          line: 34,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncString\': string is a simple prop type, should not be called like a function',
          line: 35,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncSymbol\': symbol is a simple prop type, should not be called like a function',
          line: 36,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncNode\': node is a simple prop type, should not be called like a function',
          line: 37,
          column: 16,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncElement\': element is a simple prop type, should not be called like a function',
          line: 38,
          column: 19,
          type: 'CallExpression',
        },
        {
          message: 'property \'nonFuncAny\': any is a simple prop type, should not be called like a function',
          line: 39,
          column: 15,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgMessage\': instanceOf expects exactly one argument of type JavaScript type',
          line: 41,
          column: 22,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgEnum\': oneOf expects exactly one argument of type array with strings',
          line: 42,
          column: 19,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgUnion\': oneOfType expects exactly one argument of type array with proptypes',
          line: 43,
          column: 20,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgArrayOf\': arrayOf expects exactly one argument of type proptype or function',
          line: 44,
          column: 22,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgObjectOf\': objectOf expects exactly one argument of type proptype or function',
          line: 45,
          column: 23,
          type: 'CallExpression',
        },
        {
          message: 'property \'missingArgObjectWithShape\': shape expects exactly one argument of type object with proptypes as values',
          line: 46,
          column: 30,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgMessage\': instanceOf expects exactly one argument of type JavaScript type',
          line: 48,
          column: 22,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgEnum\': oneOf expects exactly one argument of type array with strings',
          line: 49,
          column: 19,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgUnion\': oneOfType expects exactly one argument of type array with proptypes',
          line: 50,
          column: 20,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgArrayOf\': arrayOf expects exactly one argument of type proptype or function',
          line: 51,
          column: 22,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgObjectOf\': objectOf expects exactly one argument of type proptype or function',
          line: 52,
          column: 23,
          type: 'CallExpression',
        },
        {
          message: 'property \'tooManyArgObjectWithShape\': shape expects exactly one argument of type object with proptypes as values',
          line: 53,
          column: 30,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgMessage\': instanceOf expects exactly one argument of type JavaScript type',
          line: 55,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgEnum\': oneOf expects exactly one argument of type array with strings',
          line: 56,
          column: 15,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgUnion\': oneOfType expects exactly one argument of type array with proptypes',
          line: 57,
          column: 16,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgArrayOf\': arrayOf expects exactly one argument of type proptype or function',
          line: 58,
          column: 18,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgObjectOf\': objectOf expects exactly one argument of type proptype or function',
          line: 59,
          column: 19,
          type: 'CallExpression',
        },
        {
          message: 'property \'badArgObjectWithShape\': shape expects exactly one argument of type object with proptypes as values',
          line: 60,
          column: 26,
          type: 'CallExpression',
        },
      ],
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'invalid-3.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'property \'a\': arr is not a valid PropType',
          line: 8,
          column: 6,
          type: 'MemberExpression',
        },
      ],
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'invalid-4.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'property \'a\': unknown use of PropTypes',
          line: 8,
          column: 6,
          type: 'Identifier',
        },
      ],
    },
    {
      code: fs.readFileSync(path.join(__dirname, 'jsx-no-invalid-props', 'invalid-5.js'), 'utf-8'),
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'property \'b\': unknown use of PropTypes',
          line: 8,
          column: 6,
          type: 'Identifier',
        },
      ],
    },
  ],
});
