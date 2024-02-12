const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyWebpackPlugin = require("./my-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
              publicPath: 'images/',
              esModule: false
						}
					}
				]
			},
      {
				test: /\.(ttf|otf|woff|woff2|eot)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
              publicPath: 'fonts/',
              esModule: false
						}
					}
				]
			}
		]
	},
  plugins: [
    new MyWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
}