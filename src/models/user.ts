import * as loadJsonFile  from 'load-json-file';
import Ldap from '../services/ldap';
import userMapper from './userMapper';
const logger: any = require('../services/logger');
import * as _ from 'lodash';


const User = {
    getUsers: async function() {
        const config = await User.getConfig();
        const ldapConfig = config.ldap;
        const ldapAttributes = Object.values(ldapConfig.mappings).map(m => _.isString(m) ? m : m.source);
        const ldapEntries: Array<any> = await Ldap.getEntries(
            ldapConfig.url,
            ldapConfig.dn,
            ldapConfig.password,
            ldapConfig.filter,
            ldapAttributes);
        const users = userMapper.mapUsers(ldapEntries, ldapConfig.mappings);
        const msg = users.length + ' users found'
        logger.info(msg);
        return users;
    },
    getConfig: async function() {
        const config = await loadJsonFile('./config/config.json');
        return config;
    }
};

export default User;
