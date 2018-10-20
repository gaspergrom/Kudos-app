module.exports = {
    /*
      ** Headers of the page
      */
    mode: "spa",
    head: {
        title: 'Kudos App',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Kudos App'},
            {hid: 'author', name: 'author', content: "Gašper Grom"},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
      ** Global CSS
      */
    css: ['~/assets/css/main.scss'],
    /*
      ** Add axios globally
      */
    modules: [
        '@nuxtjs/axios'
    ],
    plugins: [
        '~/plugins/vuelidate.js'
    ],
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: "http://localhost:3000/api",
        https: false
    },
    build: {
        /*
            ** Run ESLINT on save
            */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    exclude: /(node_modules)/
                })
            }
        }
    },
    databaseConfig: {
        url: 'mongodb://127.0.0.1:27017'
    },
    uris: {
        slackIdentityUrl: 'https://slack.com/api/users.identity',
        slackUsersListUrl: 'https://slack.com/api/users.list',
        slackTeamInfoUrl: 'https://slack.com/api/team.info',
        slackOAuthAccessUrl: 'https://slack.com/api/oauth.access'
    },
    slackWorkspaceData: {
        clientId: '373180051559.455945801345',
        clientSecret: 'a2896a7e8888b201ea75674d819469bb',
        redirectUri: 'http://localhost:3000/slack'
    },
    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ]
}
