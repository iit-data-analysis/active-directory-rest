import UserMapper from "../../models/userMapper";
import testHelper from "../testHelper";

describe("UserMapper", () => {
    test('simple example', async () => {
        const ldapEntries = await testHelper.getLdapEntries();
        const mappings = testHelper.getMappings();
        const users = UserMapper.mapUsers(ldapEntries, mappings);
        expect(users).toEqual(testHelper.getExpected());
    });
});
