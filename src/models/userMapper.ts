import * as _ from 'lodash';

const UserMapper = {
    mapUsers: (ldapEntries, mappings) => {
        const users = ldapEntries.map(ldapEntry => {
            const user:any = {};
            Object.keys(mappings).forEach(ldapField => {
                const fieldMapping = mappings[ldapField];
                const target = _.isString(fieldMapping) ? fieldMapping : fieldMapping.target;
                user[target] = ldapEntry[ldapField];
                const type = fieldMapping.type || 'string';
                if (type === 'multiple'){
                    if (!user[target])
                        user[target] = [];
                    else
                        user[target] = _.castArray(user[target]);
                }
                if (type === 'boolean') {
                    if (fieldMapping.op === 'not')
                        user[target] = !user[target];
                    else
                        user[target] = !!user[target];
                }
            });
            return user;
        });

        return users;
    }
};

export default UserMapper;