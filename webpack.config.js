const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  htmlTemplate: path.join(__dirname, 'src', 'index.ejs')
};

module.exports = {
  entry: {
    app: PATHS.app,
  },

  output: {
    path: PATHS.build,
    publicPath: '/build/',
    filename: '[name].bundle.js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}], 'react'],
        }
      }]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(PATHS.build, 'index.html'),
      template: PATHS.htmlTemplate,
    }),
  ]
};
