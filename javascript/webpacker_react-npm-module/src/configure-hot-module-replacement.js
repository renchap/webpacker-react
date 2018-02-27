import webpack from 'webpack'
import merge from 'webpack-merge'

function configureHotModuleReplacement(config) {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.loader === 'babel-loader') {
      return merge(rule, { options: { plugins: ['react-hot-loader/babel'] } })
    }
    return rule
  })
}

module.exports = configureHotModuleReplacement
