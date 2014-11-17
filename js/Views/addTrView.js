define(["jquery", "backbone", "underscore", "Models/data"], function ($, Backbone, _, collection) {

    var View = Backbone.View.extend({

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.el = $("#newTr");
            this.$el = this.el;
            this.collection = collection.readyCollection;
            this.render();
            this.collection.on("add", this.render, this);
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
        },

        events: {
            "click .btn-plus": "supplementaryMethod",
            "click .btn-addok": "supplementaryMethod",
            "click .btn-addcansel": "supplementaryMethod",
        },

        supplementaryMethod: function (event) {
            if (event.currentTarget.classList.contains("btn-plus")) {
                this.textareaAndButton();
            }
            if (event.currentTarget.classList.contains("btn-addok")) {
                this.saveNewTr();
                this.visibleAndHidde();
            }
            if (event.currentTarget.classList.contains("btn-addcansel")) {
                this.visibleAndHidde();
            }
        },

        textareaAndButton: function () {
            $("#newTr > td > button.btn-plus").addClass("btn-hidden");
            $("#newTr > td > button.btn-addok").addClass("btn-visible");
            $("#newTr > td > button.btn-addcansel").addClass("btn-visible");
            _.each($("#newTr > td"), function (td) {
                if (td.classList.length != 0) return;
                td.innerHTML = "<textarea cols='10' rows='1'></textarea>";
            });
        },

        saveNewTr: function () {

            var counter = (function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return function () {
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
                };
            })();

            var id = counter();
            var newModel = {
                "name": "",
                "description": "",
                "price": "",
                "quantity": "",
                "id": id
            };
            var lastTrTd = $("#newTr > td");
            _.each(lastTrTd, function (td) {
                if (td.classList.length != 0) return;
                newModel[td.getAttribute("name")] = $(td.children).val();
            });
            collection.masModels.push(newModel);
            //this._addLocalStorage();
            collection.readyCollection.add(newModel);
        },

        visibleAndHidde: function () {
            $("textarea").remove();
            $("#newTr > td > button.btn-plus").removeClass("btn-hidden");
            $("#newTr > td > button.btn-addok").removeClass("btn-visible");
            $("#newTr > td > button.btn-addcansel").removeClass("btn-visible");
        },
    });

    return View;

});