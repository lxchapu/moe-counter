const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const yaml = require('yamljs');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
  },
  module: {
    rules: [
      {
        test: /\.html?$/i,
        type: 'asset/source',
      },
      {
        test: /\.(gif|png)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.yml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CleanWebpackPlugin()],
};
