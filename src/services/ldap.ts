import * as ldapTyped from 'ldapjs';

const Ldap = {
    getEntries: function (ldapConfig):Promise<any[]> {
        //@types/ldap features incomplete types
        const ldap: any = ldapTyped;

        const client = ldap.createClient({
            url: ldapConfig.url
        });

        const opts = {
            filter: ldapConfig.filter,
            scope: 'sub',
            attributes: Object.keys(ldapConfig.mappings)
        };

        const ldapEntries = [];

        const dn = ldap.parseDN(ldapConfig.dn);
        return new Promise((resolve, reject) => {

            client.bind(dn, ldapConfig.password, err => {
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
