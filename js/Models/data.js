﻿define(function () {

    var data = function (setup) {
        this.name = setup.name;
        this.description = setup.description;
        this.price = setup.price;
        this.quantity = setup.quantity;
        this.id = setup.id;
    };

    return data;
});