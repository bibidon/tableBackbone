define(["jquery", "Views/totalView"], function ($, View) {

    var doView = function () {
        return new View();
    };
    var view;
    var counter = 0;
    var totalSum = 0;

    function checkout(event) {
        var trueOrFalse = false;
        if (event.currentTarget.checked === true) {
            $("tr").each(function (indx, el) {
                if (el.id === event.currentTarget.offsetParent.parentElement.id) {
                    var price = $("#" + el.id + " td[name=price]").text();
                    var quantity = $("#" + el.id + " td[name=quantity]").text();
                    totalSum += price * quantity;
                }
            });
        }
        if (event.currentTarget.checked === false) {
            $("tr").each(function (indx, el) {
                if (el.id === event.currentTarget.offsetParent.parentElement.id) {
                    var price = $("#" + el.id + " td[name=price]").text();
                    var quantity = $("#" + el.id + " td[name=quantity]").text();
                    totalSum -= price * quantity;
                }
            });
        }

        $("input").each(function (indx, el) {
            if (el.checked === true) {
                trueOrFalse = true;
                return false;
            }
            if (el.checked === false) { trueOrFalse = false; }
        });

        if (trueOrFalse === true && counter === 0) {
            view = doView();
            counter++;
        }
        if (trueOrFalse === true && counter != 0) {
            $(".summa").text("");
            $(".summa").text(totalSum + "$");
        }
        if (trueOrFalse === false) {
            view.remove();
            counter = 0;
        }
    }

    return { checkout: checkout };
})