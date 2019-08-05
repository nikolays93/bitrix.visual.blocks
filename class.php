<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)die();

// require_once __DIR__ . '/.parameters.php';

use \Bitrix\Main;
use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Loader;
use \NikolayS93\PHPMailInterface;

class VisualBlockBitrixComponent extends CBitrixComponent
{
    function executeComponent()
    {
        $this->includeComponentTemplate();
    }
}
