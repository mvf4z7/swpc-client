const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, '/public/build'),
  public: path.join(__dirname, '/public'),
  htmlTemplate: path.join(__dirname, 'src', 'index.ejs'),
  components: path.join(__dirname, 'src', 'components'),
  lib: path.join(__dirname, 'src', 'lib'),
  reduxModules: path.join(__dirname, 'src', 'redux-modules'),
  util: path.join(__dirname, 'src', 'util'),
  views: path.join(__dirname, 'src', 'views'),
};

const aliases = {
  Components: PATHS.components,
  Views: PATHS.views,
  Lib: PATHS.lib,
  ReduxModules: PATHS.reduxModules,
  Util: PATHS.util,
};

const config = {};

config.development = {
  entry: {
    app: [ 'babel-polyfill', PATHS.app ],
  },

  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}], 'react'],
          plugins: [ 'transform-object-rest-spread' ]
        }
      }]
    }]
  },

  resolve: {
    alias: aliases,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.htmlTemplate,
    }),
    new webpack.DefinePlugin({
      APP_ENV: {
        API_ROOT: JSON.stringify('http://127.0.0.1:3000'),
        API_VERS: JSON.stringify('/api'),
      },
    }),
  ]
};

config.production = {
  entry: {
    app: [ 'babel-polyfill', PATHS.app ],
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
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}], 'react'],
          plugins: [ 'transform-object-rest-spread' ]
        }
      }]
    }]
  },

  resolve: {
    aliases: aliases,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(PATHS.public, '/index.html'),
      template: PATHS.htmlTemplate,
    }),
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      'APP_ENV' : {
        'API_ROOT': JSON.stringify('undefined'),
      },
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
};

module.exports = function(env) {
  return config[env];
}
