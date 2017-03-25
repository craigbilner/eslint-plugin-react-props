/**
 * @fileoverview Rule to flag use of an invalid prop type
 * @author Craig Bilner
 */

'use strict';

const utils = require('../utilities');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = (context) => {
  /*
    1 = proptype
    2 = invalid (bad spelling)
    3 = function(proptype | function)
    4 = function(jstype)
    5 = function(array-with-strings)
    6 = function(array-with-proptypes)
    7 = function(object-with-proptypes)
   */
  const validProps = {
    array: 1,
    bool: 1,
    boolean: 2,
    func: 1,
    function: 2,
    number: 1,
    object: 1,
    obj: 2,
    string: 1,
    symbol: 1,
    any: 1,
    arrayOf: 3,
    element: 1,
    instanceOf: 4,
    node: 1,
    objectOf: 3,
    oneOf: 5,
    oneOfType: 6,
    shape: 7,
  };

  function getPropValue(propName) {
    return validProps[propName];
  }

  const argType = {
    3: 'proptype or function',
    4: 'JavaScript type',
    5: 'array with strings',
    6: 'array with proptypes',
    7: 'object with proptypes as values',
  };

  function isIdentifier(n, ident) {
    return n.type === 'Identifier' && (ident === undefined || n.name === ident);
  }

  function isIdentifierOrRawLiteral(n) {
    if (n.type === 'Identifier') {
      return n.name;
    }
    if (n.type === 'Literal') {
      return n.raw;
    }
    return '<unknown>';
  }

  function isPropTypesExpression(n) {
    if (n.type !== 'MemberExpression') return false;
    if (isIdentifier(n.object, 'PropTypes')) return true;
    return n.object.type === 'MemberExpression' && isIdentifier(n.object.object, 'React') && isIdentifier(n.object.property, 'PropTypes');
  }

  function isArray(n) {
    return n.type === 'ArrayExpression';
  }

  function isObject(n) {
    return n.type === 'ObjectExpression';
  }

  function assertExpectedReactPropSyntax(key, origDeclaration, allowIsRequired) {
    let declaration = origDeclaration;
    if (declaration.type === 'MemberExpression' &&
      isIdentifier(declaration.property, 'isRequired')) {
      if (!allowIsRequired) {
        return context.report(origDeclaration, `property '${key}': please move isRequired qualifier outside the oneOfType() declaration e.g. '(React.)PropTypes.oneOfType(...).isRequired'`);
      }
      declaration = declaration.object;
    }
    if (declaration.type === 'CallExpression') {
      if (!isPropTypesExpression(declaration.callee) ||
          !isIdentifier(declaration.callee.property)) {
        return context.report(origDeclaration, `property '${key}': unsupported proptypes call syntax`);
      }
      const propType = declaration.callee.property.name;
      const propValue = getPropValue(propType);
      switch (propValue) {
        case 1: return context.report(origDeclaration, `property '${key}': ${propType} is a simple prop type, should not be called like a function`);
        case 2: return context.report(origDeclaration, `property '${key}': ${propType} is a misspelled prop type. Please correct spelling`);
        case 3: case 4: case 5: case 6: case 7: break;
        default: return context.report(origDeclaration, `property '${key}': ${propType} is not a known prop type`);
      }
      if (declaration.arguments.length !== 1) {
        return context.report(origDeclaration, `property '${key}': ${propType} expects exactly one argument of type ${argType[propValue]}`);
      }
      const arg = declaration.arguments[0];
      if (((propValue === 3 || propValue === 4) && (isArray(arg) || isObject(arg)))
        || ((propValue === 5 || propValue === 6) && !isArray(arg))
        || (propValue === 7 && !isObject(arg))) {
        return context.report(origDeclaration, `property '${key}': ${propType} expects exactly one argument of type ${argType[propValue]}`);
      }
      switch (propValue) {
        case 3:
          assertExpectedReactPropSyntax(key, arg, true);
          break;
        case 4:
          if (arg.type === 'Literal') {
            context.report(origDeclaration, `property '${key}': ${propType} argument must not be a literal`);
          }
          break;
        case 5:
          arg.elements.every((elem) => {
            if (elem.type !== 'Literal') {
              context.report(origDeclaration, `property '${key}': ${propType} array entries must be literals`);
              return false;
            }
            return true;
          });
          break;
        case 6:
          arg.elements.forEach(elem => assertExpectedReactPropSyntax(key, elem, false));
          break;
        case 7:
          arg.properties.every((elem) => {
            if (elem.type !== 'Property') {
              context.report(origDeclaration, `property '${key}': ${propType} object must only consist of properties`);
              return false;
            }
            if (!isIdentifierOrRawLiteral(elem.key)) {
              context.report(origDeclaration, `property '${key}': ${propType} properties must be identifiers or literals`);
            }
            assertExpectedReactPropSyntax(key, elem.value, true);
            return true;
          });
          break;
        default:
          throw new Error(`Unhandled propValue ${propValue}`);
      }
    } else if (isPropTypesExpression(declaration) && isIdentifier(declaration.property)) {
      const propType = declaration.property.name;
      const propValue = getPropValue(propType);
      switch (propValue) {
        case 1: return null;
        case 2: return context.report(origDeclaration, `property '${key}': ${propType} is a misspelled prop type. Please correct spelling`);
        case 3: case 4: case 5: case 6: case 7: return context.report(origDeclaration, `property '${key}': ${propType} expects to be called like a function with an argument of type ${argType[propValue]}`);
        default: return context.report(origDeclaration, `property '${key}': ${propType} is not a valid PropType`);
      }
    } else if (declaration.type === 'FunctionExpression' ||
               declaration.type === 'ArrowFunctionExpression') {
      // ok
    } else {
      // console.log(declaration);
      return context.report(origDeclaration, `property '${key}': unknown use of PropTypes`);
    }
    return null;
  }

  function checkProperties(declarations) {
    declarations.forEach((declaration) => {
      const identifierOrRawLiteral = isIdentifierOrRawLiteral(declaration.key);
      assertExpectedReactPropSyntax(identifierOrRawLiteral, declaration.value, true);
    });
  }

  return {
    MemberExpression(node) {
      if (utils.isPropTypesDeclaration(context, node.property)) {
        const right = node.parent.right;
        if (right && right.type === 'ObjectExpression') {
          checkProperties(right.properties);
        }
      }
    },
  };
};

module.exports.schema = [
  // JSON Schema for rule options goes here
];
