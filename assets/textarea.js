function onEditTextarea(arParams) {
    // var arElements = arParams.getElements();
    var inputArea = prepareInputArea(arParams);
    var oInput = arParams.oInput;

    function addMultipleButton (inputArea, oInput) {
        var obButton = inputArea.appendChild(BX.create('BUTTON', {
            html: 'Добавить элемент',
            events: {
                click: BX.delegate(function () {
                    obButton.parentNode.removeChild(obButton);

                    var input = oInput.cloneNode(false);
                    var res = addRow(inputArea, {textarea: input}, {textarea: ''});
                    res['WRAPPER'].appendChild(input);
                    addMultipleButton(inputArea);

                    return false;
                })
            }
        }));

        return obButton;
    }

    var i = 0;
    oInput.value.split(',').forEach(function (el) {
        var isDisableClose = false;

        if (i == 0) {
            var input = arParams.oInput;
            arParams.oInput.value = el;
            isDisableClose = true;
        }
        else {
            var input = oInput.cloneNode(false);
            if( el ) input.value = el;
        }

        var res = addRow(inputArea, {textarea: input}, {textarea: el}, isDisableClose);
        res['WRAPPER'].appendChild(input);

        i++;
    });

    if ("Y" === arParams.propertyParams.MULTIPLE) {
        addMultipleButton(inputArea, oInput);
    }
}