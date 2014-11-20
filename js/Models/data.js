define(["backbone"], function (backbone) {

    var eventBtn = { btn: "" };

    var masModels = [{ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" },
        { name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" },
        { name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" }];

    var TableModel = Backbone.Model.extend({

        defaults: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            id: "",
        }
    });

    var TableCollectionModel = Backbone.Collection.extend({

        model: TableModel,

        comparator: function (modelA, modelB) {
            if (eventBtn["btn"] === "namesort") {
                if (modelA.get("name") < modelB.get("name")) return -1;
                if (modelA.get("name") > modelB.get("name")) return 1;
                else return 0;
            }
            if (eventBtn["btn"] === "namesortalt") {
                if (modelA.get("name") < modelB.get("name")) return 1;
                if (modelA.get("name") > modelB.get("name")) return -1;
                else return 0;
            }

            if (eventBtn["btn"] === "descriptionsort") {
                if (modelA.get("description") < modelB.get("description")) return -1;
                if (modelA.get("description") > modelB.get("description")) return 1;
                else return 0;
            }
            if (eventBtn["btn"] === "descriptionsortalt") {
                if (modelA.get("description") < modelB.get("description")) return 1;
                if (modelA.get("description") > modelB.get("description")) return -1;
                else return 0;
            }

            if (eventBtn["btn"] === "pricesort") {
                if (modelA.get("price") < modelB.get("price")) return -1;
                if (modelA.get("price") > modelB.get("price")) return 1;
                else return 0;
            }
            if (eventBtn["btn"] === "pricesortalt") {
                if (modelA.get("price") < modelB.get("price")) return 1;
                if (modelA.get("price") > modelB.get("price")) return -1;
                else return 0;
            }

            if (eventBtn["btn"] === "quantitysort") {
                if (modelA.get("quantity") < modelB.get("quantity")) return -1;
                if (modelA.get("quantity") > modelB.get("quantity")) return 1;
                else return 0;
            }
            if (eventBtn["btn"] === "quantitysortalt") {
                if (modelA.get("quantity") < modelB.get("quantity")) return 1;
                if (modelA.get("quantity") > modelB.get("quantity")) return -1;
                else return 0;
            }
        },
    });

    return {
        eventBtn: eventBtn,
        masModels: masModels,
        TableModel: TableModel,
        TableCollectionModel: TableCollectionModel
    };
});