/*
 * utils 内部では、
 * 頭に _ のついてないローカル変数はすべて EXPORT の対象となる
 */

function foobar0() {
}

function _notExported() {
}

var EXPORT = [m for (m in new Iterator(this, true))
                          if (m[0] !== "_" && m !== "EXPORT")];
