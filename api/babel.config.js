module.exports = function babelConfig(api) {
  const babelEnv = api.env();
  const presets = [
    [
      '@babel/env',
      {
        corejs: 3,
        modules: babelEnv === 'test' ? 'auto' : false,
        targets: {
          browsers: ['>1%', 'last 3 versions'],
          ie: '9',
        },
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: babelEnv === 'development',
      },
    ],
  ];

  const plugins = ['react-hot-loader/babel'];
  return { plugins, presets };
};
