var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, './release/');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  entry: {
    app : path.join(__dirname, '/src/app/app.jsx'),
    upload: path.join(__dirname, '/src/app/upload.jsx'),
  },
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ["", ".js", ".jsx"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: '[name].js'  //Name of output file
  },
  plugins: [
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname,"src"))
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loaders: ['babel'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(json)$/,
        loaders: ['json-loader'],
      }
    ]
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc' //Rules for eslint
  },
};

module.exports = config;
