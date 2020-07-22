const path = require('path');
const webpack = require('webpack'); //引入webpack包
const removeConsole = require('babel-plugin-transform-remove-console'); //remove代码中的console
const VueLoaderPlugin = require('vue-loader/lib/plugin');  //引入VueLoaderPlugin
const compressionWebpackPlugin = require('compression-webpack-plugin'); 
const fileSize = 4; //压缩的文件大小，默认是4
module.exports = {
  entry:"./src/index.js", // 入口js文件, 因为是SPA文件， 所以不必写{}形式
  output:{   //出口文件,配置bundle、asset 和其他你所打包或使用 webpack 载入的任何内容
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new VueLoaderPlugin(),  //配置 VueLoaderPlugin
    new compressionWebpackPlugin({ //压缩代码
      test:/\.js$|\.html$|\.css$/, //压缩js/css/html
      threshold:1024 * fileSize //文件大于4m的才被压缩
    })
  ],
  module:{
    rules:[
      { 
        //解析vue
        test: /.vue$/,
        use:[
          { loader: 'vue-loader' }
        ]
      },
      {
        //css解析和style解析
        test:/.css$/,
        use: [ 
          { loader:'style-loader' }, 
          { loader:'css-loader' } 
        ]
      },
      { //解析less
        test: /\.less$/,
        use: [
          {
            loader: "css-loader" 
          }, 
          {
            loader: "style-loader" 
          }, 
          {
            loader: "less-loader" 
          }
      ]
      },
      {
        test:/\.js$/, //尽量只匹配js后缀的文件，免得文件显得很慢
        exclude: /(node_modules|bower_components)/,
        use: [
          { // eslint
            loader: 'eslint-loader',
            options:{
              include: [ 
                path.resolve(__dirname, 'src') 
              ] // 指定检查的目录
            }
           
          },
          {  //解析babel 
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            } 
          }
        ]
      },
      
    ]
  },
  resolve:{
    extensions: ['.js', '.vue', '.json'] ,//路径别名自动解析确定的扩展
    alias:{
      "@": path.resolve(__dirname,"src") //import地址引入
    }
  }
}