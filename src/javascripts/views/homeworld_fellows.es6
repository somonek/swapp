modulejs.define( "app/views/homeworld_fellows", () => {

    let rowView = Backbone.Marionette.ItemView.extend({
        template: templates.get("homeworld_fellow_item.ejs"),
        className: "chip",

        initialize(){
            this.model.set("name", "loading...");
            this.model
                .fetch()
                .then(() => {
                    this.render();
                });
        }
    });
    
    return Backbone.Marionette.CompositeView.extend({
        template: _.template(`
            <div class="divider margin-top-20"></div>
            <p><b>Other people from the same homeworld:</b></p>
            <div class="fellows-cnt"></div>
        `),
        childView: rowView,
        itemViewContainer: ".fellows-cnt",
        events: {
            "click a.p-name": "personClick"
        },

        personClick( e ){
            e.preventDefault();
            // TODO: should fetch and show the details for the clicked item
        },

        onShow(){
            if( this.collection.length === 0 ){
                this.$el.html("<p>This guy is the only one in this homeworld!</p>");
            }
        }
    });
});