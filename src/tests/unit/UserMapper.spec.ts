import UserMapper from "../../models/userMapper";
import testHelper from "../testHelper";

describe("UserMapper", () => {
    test('simple example', async () => {
        const ldapEntries = await testHelper.getLdapEntries();
        const users = await UserMapper.mapUsers(ldapEntries, testHelper.getDefaultMappings());
        expect(users).toEqual(testHelper.getExpected());
    });
});
