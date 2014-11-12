define(function () {

    function doModelAndCollection() {

        this.TableModel = Backbone.Model.extend({
            defaults: {
                name: "",
                description: "",
                price: "",
                quantity: "",
                id: ""
            }
        });

        this.TableCollectionModel = Backbone.Collection.extend({
            model: this.TableModel
        });
    }

    return doModelAndCollection;
});