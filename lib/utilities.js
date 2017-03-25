/*
 Borrowed from https://github.com/yannickcr/eslint-plugin-react
 */

function isTypesDecl(str) {
  return str === 'propTypes' || str === 'contextTypes';
}

/**
 * Checks if node is `propTypes` declaration
 * @param {ASTNode} node The AST node being checked.
 * @returns {Boolean} True if node is `propTypes` declaration, false if not.
 */
function isPropTypesDeclaration(context, node) {
  // Special case for class properties
  // (babel-eslint does not expose property name so we have to rely on tokens)
  if (node.type === 'ClassProperty') {
    const tokens = context.getFirstTokens(node, 2);
    if (isTypesDecl(tokens[0].value) || isTypesDecl(tokens[1].value)) {
      return true;
    }
    return false;
  }

  return Boolean(node && isTypesDecl(node.name));
}

module.exports = {
  isPropTypesDeclaration,
};
