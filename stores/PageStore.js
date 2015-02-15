var createStore = require('fluxible/utils/createStore');

var PageStore = createStore({
    storeName: 'PageStore',
    handlers: {
        'UPDATE_PAGE_TITLE': 'updatePageTitle'
    },
    initialize: function (dispatcher) {
        this.pageTitle = '';
    },
    updatePageTitle: function (title) {
        this.pageTitle = title;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    dehydrate: function () {
        return {
            pageTitle: this.pageTitle
        };
    },
    rehydrate: function (state) {
        this.pageTitle = state.pageTitle;
    }
});


module.exports = PageStore;