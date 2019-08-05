<?php

if ( ! defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var customOrderComponent $component */

if (is_array($arParams['ELEMENTS'])) {
    if ($columns = intval($arParams['COLUMNS'])) {
        $rowClass    = 'columns-' . $columns;
        $columnClass = 'column';

        if (function_exists('get_column_class')) {
            $rowClass    = 'row';
            $columnClass = get_column_class($columns);
        }

        echo '<div class="' . $rowClass . '">';
        foreach ($arParams['ELEMENTS'] as $element) {
            echo '<div class="' . $columnClass . '">' . htmlspecialcharsBack($element) . '</div>';
        }
        echo '<!-- /' . $rowClass . ' -->';
    }
    else {
        foreach ($arParams['ELEMENTS'] as $element) {
            echo htmlspecialcharsBack($element);
        }
    }
}
