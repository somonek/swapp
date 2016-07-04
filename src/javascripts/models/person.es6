modulejs.define( "app/models/person", () => {

    var apiRootUrl = window.App.Modules.Config.apiRootUrl;
    return Backbone.Model.extend({
        urlRoot: apiRootUrl + "/people",
        
        parse: function(resp, options) {
            resp.id = window.App.Modules.Helpers.getIdFromUrl( resp.url );
            return resp;
        }
    });

});