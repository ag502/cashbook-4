const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  entry: './src/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    assetModuleFilename: 'assets/images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']],
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(png|jpg|jpeg|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /.(ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  devServer: {
    contentBase: BUILD_DIR,
  },
};
