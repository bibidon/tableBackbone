define(["jquery", "backbone", "underscore", "_localStorage", "Models/data"], function ($, Backbone, _, history, collection) {

    var View = Backbone.View.extend({

        el: $(".exampleTable"),

        template: _.template($("#addTr").html()),

        initialize: function () {
            history._localStorage();
            this.collection = new collection.TableCollectionModel(collection.masModels);
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

        events: {
            "click .btn-plus": "supplementaryMethod",
            "click .btn-addok": "supplementaryMethod",
            "click .btn-addcansel": "supplementaryMethod",
            "click .btn-edit": "supplementaryMethod",
            "click .btn-trash": "supplementaryMethod"
        },

        //метод для вызова методов в зависимости от нажатой кнопки
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
            if (event.currentTarget.classList.contains("btn-edit")) {
                this.editind(event);
            }
            if (event.currentTarget.classList.contains("btn-trash")) {
                this.remove(event);
            }
        },


        //метод вставки текстовых полей и отображения скрытых кнопок 
        //при нажатии кнопки создать
        textareaAndButton: function () {
            $("#newTr > td > button.btn-plus").addClass("btn-hidden");
            $("#newTr > td > button.btn-addok").addClass("btn-visible");
            $("#newTr > td > button.btn-addcansel").addClass("btn-visible");
            _.each($("#newTr > td"), function (td) {
                if (td.classList.length != 0) return;
                td.innerHTML = "<textarea cols='10' rows='1'></textarea>";
            });
        },

        //метод создания новой модели, добавления ее в колекцию
        //при нажатии кнопки сохранить
        saveNewTr: function () {
            //функция guid для генерации id 
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
            history._add();
            this.collection.add(new collection.TableModel(newModel));
        },

        //метод скрывает кнопки сохранить, отмена и показывает кнопку создать
        //при нажатии кнопки сохранить и ПРИ НАЖАТИИ КНОПКИ ОТМЕНА 
        //удаляет все textarea и возвращает строчку в первоначальное состояние!!!!
        visibleAndHidde: function () {
            $("textarea").remove();
            $("#newTr > td > button.btn-plus").removeClass("btn-hidden");
            $("#newTr > td > button.btn-addok").removeClass("btn-visible");
            $("#newTr > td > button.btn-addcansel").removeClass("btn-visible");
        },

        //метод для редактирования строк (моделей)
        editind: function (event) {
            var id = event.currentTarget.id;
            $("#" + id + "> td").each(function (indx, el) {
                if (indx != 0 && indx != 5) {
                    var value = $(el).text();
                    $(el).text("");
                    $(el).append("<textarea cols='10' rows='1'>" + value + "</textarea>");
                }
            });
            $("#" + id + "> td > button.btn-edit").addClass("btn-hidden");
            $("#" + id + "> td > button.btn-trash").addClass("btn-hidden");
            $("#" + id + "> td > button.btn-ok").addClass("btn-visible");
            $("#" + id + "> td > button.btn-cansel").addClass("btn-visible");
        },

        //метод для удаления строк(моделей)
        remove: function (event) {
            var id = event.currentTarget.id;
            $("#" + id).remove();
            history._remove(id);
            for (var i = 0; i < collection.masModels.length; i++) {
                for (var prop in collection.masModels[i]) {
                    if (collection.masModels[i][prop] === id) { collection.masModels.splice(i, i); }
                }
            }
        }
    });

    return View;

});