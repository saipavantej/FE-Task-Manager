module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ts',
          '.tsx',
          '.ios.js',
          '.android.js',
          '.json',
          '.js',
          '.jsx',
        ],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@config': './src/config',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@mock': './src/mock',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
};
