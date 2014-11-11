define(["jquery", "backbone", "main"], function ($, Backbone, main) {

    function initTr() {
        var TrView = Backbone.View.extend({
            el: $("#newTr"),

            template: _.template($("#addTr").html()),

            initialize: function () {
                this._startLocalStorage();
                this.collection = new TableCollectionModel(main.allObject);
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

            //метод guid для генерации id 
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
                main.allObject.push(newModel);
                this._addLocalStorage();
                this.collection.add(new TableModel(newModel));
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
            editind: function () { },

            //метод для правильного отображения таблицы при загрузке страницы.
            //Метод работает с объектом local Storage
            _startLocalStorage: function () {
                if (localStorage.length === 0) {
                    for (var i = 0; i < main.allObject.length; i++) {
                        localStorage.setItem(main.allObject[i]["id"], JSON.stringify(main.allObject[i]));
                    }
                } else {
                    for (var prop in localStorage) {
                        var obj = JSON.parse(localStorage[prop]);
                        main.allObject.push(obj);
                    }
                }
            },

            //метод для добавления новой строки в Local Storage
            _addLocalStorage: function () {
                for (var i = 0; i < main.allObject.length; i++) {
                    localStorage.setItem(main.allObject[i]["id"], JSON.stringify(main.allObject[i]));
                }
            }

        });

        var trView = new TrView();
    }

    return {
        initTr: initTr
    };
});