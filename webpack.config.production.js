const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'build');
const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  mode: 'production',
  target: 'electron-renderer',
  context: SRC_DIR,
  entry: {
    app: ['babel-polyfill', './index.js'],
    vendor: [
      '@material-ui/core',
    ],
  },
  output: {
    filename: 'js/bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
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
      {
        from: 'public/icons/**/*',
        to: 'icons/',
        flatten: true,
        force: true,
      },
    ]),
  ],
};
