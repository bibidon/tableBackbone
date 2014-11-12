define(["Models/data", "Models/collections", "Controllers/headerController", "Controllers/addTrController"], function (data, collections, headerController, addTrController) {

    var init = function () {
        var allObject = [new data({ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" }),
            new data({ name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" }),
            new data({ name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" })];
        return allObject;
    };

    return init;

})