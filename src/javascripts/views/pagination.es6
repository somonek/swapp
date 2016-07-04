modulejs.define( "app/views/pagination",
    [
        'app/views/loader'
    ],
    ( LoaderView ) => {

       return Backbone.Marionette.ItemView.extend({
           template: templates.get("pagination.ejs"),
           tagName: "ul",
           className: "pagination center-align",

           events: {
               "click .previous": "getPreviousPage",
               "click .next": "getNextPage"
           },

           initialize(){
               this.model = new Backbone.Model();
               this.setButtonsClass();
           },

           getPreviousPage(){
               this.renderLoader();
               let prevPage = this.getPageNumberHelper( this.collection.meta.previous );
               this.collection.fetch( {reset: true, data:  $.param({ page: prevPage}) } ).done(() => {
                   this.collection.trigger('page:change');
                   this.setButtonsClass();
                   this.render();
               });
           },

           setButtonsClass(){
               this.model.set("prev_class", this.getButtonClassHelper( this.collection.meta.previous ));
               this.model.set("next_class", this.getButtonClassHelper( this.collection.meta.next ));
           },

           getNextPage(){
               this.renderLoader();
               let nextPage = this.getPageNumberHelper( this.collection.meta.next );
               this.collection.fetch( {reset: true, data:  $.param({ page: nextPage}) } ).done(() => {
                   this.collection.trigger('page:change');
                   this.setButtonsClass();
                   this.render();
               });
           },

           getPageNumberHelper( url ){
               // bad practice but works for this particular case
               return url.substr( url.length - 1 );
           },

           getButtonClassHelper( url ){
               return _.isNull( url ) ? "disabled" : "waves-effect"
           },

           renderLoader(){
               let loaderView = new LoaderView();
               this.$el.html( loaderView.render().el );
           }
       });
    });