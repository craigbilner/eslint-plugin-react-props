/* eslint-disable import/no-unresolved, import/extensions */

import React from 'react';

const MyComponent = {};

/*
 The content below this comment is loosely based on one of the examples from the below url:
 https://github.com/facebook/react/blob/bc86ac4380/docs/docs/typechecking-with-proptypes.md
 .. which is licensed under https://creativecommons.org/licenses/by/4.0/
 This set covers most of the inavlid permutations
 */
MyComponent.propTypes = {
  badBool: React.PropTypes.boolean,
  badFunc: React.PropTypes.function,
  badUnknown: React.PropTypes.unknown,
  badMessage: React.PropTypes.instanceOf('Object'),
  badEnum: React.PropTypes.oneOf([React]),
  badUnion: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.number.isRequired,
  ]),
  badArrayOf: React.PropTypes.arrayOf('Array'),
  badObjectOf: React.PropTypes.objectOf('Object'),
  badObjectWithShape: React.PropTypes.shape({
    color: 'lol',
    fontSize: 5,
  }),

  nonFuncArray: React.PropTypes.array(),
  nonFuncBool: React.PropTypes.bool(),
  nonFuncFunc: React.PropTypes.func(),
  nonFuncNumber: React.PropTypes.number(),
  nonFuncObject: React.PropTypes.object(),
  nonFuncString: React.PropTypes.string(),
  nonFuncSymbol: React.PropTypes.symbol(),
  nonFuncNode: React.PropTypes.node(),
  nonFuncElement: React.PropTypes.element(),
  nonFuncAny: React.PropTypes.any(),

  missingArgMessage: React.PropTypes.instanceOf(),
  missingArgEnum: React.PropTypes.oneOf(),
  missingArgUnion: React.PropTypes.oneOfType(),
  missingArgArrayOf: React.PropTypes.arrayOf(),
  missingArgObjectOf: React.PropTypes.objectOf(),
  missingArgObjectWithShape: React.PropTypes.shape(),

  tooManyArgMessage: React.PropTypes.instanceOf('', ''),
  tooManyArgEnum: React.PropTypes.oneOf('', ''),
  tooManyArgUnion: React.PropTypes.oneOfType('', ''),
  tooManyArgArrayOf: React.PropTypes.arrayOf('', ''),
  tooManyArgObjectOf: React.PropTypes.objectOf('', ''),
  tooManyArgObjectWithShape: React.PropTypes.shape('', ''),

  badArgMessage: React.PropTypes.instanceOf({}),
  badArgEnum: React.PropTypes.oneOf({}),
  badArgUnion: React.PropTypes.oneOfType({}),
  badArgArrayOf: React.PropTypes.arrayOf([]),
  badArgObjectOf: React.PropTypes.objectOf({}),
  badArgObjectWithShape: React.PropTypes.shape([]),
};
