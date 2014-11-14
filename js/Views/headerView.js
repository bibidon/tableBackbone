define(["jquery", "backbone"], function ($, Backbone) {

    var View = Backbone.View.extend({

        el: $(".exampleTable"),

        template: _.template($("#startTable").html()),

        initialize: function () { this.render(); },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return View;
});