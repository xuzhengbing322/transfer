const path = require("path")
// webpack webpack-cli webpack-dev-server  html-webpack-plugin
const {
    VueLoaderPlugin
} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    DefinePlugin
} = require("webpack")


module.exports = {
    entry: "./src/main.ts",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "static/images/[name]_[hash:4][ext][query]"
    },
    module: {
        rules: [{
                test: /\.ts$/,
                // typescript ts-loader
                use:{
                    loader:"ts-loader",
                    // options必须写在use里面
                    options: {
                        // 自动将所有.vue文件转化为.vue.tsx文件 ？？作用
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
                // use: ["ts-loader"],
                // 自动将所有.vue文件转化为.vue.tsx文件 ？？作用
                // options: {
                //     appendTsSuffixTo: [/\.vue$/]
                // }
            },
            {
                test: /\.less$/,
                // vue-style-loader  css-loader less-loader
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.vue$/,
                // vue-loader vue-template-compiler
                use: ["vue-loader"],
            },
            {
                test: /\.jpe?g$/,
                type: "asset",
            },
            {
                test: /\.html$/,
                // html-loader
                loader: "html-loader"
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.tsx']
    },
    devtool: "cheap-module-source-map",
    devServer: {
        host: "localhost",
        port: "3003",
        open: true,
    },
}