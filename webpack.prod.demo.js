const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    mode:'production',
    output:{
        filename:'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        noParse:/jquery|lodash/,
        rules:[
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    // 'file-loader',
                    {
                        loader: 'url-loader', // 根据图片大小，把图片优化成base64
                        options: {
                            limit: 10000
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader',//优化图片
                    //     options: {
                    //             mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         optipng: {
                    //             enabled: false,
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false,
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            },
            {  
                test: /\.js$/,  
                exclude: /node_modules/,  
                loader: 'babel-loader'  
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    miniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'pastcss',//唯一标注
                            sourceMap:true,
                            plugins:loader => [
                                require('autoprefixer')(),
                            ]
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap:true,
                        }
                    }
                ]//从右往左编译.  style-loader处理成style标签插入页面
            },
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: '[name].[hash].css', // 设置最终输出的文件名
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: '首页', // 默认值：Webpack App
            filename: 'main.html', // 默认值： 'index.html',最终生成的文件名
            template: path.resolve(__dirname, 'src/template.html'),//模板文件
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true // 移除属性的引号
            },
        }),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({//压缩js
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
        ]
    },
    performance: {//性能报警提示关闭
        hints:false   
    }
}