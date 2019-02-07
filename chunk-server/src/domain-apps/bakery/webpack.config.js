/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = [
  {
    mode: "development",
    name: "app",
    context: __dirname,
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.min.js"
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "eslint-loader"
            }
          ]
        },
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, "css-loader?modules"]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".css"]
    },
    devtool: "inline-sourcemap",
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "src/index.html"),
        inject: false,
        templateParameters: function(compilation, assets, options) {
          return {
            files: assets,
            options: options,
            webpackConfig: compilation.options,
            webpack: compilation.getStats().toJson()
          };
        }
      }),
      new MiniCssExtractPlugin({ filename: "index.css" })
    ]
  }
];
