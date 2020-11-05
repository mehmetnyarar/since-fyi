module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src'
          },
          extensions: ['.ts', '.tsx']
        }
      ],
      // See https://styled-components.com/docs/tooling#babel-plugin
      ['babel-plugin-styled-components', {}]
    ]
  }
}
