$(function () {

    var allObject = [
    { name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" },
    { name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" },
    { name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" }];

    var TableModel = Backbone.Model.extend({
        defaults: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            id: ""
        }
    });

    var TableCollectionModel = Backbone.Collection.extend({
        model: TableModel
    });

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

        initialize: function () {
            this.render();
            this.collection.on("add", this.render, this);
        },

        renderTr: function (item) {
            this.model = item;
            this.$el.before(this.template(this.model.toJSON()));
            return this;
        },

        render: function () {
            this.collection = new TableCollectionModel(allObject);
            _.each(this.collection.models, function (item) {
                this.renderTr(item);
            }, this);
        },

        events: {
            "click .btn-plus": "textareaAndButton",
            "click .btn-addok": "saveNewTr",
        },

        textareaAndButton: function () {
            $("tr:last-child > td > button.btn-plus").addClass("btn-hidden");
            $("tr:last-child > td > button.btn-addok").addClass("btn-visible");
            $("tr:last-child > td > button.btn-addcansel").addClass("btn-visible");
            _.each($("tr:last-child > td"), function (td) {
                if (td.classList.length != 0) return;
                td.innerHTML = "<textarea cols='10' rows='1'></textarea>";
            });
        },

        saveNewTr: function () {
            var newModel = {
                "name": "",
                "description": "",
                "price": "",
                "quantity": ""
            };
            var lastTrTd = $("tr:last-child > td");
            _.each(lastTrTd, function (td) {
                if (td.classList.length != 0) return;
                newModel[td.getAttribute("name")] = $(td.children).val();
            });

            allObject.push(newModel);
            this.collection.add(new TableModel(newModel));
        }
    });

    var trView = new TrView();
})