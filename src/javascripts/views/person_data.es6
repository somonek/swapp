modulejs.define( "app/views/person_data",
    [
        'app/models/planet',
        'app/models/person',
        'app/collections/people',
        'app/views/homeworld_fellows'
    ],
    (
        PlanetModel,
        PersonModel,
        PeopleCollection,
        HomeworldFellowsView
    ) => {

        var rowView = Backbone.Marionette.LayoutView.extend({
            template: _.template(`
                <td><b><%= key %></b></td>
                <td class="value"><%= value %></td>
            `),
            tagName: "tr",
            regions: {
                value: ".value"
            },

            onShow(){
                if( this.model.get("value") instanceof Backbone.View ){
                    this.getRegion("value").show( this.model.get("value") );
                }
            }

        });

        var homeworldView = Backbone.Marionette.ItemView.extend({
            initialize(){
                this.template = _.template(`
                    <b class="teal-color"><%= name %></b>
                `);

                this.model
                    .fetch()
                    .then(()=>{
                        this.render();
                    });
            }
        });

        var dataView = Backbone.Marionette.CompositeView.extend({
            template: _.template("<tbody></tbody>"),
            itemViewContainer: "tbody",
            tagName: "table",
            className: "striped",
            childView: rowView,

            initialize(){
                var _this = this;
                let personDataCollection = new Backbone.Collection();
                let dataForTable = _.omit( this.model.attributes, [
                    'id',
                    'created',
                    'edited',
                    'films',
                    'species',
                    'vehicles',
                    'starships',
                    'url'
                ]);

                $.each( dataForTable, (key, value) => {
                    if( key === "homeworld" ){
                        let homeworldId = window.App.Modules.Helpers.getIdFromUrl( value );
                        let homeworldModel = new PlanetModel({id: homeworldId});
                        value = new homeworldView({
                            model: homeworldModel
                        })
                    }
                    personDataCollection.add({
                        key: _this.cleanKeyHelper( key ),
                        value: value
                    });
                });

                this.collection = personDataCollection;
            },

            cleanKeyHelper( key ){
                return ( key.charAt(0).toUpperCase() + key.slice(1) ).replace("_", " ");
            }
        });

        return Backbone.Marionette.LayoutView.extend({
            template: _.template(`
                <div class="close-btn right">&#10005</div>
                <div id="dataTable"></div>
                <div id="homeworldResidents"></div>
            `),
            events:{
                "click .close-btn": "closeContainer"
            },
            regions: {
                "data": "#dataTable",
                "fellows": "#homeworldResidents"
            },

            onShow(){
                this.renderPersonData();
                this.renderHomeplanetResidents();
            },

            renderPersonData(){
                this.getRegion("data").show( new dataView( {model: this.model} ));
            },

            getHomeplanetData(){
                let homeworldId = window.App.Modules.Helpers.getIdFromUrl( this.model.get("homeworld") );
                let Planet = new PlanetModel({id: homeworldId});
                return Planet.fetch();
            },

            renderHomeplanetResidents(){
                this.getHomeplanetData().then((Planet) => {
                    let residents = this.cleanResidentsArrayHelper( Planet.residents );
                    let homeWorldFellowsCollection = new PeopleCollection( residents );

                    //remove current showing person from "other people from same homeworld"
                    homeWorldFellowsCollection.remove( homeWorldFellowsCollection.where( {id: this.model.get("id")} ) );

                    let homeWorldView = new HomeworldFellowsView({
                        collection: homeWorldFellowsCollection
                    });

                    this.getRegion("fellows").show( homeWorldView );
                });
            },

            cleanResidentsArrayHelper( residents ){
                return _.map( residents, ( url )=>{
                    let personId = window.App.Modules.Helpers.getIdFromUrl( url );
                    return new PersonModel({id: personId});
                });
            },

            closeContainer(){
                window.App.Modules.Helpers.ContentContainer.slide("in")
            }
        });
    });