define(["Views/addTrView"], function (addTrView) {

    function start() {
        addTrView.initTr();
    }

    return {
        start: start
    };
})