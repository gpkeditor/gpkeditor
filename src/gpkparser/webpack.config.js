//一个常见的Webpack配置文件
var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/index.js",
  output: {
    path: __dirname + "/build",
    filename: "gpkparser.min.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
