const nodeExternals = require("webpack-node-externals");
const path = require("path");

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};

const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "src/index.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    "clientHome.js": path.resolve(__dirname, "src/public/clientHome.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name]",
  },
};

const ssrConfig = {
  mode: "development",
  target: "web",
  entry: {
    "serverHome.js": path.resolve(__dirname, "src/public/serverHome.js"),
  },
  module: {
    rules: [js],
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name]",
  },
};

module.exports = [serverConfig, clientConfig, ssrConfig];
