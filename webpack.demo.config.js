'use strict';

const isWsl = require('is-wsl');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const src = path.join(__dirname, 'src')

module.exports= env=>{
  const isDev=env==="development"
  return {
    mode: isDev?'development':'production',
    entry: path.join( src, 'index.js'),
    output: {
      path: path.join(__dirname, 'demo'),
      filename:'./html-to-md.js',
      library:'html2md',
      libraryTarget:'window',
    },
    devtool: isDev?'cheap-module-source-map':false,
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
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    stage: 3,
                  }),
                ],
              },
            },
          ]
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
    devServer:isDev ?
      {
        clientLogLevel: 'none',
        overlay:true,
        // useLocalIp:true,
        // host:"0.0.0.0"
        // port:5050
      } :
      {}
  }
};