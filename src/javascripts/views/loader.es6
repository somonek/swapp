modulejs.define( "app/views/loader", () => {

    return Backbone.Marionette.ItemView.extend({
        template: templates.get("loader.ejs"),
        className: "center-align"
    });
});