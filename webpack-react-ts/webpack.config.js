const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyWebpackPlugin = require("./my-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MyWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
}