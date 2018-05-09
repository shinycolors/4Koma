module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "4Koma",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Informally ShinyColors 4Koma site"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://use.fontawesome.com/releases/v5.0.12/css/all.css",
        integrity:
          "sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9",
        crossorigin: "anonymous"
      }
    ]
  },
  /*
  ** CSS/SASS
  */
  css: ["~/assets/global.scss"],
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Modules
  */
  modules: ["bootstrap-vue/nuxt", "~/modules/typescript.js"],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    ** Disabled due to babel-eslint doesn't support Typescript.
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
    */
  }
};
