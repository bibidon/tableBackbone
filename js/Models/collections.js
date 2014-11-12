define(function () {

    function doModelAndCollection() {

        //функция-конструктор модели
        this.TableModel = Backbone.Model.extend({
            defaults: {
                name: "",
                description: "",
                price: "",
                quantity: "",
                id: ""
            }
        });

        //функция-конструктор колекции 
        this.TableCollectionModel = Backbone.Collection.extend({
            model: TableModel
        });
    }

    return { doModelAndCollection: doModelAndCollection };
});