define(["jquery", "backbone", "underscore", "Models/data"], function ($, Backbone, _, collection) {

    var View = Backbone.View.extend({

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.collection = collection;
            this.render();
            this.collection.on("add", this.render, this);
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
        },


        events: function () {
            $(".btn-plus").click(this.textareaAndButton);
            $(".btn-addok").click(this.saveNewTr);
            $(".btn-addok").click(this.visibleAndHidde);
        },

        idFunction: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                           .toString(16)
                           .substring(1);
            }
            return function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                       s4() + '-' + s4() + s4() + s4();
            };
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
            var id = this.idFunction();
            var newModel = {
                "name": "",
                "description": "",
                "price": "",
                "quantity": "",
                "id": id()
            };
            var lastTrTd = $("#newTr > td");
            _.each(lastTrTd, function (td) {
                if (td.classList.length != 0) return;
                newModel[td.getAttribute("name")] = $(td.children).val();
            });
            allObject.push(newModel);
            //this._addLocalStorage();
            this.collection.add(new TableModel(newModel));
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