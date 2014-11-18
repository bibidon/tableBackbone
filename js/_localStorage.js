define(["Models/data"], function (data) {

    function _localStorage() {
        if (localStorage.length === 0) {
            for (var i = 0; i < data.masModels.length; i++) {
                localStorage.setItem(data.masModels[i]["id"], JSON.stringify(data.masModels[i]));
            }
        }
        else {
            for (var prop in localStorage) {
                var match = [];
                var obj = JSON.parse(localStorage[prop]);
                for (var j = 0; j < data.masModels.length; j++) {
                    if (data.masModels[j]["id"] === prop) {
                        match.push(1);
                    } else {
                        continue;
                    }
                }
                if (match.length === 0) {
                    data.masModels.push(obj);
                }
            }
        }
    }

    function _addLocalStorage() {
        for (var i = 0; i < data.masModels.length; i++) {
            localStorage.setItem(data.masModels[i]["id"], JSON.stringify(data.masModels[i]));
        }
    }
    return {
        _localStorage: _localStorage,
        _addLocalStorage: _addLocalStorage
    };
});