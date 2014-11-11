define(["Views/headerView"], function (headerView) {

    function start() {
        headerView.initHeader();
    }

    return {
        start: start
    };
})