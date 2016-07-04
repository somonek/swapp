modulejs.define( "app/views/results",
    [
        'app/models/person'
    ],
    (
        PersonModel
    ) => {
        
        var rowView = Backbone.Marionette.ItemView.extend({
            template: false,
            tagName: "a",
            className: "collection-item",
            events: {
                "click": "itemClick"
            },

            initialize(){
                this.$el
                    .html( this.model.get("name") )
                    .prop( "href", "#" )
                    .attr( "data-id", this.model.get("id") );
            },

            itemClick(e){
                let $item = $(e.target);
                window.App.Modules.Helpers.ContentContainer.slide("out");
                this.seePersonDetails( $item );
                this.makeItemActive( $item );
                e.preventDefault();
            },

            seePersonDetails( $item ){
                let itemId = $item.attr("data-id");
                let Person = new PersonModel( {id: itemId} );

                if( window.App.Modules.Cache.lastFetchedPersonId === itemId ) return;
                window.App.Modules.Cache.lastFetchedPersonId = itemId;

                Backbone.Events.trigger( "person:data:before:fetch" );
                Person
                    .fetch()
                    .then(() => {
                        Backbone.Events.trigger( "person:data:fetch", Person );
                    });
            },

            makeItemActive( $item ){
                $(".collection .collection-item").removeClass("active");
                $item.addClass("active");
            }
        });

        return Backgrid.Grid.extend({
            columns: [{
                name: "name",
                label: "Name",
                cell: rowView
            }],
            className: "backgrid collection"
        });
    });