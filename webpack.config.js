const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

var SRC = path.resolve(__dirname, 'src/assets/audio');

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        test: /.(css|sass|scss)$/,
      },
      {
        type: "asset",
        test: /\.(svg|jpg|png)$/,
      },
      {
        test: /\.mp3$/,
        include: SRC,
        loader: 'file-loader'
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
