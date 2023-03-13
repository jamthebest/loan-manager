import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const env = dotenv.config().parsed ?? process.env ?? {};

console.log('Environment variables', env, nodeEnv);

const configuration: webpack.Configuration = {
  mode: nodeEnv !== 'production' ? 'development' : 'production',
  entry: ['./src/index.tsx'],
  output: {
    clean: true,
    filename: 'index.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
    alias: { '~': path.resolve(__dirname, 'src') },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.DefinePlugin({ ['window.env']: JSON.stringify({ NODE_ENV: nodeEnv, ...env }) }),
  ]
};

export default configuration;