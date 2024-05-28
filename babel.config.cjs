module.exports = exports = {
  presets: [
    [
      '@babel/preset-env', {
        useBuiltIns: 'entry',
        corejs: 3,
        exclude: [ 'transform-typeof-symbol' ],
        modules: process.env.ESM ? false : 'cjs',
        targets: 'maintained node versions',
      },
    ],
    [ '@babel/preset-react', {
      runtime: 'automatic',
    } ],
  ],
  plugins: process.env.NODE_ENV === 'test'
    ? []
    : [
      [ 'babel-plugin-add-import-extension', { extension: process.env.ESM ? 'mjs' : 'cjs' } ],
    ],
};
