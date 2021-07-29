const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  HtmlWebpackPlugin = require('html-webpack-plugin')

const { PORT, BUILD_ENV } = process.env

const _PROD_ = BUILD_ENV === 'prod'

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: !_PROD_,
    postcssOptions: {
      plugins: [
        ['postcss-preset-env', {
          browsers: '> 0.5%, not dead, iOS >= 7, Android >= 4.3'
        }],
        ['postcss-pxtorem', {
          rootValue: 100,
          propList: ['*'],
          // selectorBlackList: [/^\.(vux|weui)-[\w]*/]
        }]
      ]
    }
  }
}

const styleRules = [
	{
    test: /\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:5]'
          }
        }
      },
      postcssLoader,
      'less-loader'
    ],
    include: [resolve('src')]
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      postcssLoader
    ]
  },
]


module.exports = {
  entry: {
    app: resolve("src/index.tsx"),
  },

  mode: _PROD_ ? 'production' : 'development',

  output: {
    path: resolve("dist"),

    publicPath: _PROD_ ? '' : '/',
    sourceMapFilename: '[name].map',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    filename: 'static/js/[name].[contenthash:8].js'
  },

  module: {
    rules: [
      // {
      //   test: /\.(j|t)sx?$/,
      //   include: [
      //     resolve('src')
      //   ],
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     fix: true,
      //   }
      // },
      {
        test: /\.(j|t)sx?$/,
        include: [
          resolve('src')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      ...styleRules,
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "static/fonts/[name].[contenthash:8].[ext]",
          limit: 2048
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "static/imgs/[name].[contenthash:8].[ext]",
          limit: 2048
        }
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      resolve("src")
    ],
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      '@': resolve('src'),
    }
  },

  optimization: {
    minimize: _PROD_ ? true : false,
    // runtimeChunk: 'single',
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // cacheGroups: {
      //   react: {
      //     name: 'react-scripts',
      //     test: /[\\/]node_modules\/react(-|\w)*[\\/]/,
      //     priority: 1,
      //     chunks: "all"
      //   },
      //   default: {
      //     name: 'common',
      //     minChunks: 2,
      //     chunks: "all",
      //     priority: -10,
      //     reuseExistingChunk: true
      //   }
      // }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: resolve('src/statics'),
    //     // ignore: ['.*']
    //   }]
    // })
  ],
  stats: {
    timings: false
  },
  devServer: {
    port: PORT || 8200,
    host: '0.0.0.0',
    contentBase: resolve('dist'),
    hot: true,
    // liveReload: false,
    hotOnly: true,
    publicPath: '/',
    // stats: {
    //   color: true,
    //   errors: true
    // },
    historyApiFallback: true,
    progress: true,
    // writeToDisk: true,
  },
}