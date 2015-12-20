var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var OrganisationStore = require('../stores/OrganisationStore');

var Component = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: {
            _onChange: [OrganisationStore]
        }
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        return {
            organisations: this.getStore(OrganisationStore).getAll()
        };
    },
    _onChange: function() {
        this.setState(this.getState());
    },

    createOrganisationDomElements: function() {
        var organisationsList;
        var organisations = this.state.organisations;
        
        if (organisations.length) {           
            var organisationItems = organisations.map(function (organisation) {
                return (
                    <li>
                        <a href={""+organisation.id} className={"organisation"} > 
                            <img className={"logo"} 
                                src={"/public/images/logo_"+organisation.shortName+".jpg"} />
                            {organisation.name} 
                        </a>
                    </li>
                );
            }, this);

            organisationsList = (
                <section id="main">
                    <ul id="organisation-list">
                        {organisationItems}
                    </ul>
                </section>
            );
        }

        return organisationsList;

    },
    render: function() {
        var main = this.createOrganisationDomElements();


        return (
            <div>
                <header id="header">   
                    <h1><span className={"glyphicon glyphicon-bullhorn"}></span>Roisalen</h1>
                </header>
                {main}
                <a className="new-organisation" href="add-organisation">
                    <div className="add-icon">+</div>Legg til ny organisasjon
                </a>
            <hr/>
            <h2>Om Roisalen</h2>
            Vi prøver å lage enkle digitale verktøy for å gjøre store møter bedre. Foreløpig har vi laget verktøy som:
            <ul>
                <li>Holder styr på talelista for deg</li>
                <li>Innebygd klokke for å sørge for at alle får prate like lenge</li>
                <li>Lager statistikk over hvem som har pratet mest på dette møtet</li>
                <li>Viser sakstittel og dele beskjeder med salen</li>
            </ul>
            Roisalen er laget på fritida av tre aktive organisasjonsmennesker: Christian Strandenæs, Stian Lågstad og Torkil Vederhus. 
            All kildekode er åpent tilgjengelig på GitHub, bidra gjerne selv! Ønsker om funksjonalitet og spesialtilpasning kan sendes til torkilv(a)gmail.com
            </div>
        );
    }
});


module.exports = Component;