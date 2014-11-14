define(["Models/data", "Models/collections", "Views/headerView", "Views/addTrView"], function (data, collections, hView, tView) {

    var init = (function () {

        var that = null;
        var appViewheader;
        var appViewTable;

        var model = function () {
            that = this;
        };

        model.prototype = {
            constructor: model,

            render: function () {
                that.headerRender();
                that.addTrRender();
            },

            headerRender: function () {
                appViewheader = new hView();
            },

            addTrRender: function () {
                appViewTable = new tView();
            }
        };

        return model;

    })();

    return init;

});