// エクスポートしたくないメンバの名前はアンダースコア(_)からはじめること。

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

function jsmFoobar0() {
}

function _notExported() {
}

var EXPORTED_SYMBOLS = [m for (m in new Iterator(this, true))
                          if (m[0] !== "_" && m !== "EXPORTED_SYMBOLS")];
