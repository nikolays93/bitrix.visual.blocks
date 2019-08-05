<?php

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
	die();
}

$arTemplateParameters = array(
	"COLUMNS" => array(
        "PARENT" => "BASE",
		"NAME" => "Кол-во столбцов",
		"TYPE" => "STRING",
		"DEFAULT" => "4",
	),
	"VISUAL_BLOCKS" => array(
		"PARENT"   => "BASE",
		"NAME"     => "Элементы визуального блока",
		"TYPE"     => "CUSTOM",
		"MULTIPLE" => "Y",
		// @todo переменный путь до компонентов (local/bitrix)
		"JS_FILE"  => "/local/components/nikolays93/visual.blocks/assets/inputs.js",
		"JS_EVENT" => "onEditTextarea",
		"JS_DATA"  => "", // additional js data for ex. LANGUAGE_ID."||".GetMessage("MYMS_PARAM_DATA_SET")
		"DEFAULT"  => "",
	),
);