// エクスポートしたくないメンバの名前はアンダースコア(_)からはじめること。

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

const WindowMediator   = Cc["@mozilla.org/appshell/window-mediator;1"].
                           getService(Ci.nsIWindowMediator);
const PrefService      = Cc["@mozilla.org/preferences-service;1"].
                           getService(Ci.nsIPrefService).
                           QueryInterface(Ci.nsIPrefBranch).
                           QueryInterface(Ci.nsIPrefBranch2);
const StorageService   = Cc["@mozilla.org/storage/service;1"].
                           getService(Ci.mozIStorageService);
const StorageStatementWrapper = Components.Constructor(
                                  "@mozilla.org/storage/statement-wrapper;1",
                                  "mozIStorageStatementWrapper",
                                  "initialize");

function jsmFoobar0() {
}

function _notExported() {
}

/*
 * original code by tombloo
 * http://github.com/to/tombloo
 * Following codes follow the license of the Tombloo.
 */

function extend(target, source, overwrite) {
  overwrite = overwrite == null ? true : overwrite;
  for (var p in source) {
    var getter = source.__lookupGetter__(p);
    if(getter) target.__defineGetter__(p, getter);
    var setter = source.__lookupSetter__(p);
    if(setter) target.__defineSetter__(p, setter);
    if(!getter && !setter && (overwrite || !(p in target)))
      target[p] = source[p];
  }
  return target;
}

function update(self, obj) {
  if (self === null) {
    self = {};
  }
  for (var i = 1; i < arguments.length; i++) {
    var o = arguments[i];
    if (typeof(o) != "undefined" && o !== null) {
      for (var k in o) {
        self[k] = o[k];
      }
    }
  }
  return self;
}

var EXPORTED_SYMBOLS = [m for (m in new Iterator(this, true))
                          if (m[0] !== "_" && m !== "EXPORTED_SYMBOLS")];
