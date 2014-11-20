define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

    var View = Backbone.View.extend({

        template: _.template($("#val").html()),

        initialize: function () {
            this.render();
            this.el = $(".tooltipHidden");
            this.$el = this.el;
        },

        render: function () {
            $(".exampleTable").after(this.template());
            return this;
        }
    });

    return View;
});