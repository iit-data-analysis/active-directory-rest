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
                    const operations = fieldMapping.operations || [];
                    for (let operation of operations) {
                        if (operation.op === 'not') {
                            user[target] = !user[target];
                        }
                        if (operation.op === 'match') {
                            const regex = new RegExp(operation.params[0], 'ig');
                            user[target] = regex.test(user[target]);
                        }  
                    }
                    user[target] = !!user[target];
                }
            });
            return user;
        });

        return users;
    }
};

export default UserMapper;