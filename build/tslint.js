module.exports = {
  formatter: 'stylish',
  configuration: {
    rules: {
      'class-name': true,
      'only-arrow-functions': true,
      'no-magic-numbers': true,
      typedef: [true, 'call-signature', 'property-declaration', 'parameter'],
      curly: true,
      'no-console': [true, 'log', 'debug', 'error', 'warn'],
      'triple-equals': true
    }
  }
};
