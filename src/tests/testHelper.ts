import * as loadJsonFile  from 'load-json-file';

const testHelper = {
    getLdapEntries: async () => {
        const ldapEntries = await loadJsonFile('tests/fixtures/ldap-entries.json');
        return ldapEntries;
    },
    getExpected: () => {
        const expected = [{
            name: 'Federico',
            surname: 'Bozzini',
            fullName: 'Federico Bozzini',
            username: 'federico.bozzini@iit.it'
        }];
        return expected;
    },
    getDefaultMappings: () => ({
        "sn": "surname",
        "givenName": "name",
        "cn": "fullName",
        "userPrincipalName": "username"
    })
};

export default testHelper;