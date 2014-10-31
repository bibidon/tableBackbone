$(function () {

    //объект с начальными данными
    var allObject = [
    { name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" },
    { name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" },
    { name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" }];

    //функция-конструктор модели
    var TableModel = Backbone.Model.extend({
        defaults: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            id: ""
        }
    });

    //функция-конструктор солекции 
    var TableCollectionModel = Backbone.Collection.extend({
        model: TableModel
    });

    //функция-конструктор вьюшки для создания первой и последней строки 
    //(шапка и строка добавления)
    var TableView = Backbone.View.extend({
        el: $(".exampleTable"),

        template: _.template($("#startTable").html()),

        initialize: function () { this.render(); },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    //создание экземпляра класса TableView
    var tableView = new TableView();

    //функция-конструктор для основной вьюшки
    var TrView = Backbone.View.extend({
        el: $("#newTr"),

        template: _.template($("#addTr").html()),

        initialize: function () {
            this.collection = new TableCollectionModel(allObject);
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
            "click .btn-addcansel": "supplementaryMethod"
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
            allObject.push(newModel);
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
        editind: function () { }
    });

    //создание экземпляра класса TrView
    var trView = new TrView();
})