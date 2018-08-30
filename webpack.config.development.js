const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'build');
const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  context: SRC_DIR,
  entry: ['babel-polyfill', './index.js'],
  devtool: 'eval-source-map',
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s?css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {
                      browsers: 'last 2 versions',
                    },
                  },
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin([BUILD_DIR]),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'styles/style.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public/images/**/*',
        to: 'images/',
        flatten: true,
        force: true,
      },
    ]),
  ],
  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
  },
  watch: true,
};
