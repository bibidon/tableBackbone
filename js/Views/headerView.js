define(["jquery", "backbone"], function ($, Backbone) {

    function initHeader() {
        var Header = Backbone.View.extend({
            el: $(".exampleTable"),

            template: _.template($("#startTable").html()),

            initialize: function () { this.render(); },

            render: function () {
                this.$el.html(this.template());
                return this;
            }
        });
        
        var start = new Header();
    }

    return { initHeader: initHeader };
})