modulejs.define( "app/collections/people",
    [
        "app/models/person"
    ],
    ( PersonModel ) => {

        var apiRootUrl = window.App.Modules.Config.apiRootUrl;
         return Backbone.Collection.extend({
             url: () => { return apiRootUrl + "/people" },
             model: PersonModel,

             parse: function(resp, options) {
                 this.meta = _.omit( resp, 'results');
                 return resp.results;
             }
         });

    });