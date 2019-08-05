
window.prepareInputArea = function (arParams) {
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

    // window.inputAreaPrepared = true;
    return inputArea;
}

window.addRow = function (inputArea, obInputs, obElements, isDisableClose) {
    var result = {};
    isDisableClose = !!isDisableClose;

    result['WRAPPER'] = inputArea.appendChild(BX.create('DIV', {
        style: {
            position: 'relative'
        },
        attrs: {
            className: 'row-wrap'
        },
    }));

    for(var elementTag in obElements) {

        var hiddenInput = obInputs[elementTag];
        var value = obElements[elementTag] || '';

        if( 'TEXTAREA' == elementTag.toUpperCase() ) {

            result['TEXTAREA'] = result['WRAPPER'].appendChild(BX.create('TEXTAREA', {
                style: {
                    width: '100%',
                    height: '100px'
                },
                html: value.replace(',', '&#44;'),
                events: {
                    change: BX.delegate(function () {
                        hiddenInput.value = result['TEXTAREA'].value.replace(',', '&#44;');
                    })
                }
            }));

        }

        if( 'IMAGE' == elementTag.toUpperCase() ) {
            if( ! value ) value = 'placeholder';
        }

        if (!isDisableClose) {
            result['CLOSE'] = addCloseRow(result['WRAPPER']);
        }

    } // /for

    return result;
}

window.addCloseRow = function (obWrapper) {
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

function onInitVisualBlocks() {
}