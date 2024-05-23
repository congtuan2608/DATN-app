module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "~apis": "./src/apis",
            "~assets": "./src/assets",
            "~components": "./src/components",
            "~configs": "./src/configs",
            "~constants": "./src/constants",
            "~hooks": "./src/hooks",
            "~layouts": "./src/layouts",
            "~navigators": "./src/navigators",
            "~screens": "./src/screens",
            "~themes": "./src/themes",
            "~utils": "./src/utils",
            "~redux": "./src/redux",
            "~states": "./src/states",
          },
        },
      ],
      "react-native-reanimated/plugin",
      "@babel/plugin-transform-export-namespace-from",
      "@babel/plugin-transform-runtime",
    ],
  };
};
