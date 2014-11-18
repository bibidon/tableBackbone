define(["Models/data"], function (data) {

    function _localStorage() {
        if (localStorage.length === 0) {
            for (var i = 0; i < data.masModels.length; i++) {
                localStorage.setItem(data.masModels[i]["id"], JSON.stringify(data.masModels[i]));
            }
        }
        else {
            data.masModels.splice(0, data.masModels.length);
            for (prop in localStorage) {
                var obj = JSON.parse(localStorage[prop]);
                data.masModels.push(obj);
            }
        }
    }

    function _add() {
        for (var i = 0; i < data.masModels.length; i++) {
            localStorage.setItem(data.masModels[i]["id"], JSON.stringify(data.masModels[i]));
        }
    }

    function _remove(id) {
        for (prop in localStorage) {
            if (prop === id) { localStorage.removeItem(prop); }
        }
    }

    return {
        _localStorage: _localStorage,
        _add: _add,
        _remove: _remove
    };
});