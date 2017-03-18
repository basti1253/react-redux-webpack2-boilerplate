const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssNano = require('cssnano');

const nodeEnv = process.env.NODE_ENV || 'production';
const isProductionBuild = nodeEnv !== 'development';
const sourcePath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');
const imgPath = path.resolve(__dirname, 'src/img');
const publicPath = path.resolve(__dirname, 'public');

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.[hash].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(publicPath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: isProductionBuild,
    debug: !isProductionBuild,
    options: {
      context: publicPath,
      postcss: [
        autoprefixer(),
        cssNano()
      ],
    },
  }),
  new ExtractTextPlugin('styles.[hash].css')
];

if (isProductionBuild) {
  plugins = [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({
      // https://github.com/webpack/webpack/issues/2704
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        // don't use false - keep copyright notices
        comments: 'some',
      },
    }),
  ];
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  // no sassy maps if using these options
  // devtool: 'cheap-module-eval-source-map',
  // devtool: '#eval-source-map',
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    js: [
      './index.js',
    ],
    vendor: [
      'babel-polyfill',
      'classnames',
      'es6-promise',
      'immutable',
      'isomorphic-fetch',
      'react-dom',
      'react-redux',
      'react-router',
      'react',
      'redux-thunk',
      'redux',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.css'
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: sourcePath,
        loader: 'babel-loader'
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        include: imgPath,
        query: {
          limit: 8192,
          name: 'img/[name].[ext]?[hash]'
        }
      },
      // Fonts
      {
        test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: [/\.scss$/i, /\.css$/],
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              query: {
                minimize: false,
                sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              query: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              query: {
                sourceMap: true,
              },
            }
          ]
        }),
      }
    ]
  },
  devServer: {
    contentBase: isProductionBuild ? './build' : './public',
    historyApiFallback: true,
    port: 3000,
    compress: isProductionBuild,
    inline: !isProductionBuild,
    hot: !isProductionBuild,
    stats: 'errors-only',
    host: '0.0.0.0'
  },
};
