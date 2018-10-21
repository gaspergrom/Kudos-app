const
    slugify = require('slugify'),
    conf = require('../../nuxt.config'),
    rp = require('request-promise'),
    companyRouter = require('../routes/database-models/companies'),
    employeeRouter = require('../routes/database-models/employees');

module.exports = {
    /**
     * Constructs the request URL for fetching a user access token from client code
     * @param {*} code The client code to fetch the token for
     */
    constructAccessTokenRequestUrl: function (code) {
        return conf.uris.slackOAuthAccessUrl + '?client_id=' + conf.slackWorkspaceData.clientId + '&client_secret=' + conf.slackWorkspaceData.clientSecret + '&code=' + code + '&redirect_uri=' + conf.slackWorkspaceData.redirectUri;
    },

    /**
     * Constructs the request URL for fetching user data from an access token
     * @param {*} userToken The access token to fetch the data for
     */
    constructUserDataRequestUrl: function (userToken)
    {
        return conf.uris.slackIdentityUrl + '?token=' + userToken;
    },

    /**
     * Constructs the request URL for fetching users list of a team
     * @param {*} userToken The access token to fetch the data for
     */
    constructUsersListRequestUrl: function (userToken) {
        return conf.uris.slackUsersListUrl + '?token=' + userToken + '&pretty=1';
    },

    /**
     * Constructs the request URL for accessing team info
     * @param {*} userToken The access token to fetch the data for
     */
    constructTeamInfoRequestUrl: function (userToken) {
        return conf.uris.slackTeamInfoUrl + '?token=' + userToken + '&pretty=1';
    },

    /**
     * Constructs the request URL for opening a DM channel as a bot
     * @param {*} userToken The access token to fetch the data for
     * @param {*} dmUserId Slack ID of the user to open a DM channel with
     */
    constructImOpenRequestUrl: function (userToken, dmUserId) {
        return conf.uris.slackImOpenUrl + '?token=' + userToken + '&user=' + dmUserId + '&pretty=1';
    },

    /**
     * Constructs the request URL for opening a DM channel as a bot
     * @param {*} userToken The access token to fetch the data for
     * @param {*} dmUserId Slack ID of the user to open a DM channel with
     */
    constructPostMessageRequestUrl: function (userToken, channel, text) {
        return conf.uris.slackPostMessageUrl + '?token=' + userToken + '&channel=' + channel + '&text=' + text + '&pretty=1';
    },

    /**
     * Processes the received workspace from the access token
     * Adds the received workspace and members to the database if they don't exist
     * Returns the company, and all of its employees
     * @param {*} usersList List of users in the Slack workspace
     * @param {*} teamInfo Info about the Slack workspace
     */
    processSlackWorkspace: async function (usersList, teamInfo) {
        if (usersList && teamInfo) {
            let company = await companyRouter.baseClass
                .findOne({ slackId: teamInfo.id })
                .populate('departments')
                .exec();
            
            let employees = [];
    
            if (company == null || company == undefined)
                company = await this.addCompany(teamInfo);
    
            for (let i in usersList) {
                const user = usersList[i];
                let employee = await employeeRouter.baseClass
                    .findOne({ slackId: user.id })
                    .populate('company')
                    .exec();
    
                if (employee == null || employee == undefined)
                    employee = await this.addEmployee(user, company._id);
                
                employees.push(employee);
            }
    
            return {
                authType: 'company',
                data: {
                    company: company,
                    employees: employees
                }
            };
        }
        else {
            const msg = 'Failed to process Slack workspace.';
            console.error(msg);
            return { type: 'error', data: { msg: msg } };
        }
    },

    /**
     * Processes the received user from the access token
     * Adds the received user to the database and assigns the company if it exists
     * Returns the employee
     * @param {*} userData Slack user data
     * @param {*} teamData Slack team data
     */
    processSlackUser: async function (userData, teamData) {
        let employee = await employeeRouter.baseClass
            .findOne({ slackId: userData.id })
            .populate('company')
            .exec();

        let company = await companyRouter.baseClass
            .findOne({ slackId: teamData.id })
            .populate('departments')
            .exec();

        if (employee == null || employee == undefined)
            employee = await this.addEmployee(userData, company ? company._id : null);

        return {
            authType: 'employee',
            data: {
                employee: employee
            }
        };
    },

    /**
     * Adds a company to the database
     * Returns the added company
     * @param {*} slackTeamData Slack team data
     */
    addCompany: async function (slackTeamData) {
        company = {
            slackId: slackTeamData.id,
            title: slackTeamData.name,
            slug: slugify(slackTeamData.name),
            departments: []
        };

        return await this.post(conf.axios.baseURL, companyRouter.baseRoute, company);
    },

    /**
     * Adds an employee to the database
     * Returns the added employee
     * @param {*} slackUserData Slack user data
     * @param {*} fromCompany The company the user is from
     */
    addEmployee: async function (slackUserData, fromCompanyId) {
        employee = {
            slackId: slackUserData.id,
            name: slackUserData.name,
            realName: slackUserData.real_name, // TODO: če signin z userjem, ne dobiš realName?
            imgPaths: slackUserData.profile ? this.extractUserProfileImages(slackUserData.profile) : this.extractUserProfileImages(slackUserData),
            company: fromCompanyId ? fromCompanyId : null,
            departments: [], // TODO: get employee's departments
            roles: [], // TODO: get user's roles
            availableKudos: conf.general.startingAvailableKudos,
            kudosToGive: conf.general.startingKudosToGive,
            receivedKudos: conf.general.startingReceivedKudos
        };

        return await this.post(conf.axios.baseURL, employeeRouter.baseRoute, employee);
    },

    /**
     * Extracts all resolutions of the Slack profile image from the Slack user data
     * @param {*} slackUserData Slack user data to extract the images from
     */
    extractUserProfileImages: function (slackUserProfile) {
        if (slackUserProfile)
            return {
                image_24: slackUserProfile.image_24,
                image_32: slackUserProfile.image_32,
                image_48: slackUserProfile.image_48,
                image_72: slackUserProfile.image_72,
                image_192: slackUserProfile.image_192,
                image_512: slackUserProfile.image_512,
                image_1024: slackUserProfile.image_1024
            };
        else
            return [];
    },

    /**
     * Sends a post request
     * @param {*} baseUrl Base url of the request
     * @param {*} uri Route of the request (full uri = baseUrl + uri)
     * @param {*} body The JSON content/body to send
     * Returns the response
     */
    post: async function (baseUrl, uri, body) {
        return await rp({
            method: 'POST',
            baseUrl: baseUrl,
            uri: uri,
            body: body,
            json: true
        });
    }
};
