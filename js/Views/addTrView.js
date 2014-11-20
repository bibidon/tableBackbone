define(["jquery", "backbone", "underscore", "_localStorage", "Models/data", "_validate", "_totalSumma"], function ($, Backbone, _, history, collection, val, sum) {

    var View = Backbone.View.extend({

        el: $(".exampleTable"),

        template: _.template($("#addTr").html()),

        initialize: function () {
            history._localStorage();
            this.collection = new collection.TableCollectionModel(collection.masModels);
            this.render();
            this.listenTo(this.collection, "add", this.render);
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
            "click .btn-trash": "supplementaryMethod",
            "click .btn-ok": "supplementaryMethod",
            "click .btn-cansel": "supplementaryMethod",
            "click .btn-sort": "supplementaryMethod"
        },

        eventsValidate: function () {
            $("textarea").each(function (indx, el) {
                $(el).change(val._addValidate);
                $(el).change(val._removeValidate);
                $(el).change(val._alertValidate);
            });
        },

        //метод для вызова методов в зависимости от нажатой кнопки
        supplementaryMethod: function (event) {
            if (event.currentTarget.classList.contains("btn-plus")) {
                this.visToHi(event);
                this.textareaAndButton();
                this.eventsValidate();
            }
            if (event.currentTarget.classList.contains("btn-addok")) {
                if (val._masIncorrect.length != 0) { return; }
                this.saveNewTr();
                this.hiToVis(event);
            }
            if (event.currentTarget.classList.contains("btn-addcansel")) {
                this.hiToVis(event);
                val._deleteView();
            }
            if (event.currentTarget.classList.contains("btn-edit")) {
                this.editind(event);
                this.visToHi(event);
                this.eventsValidate();
            }
            if (event.currentTarget.classList.contains("btn-trash")) {
                this.remove(event);
            }
            if (event.currentTarget.classList.contains("btn-ok")) {
                if (val._masIncorrect.length != 0) { return; }
                this.save(event);
                this.hiToVis(event);
            }
            if (event.currentTarget.classList.contains("btn-cansel")) {
                this.cancel(event);
                this.hiToVis(event);
                this.render();
                val._deleteView();
            }
            if (event.currentTarget.classList.contains("btn-sort")) {
                var that = this;
                collection.eventBtn["btn"] = event.currentTarget.name;
                (function () {
                    that.collection.sort();
                })();
                this.render();
            }
        },


        //метод вставки текстовых полей и отображения скрытых кнопок 
        //при нажатии кнопки создать
        textareaAndButton: function () {
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
        },

        //метод для сохранения изменений в строках(моделях)
        save: function (event) {
            var id = event.currentTarget.id;
            $("#" + id + "> td > textarea").each(function (indx, el) {
                var value = $(el).val();
                this.parentNode.innerHTML = value;
                $(el).detach();
            });

            var newModel = {
                "name": "",
                "description": "",
                "price": "",
                "quantity": "",
                "id": id
            };
            var trTd = $("#" + id + "> td");
            _.each(trTd, function (td) {
                if (td.attributes.length === 0 || !!(td.attributes.class)) return;
                newModel[td.getAttribute("name")] = $(td).text();
            });
            for (var i = 0; i < collection.masModels.length; i++) {
                if (collection.masModels[i]["id"] === id) {
                    collection.masModels.splice(i, i);
                    collection.masModels.push(newModel);
                }
            }
            history._remove(id);
            history._add();
            this.collection.set(collection.masModels);
        },

        //метод для отмены изменений в строках(моделях)
        cancel: function (event) {
            var id = event.currentTarget.id;
            $("#" + id + "> td > textarea").detach();
        },

        //метод для скрытия и отображения кнопок
        visToHi: function (event) {
            if (event.currentTarget.className.search(/btn-plus/) != -1) {
                $("#newTr > td > button.btn-plus").addClass("btn-hidden");
                $("#newTr > td > button.btn-addok").addClass("btn-visible");
                $("#newTr > td > button.btn-addcansel").addClass("btn-visible");
            } else {
                $("#" + event.currentTarget.id + "> td > button.btn-edit").addClass("btn-hidden");
                $("#" + event.currentTarget.id + "> td > button.btn-trash").addClass("btn-hidden");
                $("#" + event.currentTarget.id + "> td > button.btn-ok").addClass("btn-visible");
                $("#" + event.currentTarget.id + "> td > button.btn-cansel").addClass("btn-visible");
            }
        },

        //метод для скрытия и отображения кнопок
        hiToVis: function (event) {
            if (event.currentTarget.className.search(/btn-addok/) != -1 || event.currentTarget.className.search(/btn-addcansel/) != -1) {
                $("textarea").remove();
                $("#newTr > td > button.btn-plus").removeClass("btn-hidden");
                $("#newTr > td > button.btn-addok").removeClass("btn-visible");
                $("#newTr > td > button.btn-addcansel").removeClass("btn-visible");
            } else {
                $("#" + event.currentTarget.id + "> td > button.btn-edit").removeClass("btn-hidden");
                $("#" + event.currentTarget.id + "> td > button.btn-trash").removeClass("btn-hidden");
                $("#" + event.currentTarget.id + "> td > button.btn-ok").removeClass("btn-visible");
                $("#" + event.currentTarget.id + "> td > button.btn-cansel").removeClass("btn-visible");
            }
        },

        //метод для сортировки данных(моделей) в таблице
        //sort: function (event) {
        //    if (event.currentTarget.name === "namesort") {
        //        this.collection.comparator = function (modelA, modelB) {
        //            if (modelA.get("name") < modelB.get("name")) return -1;
        //            if (modelA.get("name") > modelB.get("name")) return 1;
        //            else return 0;
        //        }();
        //    }

        //    if (event.currentTarget.name === "namesortalt") {
        //        this.collection.comparator = function (modelA, modelB) {
        //            if (modelA.get("name") < modelB.get("name")) return 1;
        //            if (modelA.get("name") > modelB.get("name")) return -1;
        //            else return 0;
        //        }();
        //    }
        //}
    });

    return View;

});