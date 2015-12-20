module.exports = function (context, payload, done) {
    context.dispatch('CREATE_ORGANISATION_START', payload);
    context.dispatch('UPDATE_PAGE_TITLE', 'Legg til organisasjon');

};