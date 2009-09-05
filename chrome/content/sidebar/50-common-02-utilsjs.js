const EXPORT = ["common02utilsjs"];

var file =
<file>
/*
 * In this utils file,
 * global variables and functions are exported,
 * unless the name is prefixed with "_".
 */

function commonFoobar0() {"{"}
{"}"}

function _notExported() {"{"}
{"}"}

var EXPORT = [m for (m in new Iterator(this, true))
                if (m[0] !== "_" {"&&"} m !== "EXPORT")];
</file>;

var common02utilsjs = {
  path: "/chrome/content/common/02-utils.js",
  content: file.toString()
};