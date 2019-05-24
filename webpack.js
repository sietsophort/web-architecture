const webpack = require('webpack');
const path = require('path');
// const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

const rootPath = './src';
const projectName = require('./package.json').name;

const preVersionPlugin = [];
module.exports = (optVersion, overridedOpts) => {
  const opts = overridedOpts || {};
  const result = Object.assign({
    devtool: 'eval',
    mode: 'development', // production, none
    entry: {
      bundle: [
        path.resolve(__dirname, `${rootPath}/index.jsx`),
        path.resolve(__dirname, `${rootPath}/index.scss`),
      ],
    },
    output: {
      path: path.resolve(__dirname, `./public/js`),
      filename: `[name]${optVersion}.js`,
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        'src',
      ],
    },
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        {
          exclude: /(node_modules|src\/client\/libs)/,
          test: /\.jsx?$/,
          loaders: ['babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2'],
        },
        {
          exclude: /(node_modules)/,
          test: /\.scss$/,
          loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        },
        {
          test: /\.(jpe?g|ico|png|gif)$/i,
          loader: 'file-loader?name=../images/[name].[ext]',
        },
        {
          test: /\.(woff2?|ttf|eot|svg)$/i,
          loader: 'file-loader?name=../fonts/[name].[ext]',
        },
        {
          test: /\.(json)$/i,
          loader: 'json',
        },
        { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, '../src') },
      ],
    },
    watchOptions: {
      aggregateTimeout: 300,
    },
  }, opts);
  return result;
};
