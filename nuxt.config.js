module.exports = {
    /*
      ** Headers of the page
      */
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
    css: ['~/assets/css/style.css'],
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
        // baseURL: 'https://kudos-app-celtra.herokuapp.com/api',
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
        //url: 'mongodb://ds237373.mlab.com:37373/heroku_w4phfnbf'
    },
    uris: {
        slackIdentityUrl: 'https://slack.com/api/users.identity',
        slackUsersListUrl: 'https://slack.com/api/users.list',
        slackTeamInfoUrl: 'https://slack.com/api/team.info',
        slackOAuthAccessUrl: 'https://slack.com/api/oauth.access'
    },
    slackWorkspaceData: {
        clientId: '373180051559.455692683652',
        clientSecret: '50afe6cdc4267f22c91f5aea5a5a256a',
        redirectUri: 'http://localhost:3000/slack'
        // redirectUri: 'https://kudos-app-celtra.herokuapp.com/slack'
    },
    redeemOptions: [
        {
            title: 'Amazon 10$ gift card',
            amount: 20,
            imgPath: 'https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/531dd84f-d193-4eb5-b549-0fd0d7c99ce4/781c67f6-0467-4eb4-bdbd-34c02fc4eb12'
        },
        {
            title: 'Asos 10$ gift card',
            amount: 20,
            imgPath: 'https://res.cloudinary.com/giftcloud/image/upload/w_300,h_188,f_auto,fl_strip_profile,q_90/v1526561755/ctzqhk4ud0tfomxxl8fg.jpg'
        },
        {
            title: 'Spotify 10$ gift card',
            amount: 20,
            imgPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXmUh02wNNbYgB6iNh6XFwiJY0d5wisRK0iY64VQI1YUvSW_y'
        },
        {
            title: 'Steam 10$ gift card',
            amount: 20,
            imgPath: 'https://i.imgur.com/dqGa70y.png'
        }
    ],
    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ]
}
