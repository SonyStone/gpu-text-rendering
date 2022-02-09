import 'webpack-dev-server';

import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

// import { WasmPackPlugin } from "./wasm-pack-plugin";

const dist = path.resolve(__dirname, "dist");
const pkg = path.resolve(__dirname, "pkg");

const webpackConfig: Webpack.Configuration = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, "src/index.ts")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {onlyCompileBundledFiles: true},
        exclude: /node_modules/,
      },
      {
        test: /\.(frag|vert)$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    static: [dist, pkg],
    open: false,
    headers: {
      'Cache-Control': 'no-store',
    },
    watchFiles: [pkg],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "static")
      ],
    }),

    // new WasmPackPlugin({
    //   crateDirectory: __dirname,
    // }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
  cache: false,
};

const compiler = Webpack({
    ...webpackConfig,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 200,
    },
});

const server = new WebpackDevServer(webpackConfig.devServer, compiler);

const runServer = async () => {
    console.log('Starting server...');
    await server.start();
};

runServer();