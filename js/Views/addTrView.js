define(["jquery", "backbone", "underscore", "Models/data"], function ($, Backbone, _, data) {

    var TrView = Backbone.View.extend({
        el: $("#newTr"),

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.collection = data.collection();
            this.render();
        },

        renderTr: function (item) {

            this.model = item;
            this.$el.before(this.template(this.model.toJSON()));
            return this;
        },

        render: function () {
            $("tr").filter(".render").remove();
            _.each(this.collection.models, function (item) {
                this.renderTr(item);
            }, this);
        }
    });

    return TrView;

});