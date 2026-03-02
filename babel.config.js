module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@service': './src/service',
          '@state': './src/state',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@hoc': './src/HOC',
          '@theme': './src/theme',
          '@constants': './src/constants',
          '@types': './src/types',
          '@database': './src/database',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
