import webpack from 'webpack'
import merge from 'webpack-merge'

function configureHotModuleReplacement(config) {
  let webpackDevServerAddr = process.env['WEBPACK_DEV_SERVER_ADDR'] || 'http://localhost:8080/'
  config = merge(
    config,
    {
      output: {
        publicPath: webpackDevServerAddr // needed for HMR to know where to load the hot update chunks
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    }
  )

  config.module.rules = config.module.rules.map( rule => {
    if (rule.loader === 'babel-loader') {
      return merge(rule, {options: {plugins: ['react-hot-loader/babel']}})
    } else {
      return rule
    }
  })

  for (let key of Object.keys(config.entry)) {
    if (!(config.entry[key] instanceof Array)) {
      config.entry[key] = [config.entry[key]]
    }
    config.entry[key].unshift('react-hot-loader/patch')
  }
  return config
}

module.exports = configureHotModuleReplacement
