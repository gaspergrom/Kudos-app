import Vuex from 'vuex';
import GlobalsModule from './modules/_globals';
import AuthenticationModule from './modules/authentication';
import CompaniesModule from './modules/companies';
import UserModule from './modules/user';
import ActivityModule from './modules/activity';
import PermissionsModule from './modules/permissions';
import ShopModule from './modules/shop';
import TasksModule from './modules/tasks';

const createStore = () => {
    return new Vuex.Store({
        modules: {
            globals: GlobalsModule,
            auth: AuthenticationModule,
            companies: CompaniesModule,
            user: UserModule,
            activity: ActivityModule,
            permissions: PermissionsModule,
            shop: ShopModule,
            tasks: TasksModule,
        }
    })
};

export default createStore;