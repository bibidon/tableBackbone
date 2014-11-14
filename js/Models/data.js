define(["backbone"], function (backbone) {

    var masModels = [new model({ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" }),
        new model({ name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" }),
        new model({ name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" })];

    function model(setup) {
        this.name = setup.name;
        this.description = setup.description;
        this.price = setup.price;
        this.quantity = setup.quantity;
        this.id = setup.id;
        this.models = masModels;
    };

    function collection() {

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

    var coll = new collection(masModels);

    return {
        model: model,
        collection: collection
    };
});