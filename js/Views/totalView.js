define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

    var View = Backbone.View.extend({

        template: _.template($("#summa").html()),

        initialize: function () {
            this.el = $("#total");
            this.$el = this.el;
            this.render();
        },

        render: function () {
            $(".exampleTable").after(this.template());
            return this;
        }
    });

    return View;
})