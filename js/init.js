define(["Models/data", "Models/collections", "Controllers/headerController", "Controllers/addTrController"], function (data, collections, headerController, addTrController) {

    var init = (function () {

        var that = null;

        var model = function () {
            that = this;
        };

        model.prototype = {

            constructor: model,

            masModels: [new data({ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" }),
                     new data({ name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" }),
                     new data({ name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" })],

            collection: collections.doModelAndCollection,

            render: function () {
                that.headerRender();
                that.addTrRender();
            },

            headerRender: function () {
                headerController.start();
            },

            addTrRender: function () {
                addTrController.start();
            }
        };

        return model;

    })();

    return init;

})