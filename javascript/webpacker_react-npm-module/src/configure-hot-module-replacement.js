import webpack from 'webpack'
import merge from 'webpack-merge'

function configureHotModuleReplacement(originalConfig) {
  const config = merge(
    originalConfig,
    {
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    }
  )

  config.module.rules = config.module.rules.map((rule) => {
    if (rule.loader === 'babel-loader') {
      return merge(rule, { options: { plugins: ['react-hot-loader/babel'] } })
    }
    return rule
  })

  Object.keys(config.entry).forEach((key) => {
    if (!(config.entry[key] instanceof Array)) {
      config.entry[key] = [config.entry[key]]
    }
    config.entry[key].unshift('react-hot-loader/patch')
  })
  return config
}

module.exports = configureHotModuleReplacement
