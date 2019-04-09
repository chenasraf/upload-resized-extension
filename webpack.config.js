const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const package = require('./package.json')

const paths = {
  nodeModules: path.join(process.cwd(), 'node_modules'),
  dist: path.join(process.cwd(), 'dist'),
  src: path.join(process.cwd(), 'src'),
  public: path.join(process.cwd(), 'public'),
}

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: {
    'background': path.join(paths.src, 'background.js'),
    'frontend': path.join(paths.src, 'frontend.jsx'),
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: [/\.jsx?/],
        exclude: paths.nodeModules,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpe?g|bmp|gif)/i,
        loader: require.resolve('chrome-url-loader'),
        options: {
          publicDir: path.join(paths.dist, 'images'),
          baseDir: paths.public,
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin([{
      from: paths.public,
      to: paths.build,
      transform(content, _path) {
        return content.toString().replace('{{VERSION}}', package.version)
      }
    }])
  ],
  externals: {
    chrome: 'chrome'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
