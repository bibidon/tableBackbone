define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

    var View = Backbone.View.extend({

        template: _.template($("#summa").html()),

        initialize: function () {
            this.render();
            this.el = $(".divSum");
            this.$el = this.el;
        },

        render: function () {
            $(".exampleTable").after(this.template());
            return this;
        }

    });

    return View;

})