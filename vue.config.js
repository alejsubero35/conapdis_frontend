const path = require('path')
const name = 'Conapdis' // TODO: get this variable from setting.ts

module.exports = {
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


