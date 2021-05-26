const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/polyfill')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  // cache: {
  //   type: 'memory' // 开发环境 默认 memory 不允许额外配置
  // },
  // cache: {
  //   type: 'filesystem', // 文件系统 允许额外配置
  //   cacheDirectory: 'node_modules/.cache/webpack', // 默认将缓存存储在 node_modules/.cache/webpack
  //   cacheLocation: path.resolve(__dirname, '.test_cache'), // 缓存的路径 默认值
  //   // 缓存依赖，当缓存依赖修改时，缓存失效
  //   buildDependencies:{
  //     // 将你的配置添加依赖，更改配置时，使得缓存失效
  //     config: [__filename] // 官方推荐
  //   },
  //   hashAlgorithm: 'md4', // 哈希生成算法 默认md4
  //   name: 'AppBuildCache',
  //   store: 'pack', // 当编译器闲置时 将缓存数据存放在一个文件中
  // },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new friendlyErrorsWebpackPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '檃',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  module: {
    unsafeCache: true,
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  devServer: {
    publicPath: '/',
    writeToDisk: false, // 将打包目录写入到硬盘 false为内存
    historyApiFallback: true, // 404 重定向到index.html
    contentBase: path.resolve(__dirname, '../dist'), // 指定静态资源的根目录
    open: true, // 打开浏览器
    compress: true, // 压缩
    hot: true, // 热更新
    port: 8002, // 端口号
    proxy: {
      // '/api': 'http://8.136.225.110:8888/',
      '/api/v1': 'http://localhost:5000/'
    }
  },
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
    // "react-router": "ReactRouter",
    // "react-router-dom": "ReactRouterDOM",
    // antd: "antd",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], //这几个后缀名的文件后缀可以省略不写
    alias: {
      '@': path.join(__dirname, '../src'), //这样 @就表示根目录src这个路径
      process: 'process/browser'
    },
    fallback: { assert: require.resolve('assert/') }
  }
}
