define(["jquery", "backbone", "underscore", "init"], function ($, Backbone, _, init) {

    function initTr() {
        var TrView = Backbone.View.extend({
            el: $("#newTr"),

            template: _.template($("#addTr").html()),

            initialize: function () {
                require(["init"], function(init) {
                    var start = new init();
                });
                this.collection = start.collection(start.allObject);
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

        var trView = new TrView();
    }

    return {
        initTr: initTr
    };
});