var React = require('react');
var Fluxible = require('fluxible');
var FetchrPlugin = require('fluxible-plugin-fetchr');
var app = new Fluxible({
    appComponent: React.createFactory(require('./components/RoISalen.jsx'))
});

var fetchrPlugin = FetchrPlugin({
    xhrPath: '/api'
})
app.plug(fetchrPlugin);


app.registerStore(require('./stores/OrganisationStore'));
app.registerStore(require('./stores/PageStore'));

module.exports = app;