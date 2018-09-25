import * as request from 'supertest-as-promised';
import User from "../../models/user";
import Ldap from "../../services/ldap";
import testHelper from "../testHelper";

var app = require('../../app');

jest.mock('../../config/config');

describe("User, rest interface", () => {

    test('simple example', async () => {
        const ldapEntries = await testHelper.getLdapEntries();
        User.getConfig = jest.fn().mockReturnValue(testHelper.getConfig());
        Ldap.getEntries = jest.fn().mockReturnValue(ldapEntries);
        const res = await request(app).get('/users');

        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(testHelper.getExpected());
    })
});