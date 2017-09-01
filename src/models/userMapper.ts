import * as _ from 'lodash';

const UserMapper = {
    mapUsers: (ldapEntries, mappings) => {
        const users = ldapEntries.map(ldapEntry => {
            const user:any = {};
            Object.keys(mappings).forEach(target => {
                const fieldMapping = mappings[target];
                const source = _.isString(fieldMapping) ? fieldMapping : fieldMapping.source;
                user[target] = ldapEntry[source];
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
                    else if (fieldMapping.op === 'match') {
                        const regex = new RegExp(fieldMapping.params[0], 'ig');
                        user[target] = regex.test(user[target]);
                    }
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