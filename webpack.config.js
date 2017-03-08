const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, '/public/build'),
  public: path.join(__dirname, '/public'),
  htmlTemplate: path.join(__dirname, 'src', 'index.ejs')
};

const config = {};

config.development = {
  entry: {
    app: PATHS.app,
  },

  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  devtool: 'eval-source-map',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}], 'react'],
        }
      }]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.htmlTemplate,
    }),
  ]
};

config.production = {
  entry: {
    app: PATHS.app,
  },

  output: {
    path: PATHS.build,
    publicPath: '/build/',
    filename: '[name].bundle.js',
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}], 'react'],
        }
      }]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(PATHS.public, '/index.html'),
      template: PATHS.htmlTemplate,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ]
};

module.exports = function(env) {
  return config[env];
}
