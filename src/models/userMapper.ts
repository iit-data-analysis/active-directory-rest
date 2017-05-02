import * as _ from 'lodash';

const UserMapper = {
    mapUsers: (ldapEntries, mappings) => {
        const users = ldapEntries.map(ldapEntry => {
            const user:any = {};
            Object.keys(mappings).forEach(ldapField => {
                const fieldMapping = mappings[ldapField];
                const target = _.isString(fieldMapping) ? fieldMapping : fieldMapping.target;
                user[target] = ldapEntry[ldapField];
                if (fieldMapping.multiple && !user[target])
                    user[target] = [];
                if (fieldMapping.multiple)
                    user[target] = _.castArray(user[target]);
                if (fieldMapping.boolean)
                    user[target] = !! user[target]; 
            });
            return user;
        });

        return users;
    }
};

export default UserMapper;