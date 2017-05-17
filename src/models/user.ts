import * as loadJsonFile  from 'load-json-file';
import Ldap from '../services/ldap';
import userMapper from './userMapper';
const logger: any = require('../services/logger');

const User = {
    getUsers: async function() {
        const config = await User.getConfig();
        const ldapConfig = config.ldap;
        const ldapAttributes = Object.keys(ldapConfig.mappings);
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
