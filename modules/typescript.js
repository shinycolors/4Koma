module.exports = function(options) {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push("ts");

  // Extend build
  this.extendBuild(config => {
    config.module.rules.push({
      enforce: "pre",
      test: /\.tsx?$/,
      loader: "tslint-loader",
      exclude: /(node_modules)/,
      options: {
        tsConfigFile: "tsconfig.json",
        configFile: "tslint.json"
      }
    });
    // Add TypeScript loader
    config.module.rules.push({
      test: /((client|server)\.js)|(\.tsx?)$/,
      loader: "ts-loader",
      options: {
        configFile: "tsconfig.json",
        appendTsSuffixTo: [/\.vue$/]
      }
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
