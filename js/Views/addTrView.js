define(["jquery", "backbone", "underscore", "_localStorage", "Models/data"], function ($, Backbone, _, history, collection) {

    var View = Backbone.View.extend({

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.el = $("#newTr");
            this.$el = this.el;
            history._localStorage();
            this.collection = new collection.TableCollectionModel(collection.masModels);
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
            //"click .btn-edit": "supplementaryMethod"
        },

        otherEvents: function () {
            $(".btn-edit").each(function (el) {
                el.addEventListener("click", editind(), false);
            });
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
                this.editind();
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
            history._addLocalStorage();
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

        //метод для редактирования моделей
        editind: function () {

        },
    });

    return View;

});