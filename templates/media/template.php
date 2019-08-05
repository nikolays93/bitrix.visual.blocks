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
        foreach ($arParams['ELEMENTS'] as $i => $element) {
            $image = (isset($arParams['IMAGE_ELEMENTS'][$i])) ?
                '<div class="media-thumb d-flex mr-3"><img src="' . $arParams['IMAGE_ELEMENTS'][$i] . '" alt=""></div>' : '';
            ?>
            <div class="<?= $columnClass ?>">
                <div class="media">
                    <?= $image ?>
                    <div class="media-body">
                        <?= htmlspecialcharsBack($element) ?>
                    </div>
                </div>
            </div>
            <?php
        }
        echo '<!-- /' . $rowClass . ' -->';
    }
    else {
        foreach ($arParams['ELEMENTS'] as $i => $element) {
            $image = (isset($arParams['IMAGE_ELEMENTS'][$i])) ?
                '<div class="media-thumb d-flex mr-3"><img src="' . $arParams['IMAGE_ELEMENTS'][$i] . '" alt=""></div>' : '';
            ?>
            <div class="media">
                <?= $image ?>
                <div class="media-body">
                    <?= htmlspecialcharsBack($element) ?>
                </div>
            </div>
            <?php
        }
    }
}
