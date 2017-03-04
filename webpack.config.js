const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  htmlTemplate: path.join(__dirname, 'app', 'index.ejs')
};

module.exports = {
  entry: {
    app: PATHS.app,
  },

  output: {
    path: PATHS.build,
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
