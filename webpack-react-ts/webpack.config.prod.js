const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
});