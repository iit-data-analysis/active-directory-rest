import * as loadJsonFile from 'load-json-file';
import config from './fixtures/config';

const testHelper = {
    getConfig: () => {
        return config;
    },
    getLdapEntries: async () => {
        return await loadJsonFile('tests/fixtures/ldap-entries.json');
    },
    getExpected: () => {
        const expected = [{
            name: 'Federico',
            surname: 'Bozzini',
            fullName: 'Federico Bozzini',
            username: 'federico.bozzini@iit.it',
            groups: ['ICT'],
            offices: ['room1', 'room2'],
            coordinator: true,
            hired: false,
            scientificStaff: true
        }, {
            name: 'Federico',
            surname: 'Semprini',
            fullName: 'Federico Semprini',
            username: 'federico.semprini@iit.it',
            groups: ['ICT'],
            offices: [],
            coordinator: false,
            hired: true,
            scientificStaff: false
        }];
        return expected;
    },
    getMappings: function () {
        return config.ldap.mappings;
    }
};

export default testHelper;