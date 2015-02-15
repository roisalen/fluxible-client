var createStore = require('fluxible/utils/createStore');


module.exports = createStore({
    storeName: 'OrganisationStore',
    handlers: {
        'RECEIVE_ORGANISATIONS_SUCCESS': '_receiveOrganisations',
        'CREATE_ORGANISATION_START': '_createOrganisationStart',
        'CREATE_ORGANISATION_FAILURE': '_createOrganisationFailure',
        'CREATE_ORGANISATION_SUCCESS': '_createOrganisationSuccess',
    },
    initialize: function () {
        this.organisations = [];
    },
    _receiveOrganisations: function (organisations) {
        this.organisations = organisations;
        this.emitChange();
    },
    _createOrganisationStart: function (organisation) {
        this.organisations.push(organisation);
        this.emitChange();
    },
    _createOrganisationSuccess: function (newOrganisation) {
        this.organisations.forEach(function (organisation, index) {
            if (organisation.id === newOrganisation.id) {
                this.organisations.splice(index, 1, newOrganisation);
            }
        }, this);

        this.emitChange();
    },
    _createOrganisationFailure: function (failedOrganisation) {
        this.organisation.forEach(function (organisation, index) {
            if (organisation.id === failedOrganisation.id) {
                organisation.failure = true;
            }
        }, this);

        this.emitChange();
    },
    getAll: function () {
        console.log("getting all");
        console.log(this.organisations);
        return this.organisations;
    },
    createOrganisation: function(details) {
        return {
            id:  details._id,
            name: details.name,
            css: details.css,
            shortName: details.shortName
        };
    },
    dehydrate: function () {
        return {
            organisations: this.organisations
        };
    },
    rehydrate: function (state) {
        this.organisations = state.organisations;
    }
});