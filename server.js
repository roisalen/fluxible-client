require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var React = require('react');
var app = require('./app');
var showRoisalen = require('./actions/showRoisalen');
var HtmlComponent = React.createFactory(require('./components/HTML.jsx'));


var server = express();
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));


// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our organisation REST service
fetchrPlugin.registerService(require('./services/organisation'));


// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(showRoisalen, {}, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                return next();
            }
            else {
                return next(err);
            }
        }

        console.log("executing action");

        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        var AppComponent = app.getAppComponent();
        React.withContext(context.getComponentContext(), function () {
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: exposed,
                markup: React.renderToString(AppComponent())
            }));

            res.send(html);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
