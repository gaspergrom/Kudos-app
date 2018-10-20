import Vuex from 'vuex';
import GlobalsModule from './modules/_globals';
import AuthenticationModule from './modules/authentication';
import CompaniesModule from './modules/companies';
import UserModule from './modules/user';
import ActivityModule from './modules/activity';

const createStore = () => {
    return new Vuex.Store({
        modules: {
            globals: GlobalsModule,
            auth: AuthenticationModule,
            companies: CompaniesModule,
            user: UserModule,
            activity: ActivityModule,
        }
    })
};

export default createStore;