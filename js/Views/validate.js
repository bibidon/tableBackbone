define(function () {

    var validateView = Backbone.View.extend({
        el: $(".exampleTable"),

        template: _.template($("#val").html()),

        initialize: function () {
            //this.render();
        }


    });
});