﻿$(function () {
    var TableModel = Backbone.Model.extend({});

    var tableModel = new TableModel();

    var TableCollectionModel = Backbone.Collection.extend({
        model: TableModel
    });

    var tableCollectionModel = new TableCollectionModel([
        {
            name: "bread",
            description: "white",
            price: 5,
            quantity: 10,
            id: "bottom"
        },
        {
            name: "butter",
            description: "soft",
            price: 2,
            quantity: 20,
            id: "middle"
        },
        {
            name: "sausage",
            description: "cooked",
            price: 15,
            quantity: 5,
            id: "top"
        }
    ]);

    var TableView = Backbone.View.extend({
        el: $(".exampleTable"),
        template: _.template($("#startTable").html()),
        initialize: function () { this.render(); },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    var tableView = new TableView();

    var TrView = Backbone.View.extend({
        el: $("#newTr"),
        template: _.template($("#addTr").html()),
        initialize: function () { this.render(); },
        renderTr: function (item) {
            this.model = item;
            this.$el.before(this.template(this.model.toJSON()));
            return this;
        },
        render: function () {
            _.each(this.collection.models, function (item) {
                this.renderTr(item);
            }, this);
        }
    });

    var trView = new TrView({ collection: tableCollectionModel });
})