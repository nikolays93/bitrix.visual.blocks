
var BX = BX || {};

function prepareInputArea (arParams) {
    // remove left column
    var firstColumn = arParams.oCont.parentNode.querySelector('td');
    var label = firstColumn.innerHTML;
    arParams.oCont.parentNode.removeChild(firstColumn);

    // set wide width
    var secondColumn = arParams.oCont.parentNode.querySelector('td');
    secondColumn.colSpan = 2;

    // create input area wrapper
    var inputsWrapper = secondColumn.appendChild(BX.create('DIV'));
    inputsWrapper.style['padding-left'] = '10px';
    inputsWrapper.prepend(BX.create('DIV', {
        html: label,
        style: {
            margin: '0 0 0.5rem'
        }
    }));

    // window.inputAreaPrepared = true;
    return inputsWrapper;
}

function addRow (inputsWrapper, obInputs, obElements, isDisableClose) {
    var result = {};
    obElements = obElements || {};
    isDisableClose = isDisableClose ? !!isDisableClose : false;

    result['WRAPPER'] = inputsWrapper.appendChild(BX.create('DIV', {
        style: {
            position: 'relative',
            display: 'flex'
        },
        attrs: {
            className: 'row-wrap'
        },
    }));

    for(var elementTag in obInputs) {

        var hiddenInput = obInputs[elementTag];
        var value = obElements[elementTag] || '';
        // @note do not set placeholder
        hiddenInput.value = value;

        switch (elementTag.toUpperCase()) {
            case 'IMAGE':
                var obInput = result['WRAPPER'].appendChild(BX.create('INPUT', {
                    attrs: {
                        name: '',
                        type: 'file',
                    },
                    style: {
                        display: 'none'
                    }
                }));

                result['IMAGE'] = result['WRAPPER'].appendChild(BX.create('IMG', {
                    attrs: {
                        src: value || '/local/components/nikolays93/visual.blocks/images/placeholder.png',
                        alt: '',
                    },
                    style: {
                        'width': '100%',
                        'height': '100%',
                        'max-width': '150px',
                        'max-height': '150px',
                        'padding': '0 10px 10px 0',
                        'object-fit': 'contain',
                        'cursor': 'pointer'
                    }
                }));

                obInput.onchange = BX.delegate(function (e) {
                    if (!obInput.value) return;

                    e.stopPropagation();
                    e.preventDefault();

                    var data = new FormData();
                    data.append('action', 'sendfile');
                    data.append('pathname', window.location.pathname);
                    data.append('INPUTNAME', $(obInput).prop('files')[0]);

                    // @todo remove jQuery
                    // @todo read about bitrix/tools/ajax.php
                    // @todo replace INPUTNAME

                    $.ajax({
                        url: '/local/components/nikolays93/visual.blocks/ajax.php',
                        type: 'POST',
                        data: data,
                        cache: false,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        success: function (respond, status, jqXHR) {
                            if (respond.errors && respond.errors.length) {
                                console.error(respond.errors);
                                return;
                            }

                            result['IMAGE'].src = obInputs['IMAGE'].value = respond.src;
                        },
                        error: function (jqXHR, status, errorThrown) {
                            console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
                        }
                    });
                });

                result['IMAGE'].onclick = BX.delegate(function () {
                    $(obInput).trigger('click');
                });
                break;

            case 'TEXTAREA':
                result['TEXTAREA'] = result['WRAPPER'].appendChild(BX.create('TEXTAREA', {
                    style: {
                        width: '100%',
                        height: '100px',
                        'margin-bottom': '1rem'
                    },
                    html: value.replace(',', '&#44;'),
                    events: {
                        change: BX.delegate(function () {
                            hiddenInput.value = result['TEXTAREA'].value.replace(',', '&#44;');
                        })
                    }
                }));
                break;
        }
    } // for

    if (!isDisableClose) result['CLOSE'] = addCloseRow(result['WRAPPER']);

    return result;
}

function addCloseRow (obWrapper) {
    return obWrapper.appendChild(BX.create('SPAN', {
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
            className: 'close'
        },
        html: '&times;',
        events: {
            click: BX.delegate(function () {
                var isConfirm = confirm("Если вы удалите эту ячейку потеряете её контент и расположение, вы уверены?");
                if (isConfirm) {
                    obWrapper.parentNode.removeChild(obWrapper);
                }
            })
        }
    }));
}

function onEscapeField (arParams) {
    arParams.oCont.parentNode.style.display = 'none';
}

function onEditTextarea(arParams) {
    var inputsWrapper = prepareInputArea(arParams);
    var oInput = arParams.oInput;

    function addMultipleButton (inputsWrapper) {
        var obButton = inputsWrapper.appendChild(BX.create('BUTTON', {
            html: 'Добавить элемент',
            events: {
                click: BX.delegate(function () {
                    // remove old button
                    obButton.parentNode.removeChild(obButton);
                    // from global
                    var input = oInput.cloneNode(false);
                    // create row
                    var res = addRow(inputsWrapper, {TEXTAREA: input});
                    // with value inputs
                    res['WRAPPER'].appendChild(input);
                    addMultipleButton(inputsWrapper);
                    // create new button
                    return false;
                })
            }
        }));

        return obButton;
    }

    var i = 0;
    oInput.value.split(',').forEach(function (el) {
        if (i == 0) {
            addRow(inputsWrapper, {TEXTAREA: arParams.oInput}, {TEXTAREA: el}, true);
        }
        else {
            var input = oInput.cloneNode(false);
            var res = addRow(inputsWrapper, {TEXTAREA: input}, {TEXTAREA: el});
            res['WRAPPER'].appendChild(input);
        }

        i++;
    });

    if ("Y" === arParams.propertyParams.MULTIPLE) {
        addMultipleButton(inputsWrapper, oInput);
    }
}

function onEditMedia(arParams) {
    var arElements = arParams.getElements();
    var inputsWrapper = prepareInputArea(arParams);

    console.log(arElements);
    if( !arElements.IMAGE_ELEMENTS ) return;

    var imgInput = arElements.IMAGE_ELEMENTS;
    var oInput = arParams.oInput;

    function addMultipleButton () {
        var obButton = inputsWrapper.appendChild(BX.create('BUTTON', {
            html: 'Добавить элемент',
            events: {
                click: BX.delegate(function () {
                    // remove old button
                    obButton.parentNode.removeChild(obButton);
                    // from global
                    var cloneOInput = oInput.cloneNode(false);
                    var cloneImgInput = imgInput.cloneNode(false);
                    // create row
                    var res = addRow(inputsWrapper, {IMAGE: cloneImgInput, TEXTAREA: cloneOInput});
                    // with value inputs
                    res['WRAPPER'].appendChild(cloneOInput);
                    res['WRAPPER'].appendChild(cloneImgInput);
                    // create new button
                    addMultipleButton(inputsWrapper);
                })
            }
        }));

        return obButton;
    }

    var arImages = imgInput.value.split(',');
    var i = 0;
    oInput.value.split(',').forEach(function (el) {

        var arValues = {
            IMAGE: arImages[i],
            TEXTAREA: el,
        };

        if (i == 0) {
            addRow(inputsWrapper, {
                IMAGE: imgInput,
                TEXTAREA: oInput,
            }, arValues, true);
        }
        else {
            var arInputs = {
                IMAGE: imgInput.cloneNode(false),
                TEXTAREA: oInput.cloneNode(false),
            }

            var res = addRow(inputsWrapper, arInputs, arValues);

            res['WRAPPER'].appendChild(arInputs.IMAGE);
            res['WRAPPER'].appendChild(arInputs.TEXTAREA);
        }

        i++;
    });

    if ("Y" === arParams.propertyParams.MULTIPLE) {
        addMultipleButton(inputsWrapper);
    }
}

