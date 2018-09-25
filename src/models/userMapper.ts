import * as _ from 'lodash';

const UserMapper = {
    mapUsers: (ldapEntries, mappings) => {
        const users = ldapEntries.map(ldapEntry => {
            const user: any = {};
            Object.keys(mappings).forEach(target => {
                const fieldMapping = mappings[target];
                const source = _.isString(fieldMapping) ? fieldMapping : fieldMapping.source;
                const type = fieldMapping.type || 'string';
                if (type === 'string') {
                    user[target] = ldapEntry[source];
                }
                else if (type === 'function') {
                    user[target] = fieldMapping.fn(ldapEntry);
                }
                else if (type === 'multiple') {
                    if (!ldapEntry[source])
                        user[target] = [];
                    else
                        user[target] = _.castArray(ldapEntry[source]);
                }
                else if (type === 'boolean') {
                    const operations = fieldMapping.operations || [];
                    user[target] = !!ldapEntry[source];
                    for (let operation of operations) {
                        if (operation.op === 'not')
                            user[target] = !user[target];
                        else if (operation.op === 'match') {
                            const regex = new RegExp(operation.params[0], 'ig');
                            user[target] = regex.test(ldapEntry[source]);
                        }  
                    }
                }
            });
            return user;
        });

        return users;
    }
};

export default UserMapper;