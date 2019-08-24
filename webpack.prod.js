const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

let prodConfig = {
    mode:'production',
    output:{
        filename:'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath:''
    },
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
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
            filename: 'css/[name].[hash].css', // 设置最终输出的文件名和路径
            chunkFilename: '[id].[hash].css'
        }),
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
module.exports = merge(common , prodConfig);