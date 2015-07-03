var path = require("path");

module.exports = {

  resolve: {
    root: path.join(__dirname, "client")
  },

  entry: {
    app: ['entry.jsx']
  },

  output: {
    path: './build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader?harmony&es5" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
    ]
  },

  devtool: 'source-map'

};