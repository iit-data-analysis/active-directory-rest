import Ldap from '../services/ldap';
import userMapper from './userMapper';
import userFilterer from './userFilterer';
import config from '../config/config';

const logger: any = require('../services/logger');
import * as _ from 'lodash';


const User = {
    getUsers: async function(filters) {
        const config = User.getConfig();
        const ldapConfig = config.ldap;
        const ldapAttributes = _.flatten(Object.values(ldapConfig.mappings).map((m: any) => _.isString(m) ? m : m.source));
        const ldapEntries: Array<any> = await Ldap.getEntries(
            ldapConfig.url,
            ldapConfig.dn,
            ldapConfig.password,
            ldapConfig.filter,
            ldapAttributes);
        const users = userMapper.mapUsers(ldapEntries, ldapConfig.mappings);
        const filteredUsers = userFilterer.filterUsers(users, filters);
        const msg = filteredUsers.length + ' users found';
        logger.info(msg);
        return filteredUsers;
    },
    getConfig: function() {
        return config;
    }
};

export default User;
