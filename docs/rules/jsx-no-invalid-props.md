# JSX No invalid props (jsx-no-invalid-props)

Validates all `x.propTypes = { ... }` and `x.contextTypes = { ... }` statements for proper syntax (also as class members).

## Rule Details

This rule checks propTypes on a class and validates the PropTypes against a static list from the [React docs](https://github.com/facebook/react/blob/master/docs/docs/typechecking-with-proptypes.md).

It supports arrays, shapes etc, nested to any depth.

The validation is rather strict; hopefully it will not generate false error reports. Please [report](https://github.com/craigbilner/eslint-plugin-react-props/issues) any broken error reports you may encounter.

## Rule Options

None yet

## Todo

Make more intelligent when determining PropTypes i.e. could have been imported as "p" which would currently fail:

```js
propTypes: {
    a: p.array
};
```
