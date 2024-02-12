const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: false,
    })
  ],
});