function onEditTextarea(arParams) {
    // var arElements = arParams.getElements();
    var inputArea;

    function addTextarea(input, areaVal, isDisableClose) {
        if (!inputArea) return;
        areaVal = areaVal || '';
        isDisableClose = !!isDisableClose;

        var wrap = inputArea.appendChild(BX.create('DIV', {
            style: {
                position: 'relative'
            },
            attrs: {
                className: 'textarea-wrap'
            },
        }));

        var obTextarea = wrap.appendChild(BX.create('TEXTAREA', {
            style: {
                width: '100%',
                height: '100px'
            },
            html: areaVal,
            events: {
                change: BX.delegate(function () {
                    input.value = obTextarea.value.replace(',', '&#44;');
                })
            }
        }));

        if (!isDisableClose) {
            var obAreaClose = wrap.appendChild(BX.create('SPAN', {
                style: {
                    'position': 'absolute',
                    'top': '1px',
                    'right': '1px',
                    'border-radius': '6px',
                    'background-color': 'rgba(255, 0, 0, 0.1)',
                    'color': 'red',
                    'width': '30px',
                    'height': '30px',
                    'line-height': '30px',
                    'text-align': 'center',
                    'font-size': '20px',
                    'cursor': 'pointer'
                },
                attrs: {
                    className: 'close-textarea'
                },
                html: '&times;',
                events: {
                    click: BX.delegate(function () {
                        var isConfirm = confirm("Если вы удалите эту ячейку потеряете её контент и расположение, вы уверены?");
                        if (isConfirm) {
                            input.parentNode.removeChild(input);
                            wrap.parentNode.removeChild(wrap);
                        }
                    })
                }
            }));
        }

        return obTextarea;
    }

    function cloneInput(value) {
        value = value || '';

        var input = arParams.oInput.cloneNode(false);
        input.value = value;
        arParams.oInput.parentNode.append(input);

        return input;
    }

    function addMultipleButton(wrap) {
        var obButton = wrap.appendChild(BX.create('BUTTON', {
            html: 'Добавить элемент'
        }));

        obButton.onclick = BX.delegate(function () {
            obButton.parentNode.removeChild(obButton);
            addTextarea(cloneInput());
            addMultipleButton(inputArea);

            return false;
        });

        return obButton;
    }

    // remove left column
    var firstColumn = arParams.oCont.parentNode.querySelector('td');
    var label = firstColumn.innerHTML;
    arParams.oCont.parentNode.removeChild(firstColumn);

    // set wide width
    var secondColumn = arParams.oCont.parentNode.querySelector('td');
    secondColumn.colSpan = 2;

    // create input area wrapper
    inputArea = secondColumn.appendChild(BX.create('DIV'));
    inputArea.style['padding-left'] = '10px';
    inputArea.prepend(BX.create('DIV', {
        html: label,
        style: {
            margin: '0 0 0.5rem'
        }
    }));

    var arValues = arParams.oInput.value.split(',');

    var i = 0;
    arValues.forEach(function (el) {
        var isDisableClose = false;

        if (i == 0) {
            var input = arParams.oInput;
            arParams.oInput.value = el;
            isDisableClose = true;
        } else {
            var input = cloneInput(el);
        }

        addTextarea(input, el, isDisableClose);
        i++;
    });

    if ("Y" === arParams.propertyParams.MULTIPLE) {
        var obButton = addMultipleButton(inputArea);
    }
}