'use strict';

const isWsl = require('is-wsl');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const src = path.join(__dirname, 'src')

module.exports= {
  mode: 'production',
  entry: path.join( src, 'index.js'),
  output: {
    path: path.join(__dirname, 'demo'),
    filename:'html2Md.js',
    library:'html2Md',
    libraryTarget:'window',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
      }),
    ],
  },

  resolve: {
    extensions: [ '.js', '.json'],
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js)$/,
        include:path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: true,
          compact: true
        },
      },
	  {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ],
  node:{
    child_process: 'empty'
  }
};