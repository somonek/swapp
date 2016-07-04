//= require "modules/globals.es6"

//= require "views/**/*.es6"
//= require "models/**/*.es6"
//= require "collections/**/*.es6"

var swapp = Backbone.Marionette.Application.extend({
    regions: {
        results: "#results",
        filters: "#filters",
        content: "#swappContent",
        paginator: "#paginator"
    }
});

var controller = Backbone.Marionette.Object.extend({
    loaderView: modulejs.require('app/views/loader'),

    initialize(){
        let peopleCollection = modulejs.require("app/collections/people");
        this.peopleCollection = new peopleCollection({
            mode: "infinite",
            
            queryParams: {
                totalPages: null,
                totalRecords: null
            }});
        this.bindEvents()
    },

    bindEvents(){
        Backbone.Events.on("person:data:before:fetch", () => {
            Swapp.getRegion("content").show( new this.loaderView() );
        });
    },

    bindResultsViewEvents(){
        var _this = this;
        Backbone.Events.on("person:data:fetch", ( PersonModel ) => {
            let PersonDataView = modulejs.require("app/views/person_data");
            Swapp.getRegion("content").show( new PersonDataView( {model: PersonModel} ));
        });

        this.peopleCollection.on("page:change", () => {
            _this.SearchFilterView.clearSearchBox();
        })
    },

    renderResultsLoader(){
        // this stuff could go in the initialize method of the view itself, but it takes too long to get there and the loader is visible only for few milliseconds
        Swapp.getRegion("results").show( new this.loaderView() );
    },

    renderResults(){
        this.peopleCollection.fetch().then( () => {
            let resultsView = modulejs.require("app/views/results");
            let ResultsView = new resultsView({
                collection: this.peopleCollection,
                emptyText: "No results found..."
            });
            Swapp.getRegion("results").show( ResultsView );
            this.renderPaginator();
            this.bindResultsViewEvents();
        });
    },

    renderFilters(){
        let searchFilter = modulejs.require("app/views/search_filter");
        this.SearchFilterView = new searchFilter({
            collection: this.peopleCollection
        });
        Swapp.getRegion("filters").show( this.SearchFilterView );
    },

    renderPaginator(){
        let Paginator = new Backgrid.Extension.Paginator({
            collection: this.peopleCollection,
            renderIndexedPageHandles: false
        });
        Swapp.getRegion('paginator').show( Paginator );
    }
});


Swapp = new swapp();
Controller = new controller();

Swapp.addInitializer( () => {
    Controller.renderResultsLoader();
    Controller.renderResults();
    Controller.renderFilters();
});

Swapp.start();

$(document).ready( function() {
    $('select').material_select();
});