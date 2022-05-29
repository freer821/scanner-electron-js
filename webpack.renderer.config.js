/* eslint-disable import/order */
const rules = require('./webpack.rules');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FailOnErrorsPlugin = require('fail-on-errors-webpack-plugin');

rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { url: false },
      },
      'sass-loader',
    ],
  },
  {
    test: /\.(png|jpe?g|gif|ico|svg)$/, // We will handle of these file extensions
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          publicPath: '../.',
        },
      },
    ],
  },
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  externals: {
    fabric: 'fabric',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify('http://localhost:8099'),
      },
    }),
    new FailOnErrorsPlugin({
      failOnErrors: true,
      failOnWarnings: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, '.webpack/renderer', 'assets'),
        },
      ],

    }),
  ],
};
