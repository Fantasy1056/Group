const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    //入口
    entry: './src/main.js',
    //输出
    output: {
        //输出路径
        path: path.join(__dirname, 'dist'),
        //文件名
        filename: 'js/bundle.js'
    },
    //模式 production压缩/development 不压缩
    mode: 'production',
    plugins: [
        //自动将html引入dist文件夹插件
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        //配置css抽离到单独文件中
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
    ],
    module: {
        //loader规则
        rules: [
            {
                //正则表达式，匹配所有的css
                test: /\.less$/,
                //先用css-loader 让webpack识别到css文件的内容

                //MiniCssExtractPlugin.loader把css抽取到独立文件中，并在页面中引入
                //less-loader处理less文件成css文件
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                //正则表达式，匹配所有的less
                test: /\.css$/,
                //先用css-loader 让webpack识别到css文件的内容
                //再用style-loader将样式，以动态创建style标签的方式添加到页面
                //MiniCssExtractPlugin.loader把css抽取到独立文件中，并在页面中引入
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                //匹配图片文件
                test: /\.(png|jpg|gif|jpeg)$/i,
                type: 'asset',
                //图片文件放在哪里，名字设定
                generator: {
                    filename: 'pic/[hash][name][ext]'
                }
            },
            {
                //匹配字体文件
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset',
                //字体文件放在哪里，名字设定
                generator: {
                    filename: 'fonts/[hash][ext]'
                }
            },
            {
                //高级js语法转低级语法
                test: /\.js$/,
                //排除node_modules
                exclude: /(node_modules|bower_componets)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        port: 3001,
        open: true
    }

}