var request = require('superagent');
module.exports = {
    name: 'organisation',
    read: function (req, resource, params, config, callback) {
        console.log("getting request");
        request.get('http://localhost:8080/organisations', function (response) {
            callback(null, response.body);
        });
    },
};