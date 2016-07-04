modulejs.define( "app/collections/people",
    [
        "app/models/person"
    ],
    ( PersonModel ) => {

        var apiRootUrl = window.App.Modules.Config.apiRootUrl;
        // return Backbone.Collection.extend({
        //     url: () => { return apiRootUrl + "/people" },
        //     model: PersonModel,
        //
        //     parse: function(resp, options) {
        //         this.meta = _.omit( resp, 'results');
        //         return resp.results;
        //     }
        // });

        return Backbone.PageableCollection.extend({
            url: () => { return apiRootUrl + "/people" },
            model: PersonModel,
            queryParams: {
                totalPages: null,
                totalRecords: null
            },

            parseRecords: function (resp, options) {
                this.meta = _.omit( resp, 'results');
                return resp.results;
            },

            parseState: function (resp, queryParams, state, options) {
                return {totalRecords: resp.count};
            },

            getPage( index, options = {} ){
                Backbone.PageableCollection.prototype.getPage.call(this, index, options);
                this.trigger("page:change");
            }
        });

    });