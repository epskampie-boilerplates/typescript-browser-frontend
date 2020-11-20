const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  var production = env && env.production;

  var config = {
    entry: {
      index: './src/js/index.tsx',
    },
    stats: { modules: false },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            production
              ? { loader: MiniCssExtractPlugin.loader }
              : // creates style nodes from JS strings
                {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
              options: { url: false, sourceMap: !production },
            },
            { loader: 'sass-loader', options: { sourceMap: !production } },
          ],
        },
        {
          test: /\.(svg|png|jpg|jpeg|mp3)?$/,
          loader: 'file-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
    },
    plugins: [
      // Copy index.html, parse template tags
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        filename: 'index.html',
      }),
    ],
  };

  if (production) {
    // prod
    Object.assign(config, {
      mode: 'production',
    });

    config.plugins.push(
      // Set NODE_ENV to production for optimized react builds
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') },
      }),
      // Remove build dir
      new CleanWebpackPlugin(),
      // Extract css to file
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      // Copy images to build dir
      new CopyWebpackPlugin({ patterns: [{ from: 'resources', to: 'dist' }] })
    );
  } else {
    // dev
    config.plugins.push(
      // Hot module replacement
      new webpack.HotModuleReplacementPlugin()
    );

    Object.assign(config, {
      mode: 'development',
      devtool: 'cheap-module-source-map',
      devServer: {
        contentBase: path.join(__dirname, '/resources/'),
        overlay: {
          errors: true,
          warnings: false,
          open: true,
        },
        stats: { modules: false },
        hot: true,
        host: '0.0.0.0',
        // https: true,
      },
    });
  }

  return config;
};
