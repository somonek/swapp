modulejs.define( "app/collections/planets",
    [
        "app/models/planet"
    ],
    ( PlanetModel ) => {

        var apiRootUrl = window.App.Modules.Config.apiRootUrl;
        return Backbone.Collection.extend({
            url: () => { return apiRootUrl + "/planets" },
            model: PlanetModel,

            parse: function(resp, options) {
                this.meta = _.omit( resp, 'results' );
                return resp.results;
            }
        });

    });