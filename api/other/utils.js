const
    conf = require('../../nuxt.config'),
    rp = require('request-promise'),
    companyRouter = require('../routes/basic/companies'),
    employeeRouter = require('../routes/basic/employees');

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
     * Returns a slug name from a full name
     * @param {*} name Full name of the entity
     */
    generateSlug: function (name) {
        return name.trim().replace(' ', '_').toLowerCase();
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
            let company = await companyRouter.baseClass.findOne({ slackId: teamInfo.id }).exec();
            let employees = [];
    
            if (company == null || company == undefined)
                company = this.addCompany(teamInfo);
    
            for (let i in usersList) {
                const user = usersList[i];
                let employee = await employeeRouter.baseClass.findOne({ slackId: user.id }).exec();
    
                if (employee == null || employee == undefined)
                    employee = this.addEmployee(user, company);
                
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

    processSlackUser: async function (userData, teamData) {
        let employee = await employeeRouter.baseClass.findOne({ slackId: userData.id });
        let company = await companyRouter.baseClass.findOne({ slackId: teamData.id }).exec();

        if (employee == null || employee == undefined)
            employee = this.addEmployee(userData, company);

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
    addCompany: function (slackTeamData) {
        company = {
            slackId: slackTeamData.id,
            title: slackTeamData.name,
            slug: this.generateSlug(slackTeamData.name),
            departments: []
        };

        this.post(conf.axios.baseURL, companyRouter.baseRoute, company);
        return company;
    },

    /**
     * Adds an employee to the database
     * Returns the added employee
     * @param {*} slackUserData Slack user data
     * @param {*} fromCompany The company the user is from
     */
    addEmployee: function (slackUserData, fromCompany) {
        employee = {
            slackId: slackUserData.id,
            name: slackUserData.name,
            realName: slackUserData.real_name, // TODO: če signin z userjem, ne dobiš realName?
            imgPaths: this.extractUserProfileImages(slackUserData),
            company: fromCompany ? fromCompany : null,
            departments: [], // TODO: get employee's departments
            roles: [], // TODO: get user's roles
            availableKudos: 0,
            kudosToGive: 10,
            receivedKudos: 0
        };

        this.post(conf.axios.baseURL, employeeRouter.baseRoute, employee);
        return employee;
    },

    /**
     * Extracts all resolutions of the Slack profile image from the Slack user data
     * @param {*} slackUserData Slack user data to extract the images from
     */
    extractUserProfileImages: function (slackUserData) {
        if (slackUserData && slackUserData.profile)
            return {
                image_24: slackUserData.profile.image_24,
                image_32: slackUserData.profile.image_32,
                image_48: slackUserData.profile.image_48,
                image_72: slackUserData.profile.image_72,
                image_192: slackUserData.profile.image_192,
                image_512: slackUserData.profile.image_512,
                image_1024: slackUserData.profile.image_1024
            };
        else
            return [];
    },

    /**
     * Sends a post request
     * @param {*} baseUrl Base url of the request
     * @param {*} uri Route of the request (full uri = baseUrl + uri)
     * @param {*} body The JSON content/body to send
     */
    post: function (baseUrl, uri, body) {
        rp({
            method: 'POST',
            baseUrl: baseUrl,
            uri: uri,
            body: body,
            json: true
        });
    }
};
