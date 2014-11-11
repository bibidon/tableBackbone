requirejs.config({
    paths: {
        jquery: "./../bower_components/jquery/dist/jquery",
        backbone: "./../bower_components/backbone/backbone",
        underscore: "./../bower_components/underscore/underscore",
    },
    shim: {
        "underscore": { exports: "_" },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "backbone"
        }
    }
});

require(["Models/data", "Controllers/headerController", "Controllers/addTrController"], function (data, headerController, addTrController) {

    var allObject = [new data({ name: "bread", description: "white", price: 5, quantity: 10, id: "bottom" }),
        new data({ name: "butter", description: "soft", price: 2, quantity: 20, id: "middle" }),
        new data({ name: "sausage", description: "cooked", price: 15, quantity: 5, id: "top" })];

    headerController.start();
    addTrController.start();
});