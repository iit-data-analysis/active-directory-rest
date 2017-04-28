import * as request from 'supertest-as-promised';
import Ldap from "../../services/ldap";
import testHelper from "../testHelper";
var app = require('../../app');

describe("User, rest interface", () => {

    test('simple example', async () => {
        const ldapEntries = await testHelper.getLdapEntries();
        Ldap.getEntries = jest.fn().mockReturnValue(ldapEntries);
        const res = await request(app).get('/users');

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(testHelper.getExpected());
    })
});