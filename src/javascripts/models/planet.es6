modulejs.define( "app/models/planet", () => {

    var apiRootUrl = window.App.Modules.Config.apiRootUrl;
    return Backbone.Model.extend({
        urlRoot: apiRootUrl + "/planets"
    });

});