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
        slackOAuthAccessUrl: 'https://slack.com/api/oauth.access',
        slackImOpenUrl: 'https://slack.com/api/im.open',
        slackPostMessageUrl: 'https://slack.com/api/chat.postMessage',
        slackCloseChannelUrl: 'https://slack.com/api/im.close',
        slackBotHookUrl: 'https://da-ting-goes-skra.slack.com/services/hooks/slackbot'
    },
    general: {
        startingAvailableKudos: 0,
        startingKudosToGive: 100,
        startingReceivedKudos: 0,
        kudosCommentMaxLen: 70
    },
    slackWorkspaceData: {
        clientId: '373180051559.455692683652',
        clientSecret: '50afe6cdc4267f22c91f5aea5a5a256a',
        appAccessToken: 'xoxb-373180051559-461848363127-knrT2bGcjXNRsyIAH6Orkios',
        redirectUri: 'http://localhost:3000/slack'
        // redirectUri: 'https://kudos-app-celtra.herokuapp.com/slack'
    },
    redeemOptions: [
        {
            title: 'Amazon 10$ gift card',
            amount: 20,
            imgPath: 'https://i.imgur.com/S8RHXZs.png'
        },
        {
            title: 'Asos 10$ gift card',
            amount: 20,
            imgPath: 'https://res.cloudinary.com/giftcloud/image/upload/w_300,h_188,f_auto,fl_strip_profile,q_90/v1526561755/ctzqhk4ud0tfomxxl8fg.jpg'
        },
        {
            title: 'Spotify 10$ gift card',
            amount: 20,
            imgPath: 'https://i.imgur.com/ZfwrxFj.png'
        },
        {
            title: 'Steam 10$ gift card',
            amount: 20,
            imgPath: 'https://i.imgur.com/dqGa70y.png'
        },
        {
            title: 'Udemy 10$ gift card',
            amount: 20,
            imgPath: 'https://i.imgur.com/phIKTbA.png'
        }
    ],
    serverMiddleware: [
        // API middleware
        '~/api/index.js'
    ]
}
