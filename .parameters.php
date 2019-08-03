<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentParameters = array(
    // "GROUPS" => array(
    //     // "BASE",
    //     // "DATA_SOURCE",
    //     // "VISUAL",
    //     // "USER_CONSENT",
    //     // "URL_TEMPLATES",
    //     // "SEF_MODE",
    //     // "AJAX_SETTINGS",
    //     // "CACHE_SETTINGS",
    //     // "ADDITIONAL_SETTINGS",
    // ),
    "PARAMETERS" => array(
        "ELEMENTS" => array(
            // "PARENT"   => "BASE",
            "NAME"     => "Элементы визуального блока",
            "TYPE"     => "CUSTOM",
            "MULTIPLE" => "Y",
            // @todo переменный путь до компонентов (local/bitrix)
            "JS_FILE" => "/local/components/nikolays93/visual.blocks/assets/textarea.js",
            "JS_EVENT" => "onEditTextarea",
            "JS_DATA" => "", // additional js data for ex. LANGUAGE_ID."||".GetMessage("MYMS_PARAM_DATA_SET")
            "DEFAULT" => "",
        ),
    ),
);

return $arComponentParameters;
