define(function () {

    function headerRender() {
        var beginingView = Backbone.View.extend({
            el: $(".exampleTable"),

            template: _.template($("#startTable").html()),

            initialize: function () { this.render(); },

            render: function () {
                this.$el.html(this.template());
                return this;
            }
        });
        
        var tR = new beginingView();
    }

    return {
        headerView: headerView
    };
})