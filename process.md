### lesson 1 处理js
1. mkdir webpack4 
2. cd webpack4 
3. npm init -y
4. **npm i -D webpack webpack-cli lodash**
5. mkdir src dist
6. touch webpack.config.js src/index.js dist/index.html
7. **webpack.config.js编写配置的entry和output文件  index.js导入lodash**
8. npx webpack 

### lesson 2 处理css
1. touch src/style/index.css
2. index.js 导入css
3. **npm i -D style-loader css-loader** 
4. **webpack.config.js编写module**

### lesson 3 处理sass
1. **npm i -D sass-loader node-sass**
2. **webpack.config.js编写module**
3. index.js 导入demo.scss
4. **package.json配置命令  npx webpack --config webpack.config.js**

### lesson 4 添加sourcemap 跟踪源文件  css前缀处理
1. 修改css moudule配置，添加options:{ sourceMap:true }
2. npm i -D postcss-loader autoprefixer
3. 添加postcss-loader 添加插件 **注意在css-loader后面**
4. 在package.json里面加入browserList 避免警告

### lesson 5 css单独抽取 // TODO给css配置文件名会导致url的图片路径不对。
1. npm i -D mini-css-extract-plugin
2. 新建 webpack.product.config.js
3. package.json 新增命令 "npx webpack --config webpack.product.config.js"
4. 修改mode => 'production'
5. modules中 将style-loader 替换为 miniCssExtractPlugin
6. 新增plugins

### lesson 6 css压缩 js压缩
1. npm i -D optimize-css-assets-webpack-plugin
2. 新增 optimization配置
3. npm i -D uglifyjs-webpack-plugin
4 **使用插件必须先将es6 转为es5**
5. npm install --save-dev babel-core babel-preset-es2015 babel-loader@7
6. 配置.babelrc
7. 配置js loader
8. 配置优化

### lesson 7 加入hash html中动态插入css/js
1. npm install --save-dev html-webpack-plugin
2. 插件配置模板,打包后的文件名
3. **动态插入带有hash的js/css**
4. 清理dist目录 npm install clean-webpack-plugin --save-dev **webpack4不支持参数不能为数组**
5. **注意解构赋值使用**

### lesson 8 压缩优化图片
1. npm install --save-dev file-loader
2. 配置loader
3. ##### npm install image-webpack-loader --save-dev TODO报错
4. ##### 配置options

### lesson 9  小图片转base64,处理字体 减少请求
1. npm install --save-dev url-loader 
2. 配置loader

### lesson 10 提取webpack公共的配置
1. npm install --save-dev webpack-merge
2. 新建webpack.base.js webpack.dev.js webpack.prod.js
3. 提取相同的配置到webpack.base.js 中
4. webpack.dev.js中使用merge函数 merge(baseConfig, devConfig)
5. 修改package.json的script中的命令 "npx webpack --config webpack.dev.js", **这里没写对会导致dev的配置不生效**
6. 配置开发环境

### lesson 11 js  dev环境开启sourcemap
1. dev配置添加  devtool:'inline-source-map'
2. 自动编译 "npx webpack --watch --config webpack.dev.js",

### lesson 12 热更新
> 在内存里面编译，不会打包到dist. 注意：内存过大时需要安装优化内存插件 
1. npm install --save-dev webpack-dev-server 
2. 添加devServer 配置  
3. 引入webpack 添加插件开启热更新
4. 启动服务 "npx webpack-dev-server --config webpack.dev.js",
> ctrl+shit+p indent using tab space设置tab的空格

### lesson 13 es6转es5  babel优化
1. npm i -D babel-loader babel-core babel-preset-env
2. 加入.babelrc
3. options中加入 cacheDirectory:true 缓存转码的js
> babel runtime 作为一个独立模块，来避免重复引入
4. npm install babel-plugin-transform-runtime --save-dev
5. npm install babel-runtime --save **生成环境**
6. 修改.babelrc

### lesson 14 eslint校验
1. npm install eslint --save-dev
2. npm install eslint-loader --save-dev
3. npm i -D babel-eslint standard
4. 添加eslint loader 要放到最后
5. 添加.eslintrc.js  eslintignore
6. 安装eslint插件自动修复错误

### lesson 15 resolve配置
1. resolve.alias 配置常用模块位置
2. 配置外部扩展externals cdn引入，不打包

### lesson 16 webpak 分析 只在dev配置下使用，自动生成一个网页报表
1. npm install --save-dev webpack-bundle-analyzer
2. 配置dev

### lesson 17 webpack引入第三方模块
1. expose-loader 配置loader
`import $ from 'expose-loader!jquery'`
2. 在每个模块中注入
```
new webpack.ProvidePlugin({
  $:'jquery'
})
```
3. CDN引入模块  externals

### lesson 18 hmtl中引入图片
1. npm i html-withimg-loader -D
2. 配置loader
3. 打包输出路径配置 outputPath
4. 添加域名 output中加入  publicPath

### lesson 19 多入口
```
entry:{
  home:'',
  other:'',
},
output:{
  filename:'name.js',
  path:''
},
new HtmlWebpackPlugin({
  template:'./template.html',
  filename:'home.html',
  chunks:['home']
}),
new HtmlWebpackPlugin({
  template:'./template.html',
  filename:'other.html',
  chunks:['other']
}),
```

### lesson 20 监控实时打包
1. 配置watch

### lesson 21定义环境变量
```
new webpack().DefinePlugin({
  DEV:JSON.stringfy('production')
})
```

### 抽离公共js
```
optimization:{
  splitChunks:{//分割代码块
    cacheGroups:{//缓存组
      common:{//公共的模块
        chunks:'initial',
        minSize:0,
        minChunks:2
      },{
        vendor:{//抽离第三方模块
          priority:1,
          test:/node_modules/,
          chunks:'initial',
          minSize:0,
          minChunks:2
        }
      }
    }
  }
}

```

### 懒加载
1. npm i plugin-syntax-dynamic-import 插件





