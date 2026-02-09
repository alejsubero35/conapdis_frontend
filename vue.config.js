const path = require('path')
const name = 'Conapdis' // TODO: get this variable from setting.ts

module.exports = {
  publicPath: '/',
  filenameHashing: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    const useContentHash = process.env.NODE_ENV === 'production'
    config.output = {
      ...config.output,
      filename: useContentHash ? 'js/[name].[contenthash:8].js' : 'js/[name].[hash:8].js',
      chunkFilename: useContentHash ? 'js/[name].[contenthash:8].js' : 'js/[name].[hash:8].js'
    }
  },
  //publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
 //publicPath: path.resolve(__dirname, '../dist/index.html'),

 // Paths
/*  assetsRoot: path.resolve(__dirname, '../dist'),
 assetsSubDirectory: './static',
 assetsPublicPath: './' */


    pwa: {
    name: name,
    themeColor: '#004388',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'public/service-worker.js'),
      //index: path.resolve(__dirname, '../dist/index.html'),
    },
    iconPaths: {
      favicon72: 'images/icons/icon-72x72.png'
    },
  },

  transpileDependencies: [
    "@coreui/utils"
  ]
}


