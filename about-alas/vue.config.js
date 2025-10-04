const { defineConfig } = require('@vue/cli-service')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
      }),
    ],
  },
};
module.exports = defineConfig({
  transpileDependencies: true
})
