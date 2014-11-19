define(["jquery", "backbone", "underscore"], function ($, Backbone, _) {

    var View = Backbone.View.extend({

        template: _.template($("#val").html()),

        initialize: function () {
            this.el = $(".tooltipHidden");
            this.$el = this.el;
            this.render();
        },

        render: function () {
            $(".exampleTable").after(this.template());
        }
    });

    return View;
});