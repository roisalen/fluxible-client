
var React = require('react');
var app = require('./app');


var dehydratedState = window.App; // sent from the server
window.React = React; // for chrome dev tool support


app.rehydrate(dehydratedState, function (err, context) {

    if (err) {
        throw err;
    }

    window.context = context;

    var mountNode = document.getElementById('roisalen');

    React.withContext(context.getComponentContext(), function () {
        React.render(
            app.getAppComponent()(),
            mountNode
        );
    });
});