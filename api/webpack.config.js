const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const developmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  context: path.join(__dirname, 'src', 'assets'),
  devtool: developmentMode ? 'eval' : 'source-map',
  entry: {
    app: ['./js/index.js', './js/app.jsx'],
  },
  mode: developmentMode ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.jsx?$/,
      },
      {
        loader: 'file-loader',
        options: {
          esModule: false,
          name: developmentMode ? '[name].[ext]' : '[name]-[hash].[ext]',
        },
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=.+)?$/i,
      },
      {
        test: /\.s?css$/,
        use: [
          developmentMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: developmentMode
      ? '[name].js'
      : '[name]-[hash].js',
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[id]-[hash].css',
      filename: '[name]-[hash].css',
    }),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
};
