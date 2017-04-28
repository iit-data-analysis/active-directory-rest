const UserMapper = {
    mapUsers: (ldapEntries, mappings) => {
        const users = ldapEntries.map(ldapEntry => {
            const user:any = {};
            Object.keys(mappings).forEach(ldapField => {
                user[mappings[ldapField]] = ldapEntry[ldapField];
            });
            return user;
        });
        return users;
    }
};

export default UserMapper;