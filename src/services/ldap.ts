import * as ldapTyped from 'ldapjs';

const Ldap = {
    getEntries: function (url, dnStr, password, filter, attributes):Promise<any[]> {
        //@types/ldap features incomplete types
        const ldap: any = ldapTyped;

        const client = ldap.createClient({
            url: url
        });

        const opts = {
            filter: filter,
            scope: 'sub',
            attributes: attributes
        };

        const ldapEntries = [];

        const dn = ldap.parseDN(dnStr);
        return new Promise((resolve, reject) => {

            client.bind(dn, password, err => {
                if (err) {
                    console.log('Ldap binding was not successful');
                    console.log(err.lde_message);
                    reject(err);
                    return;
                }

                client.search(`DC=iit,DC=local`, opts, (err, res) => {
                    res.on('searchEntry', entry => ldapEntries.push(entry.toObject()));
                    res.on('error', err => {
                        console.log(err.lde_message);
                        reject(err);
                    });
                    res.on('end', res => {
                        resolve(ldapEntries);
                    })
                });

            });

        });
    }
};

export default Ldap;
