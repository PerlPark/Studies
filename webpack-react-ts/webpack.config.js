const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MyWebpackPlugin(),
  ],
}