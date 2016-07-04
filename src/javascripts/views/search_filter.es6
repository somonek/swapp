modulejs.define("app/views/search_filter", () => {

    return Backgrid.Extension.ClientSideFilter.extend({
        template: templates.get("search_filter.ejs"),
        className: "",

        // after clearing the searchbox, unfocus the field as well
        clearSearchBox(){
            Backgrid.Extension.ClientSideFilter.prototype.clearSearchBox.call(this);
            this.searchBox().focusout();
            this.trigger("results:yes");
        },

        search() {
            Backgrid.Extension.ClientSideFilter.prototype.search.call(this);
            let eventToTrigger = this.collection.length === 0 ? "results:no" : "results:yes";
            this.trigger( eventToTrigger );
        }
    });

});