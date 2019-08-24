const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/")
    },
    extensions: [".js", ".vue", ".json"] // 默认值: [".js",".json"]
  },
  externals: {
    //把模块做成外部依赖，不会打包到js中
    jquery: "jQuery",
    lodash : '_'
  },
  module: {
    noParse:/jquery|lodash/,//不去解析依赖关系
    rules: [
      {
          test:/\.html$/,
          loader:'html-withimg-loader'
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, "src/")],
        use: [
          {
            loader: "url-loader", // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000,
              outputPath:'img/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include:path.resolve('src'),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: "eslint-loader",
            options: {
              // eslint options (if necessary)
              fix: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页", // 默认值：Webpack App
      filename: "index.html", // 默认值： 'index.html',最终生成的文件名
      template: path.resolve(__dirname, "src/template.html"), //模板文件
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin()
  ]
};
