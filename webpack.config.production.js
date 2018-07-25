const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  mode: 'production',
  context: SRC_DIR,
  entry: {
    app: './index.js',
    vendor: [
      '@material-ui/core',
    ],
  },
  output: {
    filename: 'js/bundle.[hash].js',
    path: DIST_DIR,
    publicPath: '/',
  },
  devtool: 'source-map',
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
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'styles/styles.[hash].css',
      allChunks: true,
    }),
  ],
};
