const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const fileName = (ext) => `[name].${ext}`;

const isDist = process.env.DIST === "true";

console.log(isDist);

const babelLoader = {
  loader: "babel-loader",
  ...(isDist
    ? {}
    : {
        options: {
          plugins: [require.resolve("react-refresh/babel")],
        },
      }),
};

module.exports = {
  mode: isDist ? "production" : "development",

  context: isDist
    ? path.resolve(__dirname, "./src")
    : path.resolve(__dirname, "./demo"),

  devtool: isDist ? "source-map" : "eval-source-map",

  entry: isDist
    ? {
        index: ["./index.ts"],
        "index.min": ["./index.ts"],
      }
    : {
        main: ["./index.tsx"],
      },

  output: {
    filename: fileName("js"),
    path: isDist
      ? path.resolve(__dirname, "./dist")
      : path.resolve(__dirname, "./distServer"),
    ...(isDist ? { libraryTarget: "umd" } : {}),
  },

  externals: isDist
    ? {
        react: "umd react",
        "react-dom": "umd react-dom",
      }
    : undefined,

  devServer: isDist
    ? undefined
    : {
        port: 9000,
        hot: true,
        compress: true,
        publicPath: "/",
        contentBase: path.join(__dirname, "./distServer"),
        historyApiFallback: true,
        writeToDisk: false,
        stats: "minimal",
      },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
  },

  optimization: isDist
    ? {
        minimizer: [
          new TerserPlugin({
            include: /\.min\.js/,
          }),
          new OptimizeCssAssetsPlugin({}),
        ].filter(Boolean),
      }
    : undefined,

  plugins: [
    isDist && new CleanWebpackPlugin(),
    !isDist && new MiniCssExtractPlugin({ filename: fileName("css") }),
    !isDist && new ReactRefreshWebpackPlugin(),
    !isDist &&
      new HTMLWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: false,
        },
      }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [babelLoader],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
