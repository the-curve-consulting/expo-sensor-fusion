const createConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async (env, argv) => {
  const config = await createConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@the-curve-consulting/expo-sensor-fusion'
        ]
      }
    },
    argv
  );
  config.resolve.modules = [
    path.resolve(global.__dirname, './node_modules'),
    path.resolve(global.__dirname, '../node_modules')
  ];

  return config;
};
