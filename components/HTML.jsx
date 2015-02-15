var React = require('react');
var PageStore = require('../stores/PageStore');
var FluxibleMixin = require('fluxible').Mixin;

var Component = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.getStore(PageStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="/public/base.css" />
                <link rel="stylesheet" href="/public/styles.css" />
            </head>
            <body>
                <section id="roisalen" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/public/js/client.js" defer></script>
            </html>
        );
    }
});


module.exports = Component;