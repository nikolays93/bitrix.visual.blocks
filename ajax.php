<?php

define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

$result = array(
    'errors' => array(),
);

if (!isset($_REQUEST['action'])) {
    $result['errors'][] = 'Do not have action';
    die(json_encode($result));
}

switch ($_REQUEST['action']) {
    case 'sendfile':
        if (isset($_FILES['INPUTNAME'])) {
            $arFile = array(
                "name"      => $_FILES['INPUTNAME']['name'],
                "size"      => $_FILES['INPUTNAME']['size'],
                "tmp_name"  => $_FILES['INPUTNAME']['tmp_name'],
                "type"      => $_FILES['INPUTNAME']['type'],
                "old_file"  => "",
                "del"       => "Y",
                "MODULE_ID" => "iblock"
            );

            $fid           = CFile::SaveFile($arFile, "visual.blocks" . $_REQUEST['pathname']);
            $result['src'] = CFile::GetPath($fid);
        }
        else {
            $result['errors'][] = 'Empty file name';
        }
    break;

    default:
        $result['errors'][] = 'Action not defined';
    break;
}


die(json_encode($result));
