# eslint-plugin-react-props

[![Greenkeeper badge](https://badges.greenkeeper.io/craigbilner/eslint-plugin-react-props.svg)](https://greenkeeper.io/)

[![CircleCI](https://circleci.com/gh/craigbilner/eslint-plugin-react-props.svg?style=svg)](https://circleci.com/gh/craigbilner/eslint-plugin-react-props)
[![npm Version](https://img.shields.io/npm/v/eslint-plugin-react-props.svg)](https://www.npmjs.com/package/eslint-plugin-react-props)

a collection of prop type rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-props`:

```
$ npm install eslint-plugin-react-props --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-props` globally.

## Usage

Add `react-props` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-props"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-props/rule-name": 2
    }
}
```

## Supported Rules

* [jsx-no-invalid-props](docs/rules/jsx-no-invalid-props.md): Ensure that PropTypes are valid





