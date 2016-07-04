// define namespacing
window.App = App = {
    Modules: {
        Config: {}
    }
};


App.Modules.Config = {
    apiRootUrl: "http://swapi.co/api"
};

App.Modules.Cache = {
    lastFetchedPersonId: null
};

App.Modules.Helpers = {
    getIdFromUrl: ( url ) => {
       return parseInt( url.match(/(\d)/g).join('') );
    },

    ContentContainer:{
        $el: () => { return $("#swappContent") },
        toggle(){
            this.$el().attr("data-state") === "in" ? this.slide("out") : this.slide("in");
        },
        slide( direction, speed = 300 ){
            var $col = this.$el();
            var width = $col.outerWidth();
            var left1;

            switch( direction ){
                case "in":
                    right = -width;
                    break;
                case "out":
                    right = 0;
            }
            $col.animate({
                right: right
            }, speed);

            $col.attr("data-state", direction);
        }
    }
};
