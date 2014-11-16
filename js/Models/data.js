define(["backbone"], function (backbone) {

    var masModels = [{ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" },
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
        model: TableModel,
        });

    var readyCollection = new TableCollectionModel(masModels);

    return readyCollection;
});