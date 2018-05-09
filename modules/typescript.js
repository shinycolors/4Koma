module.exports = function(options) {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts");

  // Extend build
  this.extendBuild(config => {
    config.module.rules.push({
      enforce: "pre",
      exclude: /(node_modules)/,
      loader: "tslint-loader",
      options: {
        configFile: "tslint.json",
        tsConfigFile: "tsconfig.json"
      },
      test: /\.tsx?$/,
    });
    // Add TypeScript loader
    config.module.rules.push({
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/],
        configFile: "tsconfig.json"
      },
      test: /((client|server)\.js)|\.tsx?$/
    });
    // Add TypeScript loader for vue files
    for (let rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders.ts = "ts-loader!tslint-loader";
      }
    }
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf(".ts") === -1) {
      config.resolve.extensions.push('.ts')
    }
  });
};
