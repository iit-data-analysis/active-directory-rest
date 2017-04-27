import Ldap from '../services/ldap';
import * as loadJsonFile  from 'load-json-file';
import * as _  from 'lodash';

const User = {
    getUsers: async function() {
        const config = await loadJsonFile('./config/config.json');
        const ldapUsers: Array<any> = await Ldap.getEntries(config.ldap);
        const users = ldapUsers.map(ldapUser => {
            const user:any = {};
            Object.keys(config.ldap.mappings).forEach(ldapField => {
                user[config.ldap.mappings[ldapField]] = ldapUser[ldapField];
            });
            return user;
        });
        console.log(users.length + ' users found')
        return users;
    }
};

export default User;
