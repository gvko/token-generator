export default {
    // Where the api is hosted
    api_endpoint: 'http://localhost:7100',
    // Audience
    aud: 'https://www.esmiley.dk/',
    environments:[
        {
            name: 'Local',
            value: 'local'
        },
        {
            name: 'Staging',
            value: 'staging'
        },
        {
            name: 'Production',
            value: 'production'
        }
    ],
    // Issuer
    iss: 'service-admin'
}
