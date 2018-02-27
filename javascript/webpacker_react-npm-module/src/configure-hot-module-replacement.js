import merge from 'webpack-merge'

function configureHotModuleReplacement(origConfig) {
  const config = origConfig
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.loader === 'babel-loader') {
      return merge(rule, { options: { plugins: ['react-hot-loader/babel'] } })
    }
    return rule
  })

  return config
}

module.exports = configureHotModuleReplacement
