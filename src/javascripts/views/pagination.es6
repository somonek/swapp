modulejs.define( "app/views/pagination", () => {

       return Backbone.Marionette.ItemView.extend({
           template: templates.get("pagination.ejs"),
           tagName: "ul",
           className: "pagination center-align",

           initialize(){
               debugger;
           }
       });
    });