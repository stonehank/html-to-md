'use strict'

const isWsl = require('is-wsl')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const src = path.join(__dirname, 'src')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  entry: path.join(src, 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      root: 'html2md',
      amd: 'html2md',
      commonjs: 'html2md',
    },
    libraryExport: 'default',
    globalObject: 'this',
    libraryTarget: 'umd',
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
            drop_console: false,
            pure_funcs:['console.log', 'console.warn', 'console.error']
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
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: true,
          compact: true,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
}
