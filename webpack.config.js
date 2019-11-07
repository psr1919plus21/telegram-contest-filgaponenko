const path = require('path');

module.exports = {
  entry: {
    login: './src/login'
  },
  module: {
    rules: [
        {
          test: /\js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};