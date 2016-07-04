modulejs.define("app/views/search_filter", () => {

    return Backgrid.Extension.ClientSideFilter.extend({
        template: templates.get("search_filter.ejs"),
        className: "",
        
        //filter through the collection and find the matches 
        // makeMatcher: function( query ){
        //     debugger;
        //     return function (model) {
        //         return this.makeRegExp( query ).test( model.get("name") );
        //     };
        // },

        // after clearing the searchbox, unfocus the field as well
        clearSearchBox(){
            Backgrid.Extension.ClientSideFilter.prototype.clearSearchBox.call(this);
            this.searchBox().focusout();
        }
    });

});