import * as loadJsonFile  from 'load-json-file';

const testHelper = {
    getConfig: async () => {
        const config = await loadJsonFile('tests/fixtures/config.json');
        return config;
    },
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
    getMappings: async function () {return (await this.getConfig()).ldap.mappings }
};

export default testHelper;