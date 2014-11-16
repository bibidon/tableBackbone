define(["jquery", "backbone", "underscore", "Models/data"], function ($, Backbone, _, collection) {

    var View = Backbone.View.extend({

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.collection = collection;
            this.render();
        },

        renderTr: function (item) {

            this.model = item;
            $("#newTr").before(this.template(this.model.toJSON()));
            return this;
        },

        render: function () {
            $("tr").filter(".render").remove();
            _.each(this.collection.models, function (item) {
                this.renderTr(item);
            }, this);
        }
    });

    return View;

});