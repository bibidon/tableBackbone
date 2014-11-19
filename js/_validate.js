define(function () {

    function _addValidate() {
        var patternLetter = /^[A-zА-яЁё]+$/i;
        var patternNumber = /^\d+$/;
        var name = this.name;
        var value = this.value;

        if (e.masIncorrect.length === 0) {
            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == -1) {
                    e.masIncorrect.push(name);
                }
            }
            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == -1) {
                    e.masIncorrect.push(name);
                }
            }
            e.correct = false;
            return;
        }

        if (e.masIncorrect.length != 0) {
            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == -1) {
                    for (var i = 0; i < e.masIncorrect.length; i++) {
                        if (e.masIncorrect[i] == name) {
                            e.correct = false;
                            return;
                        }
                    }
                    e.masIncorrect.push(name);
                    e.correct = false;
                    return;
                }
            }
            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == -1) {
                    for (var j = 0; j < e.masIncorrect.length; j++) {
                        if (e.masIncorrect[j] == name) {
                            e.correct = false;
                            return;
                        }
                    }
                    e.masIncorrect.push(name);
                    e.correct = false;
                    return;
                }
            }
        }
        e.correct = true;
    }

    function _removeValidate() {
        if (e.masIncorrect.length != 0) {
            var patternLetter = /^[A-zА-яЁё]+$/i;
            var patternNumber = /^\d+$/;
            var name = this.name;
            var value = this.value;

            if (name === "name" || name === "description") {
                if (value.search(patternLetter) == 0) {
                    for (var i = 0; i < e.masIncorrect.length; i++) {
                        if (e.masIncorrect[i] === name) {
                            e.masIncorrect.splice(i, 1);
                        }
                    }
                    e.correct = true;
                    return;
                }
            }

            if (name === "price" || name === "quantity") {
                if (value.search(patternNumber) == 0) {
                    for (var j = 0; j < e.masIncorrect.length; j++) {
                        if (e.masIncorrect[j] === name) {
                            e.masIncorrect.splice(j, 1);
                        }
                    }
                    e.correct = true;
                    return;
                }
            }
        }
    }

    function _alertValidate() {
        var name = "";
        var positionTextField = this.getBoundingClientRect();

        if (e.masIncorrect.length === 0) {
            $(".tooltipHidden").removeClass("tooltipVisible");
            this.classList.remove("invalid");
            return;
        }

        if (e.masIncorrect.length === 1) {
            if (e.correct === true) {
                if ($(".tooltipHidden")) {
                    this.classList.remove("invalid");
                    name = e.masIncorrect.join(", ");
                    $(".tooltipHidden").text("Некорректные данные в ячейке с именем " + name);
                    return;
                }
            }
            if (e.correct === false) {
                $(".tooltipHidden").addClass("tooltipVisible");
                $(".tooltipHidden").css("top", positionTextField.top + 50);
                $(".tooltipHidden").css("left", "40%");
                this.classList.add("invalid");
                name = e.masIncorrect.join(", ");
                $(".tooltipHidden").text("Некорректные данные в ячейке с именем " + name);
                return;
            }

        } else {
            if (e.correct === true) {
                if ($(".tooltipHidden")) {
                    this.classList.remove("invalid");
                    name = e.masIncorrect.join(", ");
                    $(".tooltipHidden").text("Некорректные данные в ячейках с именами: " + name);
                }
                return;
            }
            if (e.correct === false) {
                $(".tooltipHidden").addClass("tooltipVisible");
                this.classList.add("invalid");
                name = e.masIncorrect.join(", ");
                $(".tooltipHidden").text("Некорректные данные в ячейках с именами: " + name);
            }
        }
    }

    return {
        _addValidate: _addValidate,
        _removeValidate: _removeValidate,
        _alertValidate: _alertValidate
    };
});