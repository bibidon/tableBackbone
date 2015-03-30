define(["jquery", "Views/validateView"], function ($, View) {

    var masIncorrect = [];
    var correct;
    var doView = function () {
        return new View();
    };
    var view;

    function _addValidate() {
        var patternLetter = /^[A-zА-яЁё]+$/i;
        var patternNumber = /^\d+$/;
        var name = this.offsetParent.attributes["name"].value;
        var value = this.value;

        if (masIncorrect.length === 0) {
            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == -1) {
                    masIncorrect.push(name);
                }
            }
            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == -1) {
                    masIncorrect.push(name);
                }
            }
            correct = false;
            return;
        }

        if (masIncorrect.length != 0) {
            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == -1) {
                    for (var i = 0; i < masIncorrect.length; i++) {
                        if (masIncorrect[i] == name) {
                            correct = false;
                            return;
                        }
                    }
                    masIncorrect.push(name);
                    correct = false;
                    return;
                }
            }
            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == -1) {
                    for (var j = 0; j < masIncorrect.length; j++) {
                        if (masIncorrect[j] == name) {
                            correct = false;
                            return;
                        }
                    }
                    masIncorrect.push(name);
                    correct = false;
                    return;
                }
            }
        }
        correct = true;
    }

    function _removeValidate() {
        if (masIncorrect.length != 0) {
            var patternLetter = /^[A-zА-яЁё]+$/i;
            var patternNumber = /^\d+$/;
            var name = this.offsetParent.attributes["name"].value;
            var value = this.value;

            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == 0) {
                    for (var i = 0; i < masIncorrect.length; i++) {
                        if (masIncorrect[i] === name) {
                            masIncorrect.splice(i, 1);
                        }
                    }
                    correct = true;
                    return;
                }
            }

            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == 0) {
                    for (var j = 0; j < masIncorrect.length; j++) {
                        if (masIncorrect[j] === name) {
                            masIncorrect.splice(j, 1);
                        }
                    }
                    correct = true;
                    return;
                }
            }
        }
    }

    function _alertValidate() {
        var name = "";
        var positionTextField = this.getBoundingClientRect();

        if (masIncorrect.length === 0) {
            if ($(".tooltipHidden").length !== 0) {
                view.remove();
                this.classList.remove("invalid");
                return;
            }
            return;
        }

        if (masIncorrect.length === 1) {
            if (correct === true) {
                if ($(".tooltipHidden")) {
                    this.classList.remove("invalid");
                    name = masIncorrect.join(", ");
                    $(".tooltipHidden").text("Некорректные данные в ячейке с именем " + name);
                    return;
                }
            }
            if (correct === false) {
                view = doView();
                $(".tooltipHidden").addClass("tooltipVisible");
                $(".tooltipHidden").css("top", positionTextField.top + 50);
                $(".tooltipHidden").css("left", "40%");
                this.classList.add("invalid");
                name = masIncorrect.join(", ");
                $(".tooltipHidden").text("Некорректные данные в ячейке с именем " + name);
                return;
            }

        } else {
            if (correct === true) {
                if ($(".tooltipHidden")) {
                    this.classList.remove("invalid");
                    name = masIncorrect.join(", ");
                    $(".tooltipHidden").text("Некорректные данные в ячейках с именами: " + name);
                }
                return;
            }
            if (correct === false) {
                $(".tooltipHidden").addClass("tooltipVisible");
                this.classList.add("invalid");
                name = masIncorrect.join(", ");
                $(".tooltipHidden").text("Некорректные данные в ячейках с именами: " + name);
            }
        }
    }

    function _deleteView() {
        view.remove();
    }

    return {
        _masIncorrect: masIncorrect,
        _addValidate: _addValidate,
        _removeValidate: _removeValidate,
        _alertValidate: _alertValidate,
        _deleteView: _deleteView
    };
});