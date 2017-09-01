import * as _ from 'lodash';

const UserFilterer = {
    filterUsers: (users, filters) => {
        const filteredUsers = users.filter(u =>
            filters.every(f => _.isArray(u[f.k]) ? u[f.k].includes(f.v) : u[f.k] == f.v)
        );

        return filteredUsers;
    }
};

export default UserFilterer;