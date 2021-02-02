require("dotenv").config();

const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const fileName = (ext) => `[name].${ext}`;

const isDeploy = process.env.GP_DEPLOY === "true";

const publicUrl = process.env.PUBLIC_URL;

const babelLoader = {
  loader: "babel-loader",
  options: {
    plugins: [require.resolve("react-refresh/babel")],
  },
};

const CONFIGS = {
  dist: {
    mode: "production",
    context: path.resolve(__dirname, "./src"),
    devtool: "source-map",
    entry: {
      index: ["./index.ts"],
      "index.min": ["./index.ts"],
    },
    output: {
      filename: fileName("js"),
      path: path.resolve(__dirname, "./dist"),
      libraryTarget: "amd",
    },
    externals: {
      react: "amd react",
      /* "react-dom": "amd react-dom", */
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js/,
        }),
        new OptimizeCssAssetsPlugin({}),
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.dist.json",
              },
            },
          ],
        },
      ],
    },
  },
  production: {
    mode: "production",
    context: path.resolve(__dirname, "./demo"),
    devtool: "source-map",
    entry: {
      index: ["./index.tsx"],
      "index.min": ["./index.tsx"],
    },
    output: {
      publicPath: isDeploy ? `${publicUrl}/` : "",
      filename: fileName("js"),
      path: path.resolve(__dirname, "./build"),
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js/,
        }),
        new OptimizeCssAssetsPlugin({}),
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: fileName("css") }),
      new HTMLWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: true,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.json",
              },
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
  },
  default: {
    mode: "development",
    context: path.resolve(__dirname, "./demo"),
    devtool: "eval-source-map",
    entry: {
      index: ["./index.tsx"],
    },
    output: {
      filename: fileName("js"),
      path: path.resolve(__dirname, "./distServer"),
    },
    devServer: {
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
    plugins: [
      new MiniCssExtractPlugin({ filename: fileName("css") }),
      new ReactRefreshWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: false,
        },
      }),
    ],
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
              options: {
                configFile: "tsconfig.json",
              },
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
  },
};

const config = CONFIGS[process.env.CONFIG] || CONFIGS.default;

module.exports = {
  ...config,
};
