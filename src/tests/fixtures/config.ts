const Config = {
    "ldap": {
        "url": "ldap://127.0.0.1:3268",
        "dn": "CN=user1,OU=Users,DC=company,DC=local",
        "password": "pwd",
        "filter": "(&(sn=*)(cn=*)(givenName=*)(title=*)(!(UserAccountControl=514))(!(UserAccountControl=66050)))",
        "mappings": {
            "surname": "sn",
            "name": "givenName",
            "fullName": "cn",
            "username": "userPrincipalName",
            "groups": {
                "type": "multiple",
                "source": "extensionAttribute1"
            },
            "offices": {
                "type": "multiple",
                "source": "extensionAttribute2"
            },
            "coordinator": {
                "type": "boolean",
                "source": "extensionAttribute3"
            },
            "hired": {
                "type": "boolean",
                "source": "extensionAttribute4",
                "operations": [
                    {
                        "op": "not"
                    }
                ]
            },
            "scientificStaff": {
                "type": "boolean",
                "operations": [
                    {
                        "op": "match",
                        "params": [
                            "(researcher|phd)"
                        ]
                    }
                ],
                "source": "extensionAttribute5"
            }
        }
    }
};

export default Config;