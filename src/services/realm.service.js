const axios = require('axios');

const KEYCLOAK_BASE_URL = 'http://localhost:8082';
const ADMIN_USERNAME = 'keycloak';
const ADMIN_PASSWORD = 'password';
const CLIENT_ID = 'admin-cli';

async function getAccessToken() {
    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('username', ADMIN_USERNAME);
    params.append('password', ADMIN_PASSWORD);
    params.append('grant_type', 'password');

    const response = await axios.post(`${KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return response.data.access_token;
}

exports.createRealm = async (realmName) => {
    const token = await getAccessToken();

    const response = await axios.post(`${KEYCLOAK_BASE_URL}/admin/realms`, {
        realm: realmName,
        enabled: true
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return { message: `Realm '${realmName}' created successfully` };
};
