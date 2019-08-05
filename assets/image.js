function onEditImage(arParams) {
    // var arElements = arParams.getElements();
    var imageArea;

    function addImage(input, imageSRC, isDisableClose) {
        if (!imageArea) return;
        imageSRC = imageSRC || '/local/components/nikolays93/visual.blocks/images/placeholder.png';
        isDisableClose = !!isDisableClose;

        var wrap = imageArea.appendChild(BX.create('DIV', {
            style: {
                position: 'relative'
            },
            attrs: {
                className: 'image-wrap'
            },
        }));

        var obImage = wrap.appendChild(BX.create('IMG', {
            attrs: {
                src: imageSRC,
                alt: '',
            },
            style: {
                'width': 'auto',
                'height': 'auto',
                'max-width': '150px',
                'max-height': '150px',
            }
        }));

        var obInput = wrap.appendChild(BX.create('input', {
            attrs: {
                name: '',
                type: 'file',
            },
            events: {
                change: BX.delegate(function (e) {
                    if (!this.value) return;

                    e.stopPropagation();
                    e.preventDefault();

                    var data = new FormData();
                    data.append('action', 'sendfile');
                    data.append('pathname', window.location.pathname);
                    data.append('INPUTNAME', $(this).prop('files')[0]);

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

                            obImage.src = input.value = respond.src;
                        },
                        error: function (jqXHR, status, errorThrown) {
                            console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
                        }

                    });
                })
            }
        }));

        if (!isDisableClose) {
            var obImageRemove = wrap.appendChild(BX.create('SPAN', {
                style: {
                    'position': 'absolute',
                    'top': '1px',
                    'left': '1px',
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
                        if( isConfirm ) {
                            input.parentNode.removeChild(input);
                            wrap.parentNode.removeChild(wrap);
                        }
                    })
                }
            }));
        }

        return obImage;
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
            addImage(cloneInput());
            addMultipleButton(imageArea);

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
    imageArea = secondColumn.appendChild(BX.create('DIV'));
    imageArea.style['padding-left'] = '10px';
    imageArea.prepend(BX.create('DIV', {
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

        addImage(input, el, isDisableClose);
        i++;
    });

    if ("Y" === arParams.propertyParams.MULTIPLE) {
        var obButton = addMultipleButton(imageArea);
    }
}