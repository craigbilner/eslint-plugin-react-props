/* eslint-disable import/no-unresolved, import/extensions */

import React from 'react';

const MyComponent = {};
const Message = {};

/*
 The content below this comment is loosely based on one of the examples from the below url:
 https://github.com/facebook/react/blob/bc86ac4380/docs/docs/typechecking-with-proptypes.md
 .. which is licensed under https://creativecommons.org/licenses/by/4.0/
 This set covers most of the remaining acceptable permutations not covered in valid-1.js
 */
MyComponent.propTypes = {
  requiredArray: React.PropTypes.array.isRequired,
  requiredBool: React.PropTypes.bool.isRequired,
  requiredFunc: React.PropTypes.func.isRequired,
  requiredNumber: React.PropTypes.number.isRequired,
  requiredObject: React.PropTypes.object.isRequired,
  requiredString: React.PropTypes.string.isRequired,
  requiredSymbol: React.PropTypes.symbol.isRequired,
  requiredNode: React.PropTypes.node.isRequired,
  requiredElement: React.PropTypes.element.isRequired,
  requiredMessage: React.PropTypes.instanceOf(Message).isRequired,
  requiredEnum: React.PropTypes.oneOf(['News', 'Photos']).isRequired,
  requiredUnion: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.instanceOf(Message),
  ]).isRequired,
  requiredArrayOf: React.PropTypes.arrayOf(React.PropTypes.number.isRequired).isRequired,
  requiredObjectOf: React.PropTypes.objectOf(React.PropTypes.number.isRequired).isRequired,
  requiredObjectWithShape: React.PropTypes.shape({
    color: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.number.isRequired,
  }),
  deepShape: React.PropTypes.shape({
    color: React.PropTypes.string.isRequired,
    deep: React.PropTypes.shape({
      foo: React.PropTypes.string.isRequired,
      union: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
    }),
  }),
  optionalAny: React.PropTypes.any,
  customProp(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(`error ${componentName}`);
    }
    return null;
  },
  customObjectProp: React.PropTypes.objectOf((propValue,
                                              key,
                                              componentName,
                                              location,
                                              propFullName) => {
    if (!/matchme/.test(propValue[key])) {
      return new Error(`error ${propFullName}`);
    }
    return null;
  }),
};
