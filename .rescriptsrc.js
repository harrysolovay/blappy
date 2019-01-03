module.exports = [
  [
    'use-eslint-config',
    {
      extends: 'react-app',
      rules: {
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [
        'react-require',
        [
          'module-resolver',
          {
            root: '.',
            alias: {
              '~': './src',
            },
          },
        ],
      ],
    },
  ],
  {
    devServer: config => {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, PUT, POST, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, Content-Type, Authorization',
      }
      return config
    },
  },
]
