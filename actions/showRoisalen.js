module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_ORGANISATIONS_START', payload);
    context.dispatch('UPDATE_PAGE_TITLE', 'Roisalen');

    context.service.read('organisation', {}, {}, function (err, organisations) {
        console.log("reading request");
        if (err) {
            context.dispatch('RECEIVE_ORGANISATIONS_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_ORGANISATIONS_SUCCESS', organisations);
        done();
    });
};