//const EXPORT = ["test", "prefsForDeveloppers"];

var template = {
  rootname:                    "matchfox",
  namespace:                   "Matchfox",
  key:                         "!",
  modifiers:                   "control",
  extensionId:                 "matchfox@mozdev.org",
  extensionVer:                "20.0.0",
  extensionType:               "2",
  descEnName:                  "Matchfox Firefox Extension",
  descEnDesc:                  "Generates a scaffold for the Firefox Add-on",
  descEnCreater:               "Teruaki Gemma",
  descEnHomepageURL:           "http://d.hatena.ne.jp/Gemma",
  descJaName:                  "Matchfox Firefox Extension",
  descJaCreater:               "Teruaki Gemma",
  descJaHomepageURL:           "http://d.hatena.ne.jp/Gemma",
  targetApplicationId:         "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}",
  targetApplicationMinVersion: "3.0",
  targetApplicationMaxVersion: "3.7a1pre"
};

function browseToInstallDirectory() {
  var filePicker = Cc['@mozilla.org/filepicker;1']
                     .createInstance(Ci.nsIFilePicker);
  filePicker.init(window,
                  "Install to...",
                  Ci.nsIFilePicker.modeGetFolder);
  var result = filePicker.show();
  switch (result) {
  case Ci.nsIFilePicker.returnOK:       //FALLTHROUGH
  case Ci.nsIFilePicker.returnReplace:
    if (filePicker.file) {
      document.getElementById("textbox-install-dir").value = filePicker.file.path;
    }
    break;
  case Ci.nsIFilePicker.returnCancel:
    break;
  }
}

function makeDirectoryTree() {
  ["/home/teruaki/eve",
   "/home/teruaki/eve/chrome",
   "/home/teruaki/eve/chrome/content",
   "/home/teruaki/eve/chrome/content/browser",
   "/home/teruaki/eve/chrome/content/common",
   "/home/teruaki/eve/chrome/content/sidebar",
   "/home/teruaki/eve/chrome/icons",
   "/home/teruaki/eve/chrome/icons/default",
   "/home/teruaki/eve/chrome/locale",
   "/home/teruaki/eve/chrome/locale/en-US",
   "/home/teruaki/eve/chrome/locale/ja",
   "/home/teruaki/eve/chrome/skin",
   "/home/teruaki/eve/chrome/skin/classic",
   "/home/teruaki/eve/chrome/skin/classic/images",
   "/home/teruaki/eve/components",
   "/home/teruaki/eve/defaults",
   "/home/teruaki/eve/defaults/preferences",
   "/home/teruaki/eve/resources",
   "/home/teruaki/eve/resources/modules",
   "/home/teruaki/eve/tests",
   "/home/teruaki/eve/tests/javascripts"].forEach(mkdir);
}

function exportSourceFiles() {
  function process(obj) {
    cat("/home/teruaki/eve" + obj.path, obj.content);
  }

  [autoloaderjs,
   browser00foobar0js,
   browser05foobar1js,
   chromemanifest,
   common02utilsjs,
   common05foobar1js,
   configxul,
   installrdf,
   localeenUSbrowserdtd,
   localeenUSconfigdtd,
   localeenUSsidebardtd,
   localejabrowserdtd,
   localejaconfigdtd,
   localejasidebardtd,
   overlayxul,
   resourcesmodules00utilsjsm,
   resourcesmodules20Prefsjsm,
   resourcesmodules20Databasejsm,
   sidebar00foobar0js,
   sidebar05foobar1js,
   sidebarxul,
   {path: "/chrome/skin/classic/browser.css", content: ""},
   {path: "/chrome/skin/classic/browser.osx.css", content: ""},
   {path: "/chrome/skin/classic/config.css", content: ""},
   {path: "/chrome/skin/classic/sidebar.css", content: ""}
  ].forEach(process);
}

function appendPath(ansIFile, aPath) {
  aPath.split("/").forEach(function(x) {
    ansIFile.append(x);
  });
}

function copySkinClassicImages() {
  const extensionId = "matchfox@mozdev.org";
  var extensionDir = Cc["@mozilla.org/extensions/manager;1"]
                       .getService(Components.interfaces.nsIExtensionManager)
                       .getInstallLocation(extensionId)
                       .getItemLocation(extensionId);
  appendPath(extensionDir, "chrome/skin/classic/images");

  // get a component for the directory to copy to
  var destDir = Cc["@mozilla.org/file/local;1"]
                  .createInstance(Ci.nsILocalFile);
  // next, assign URLs to the file component.
  destDir.initWithPath("/home/teruaki/eve/chrome/skin/classic/images");

  var tmp;
  tmp = extensionDir.clone();
  tmp.append("favicon.ico");
  tmp.copyTo(destDir, null);
  tmp = extensionDir.clone();
  tmp.append("favicon32.png");
  tmp.copyTo(destDir, null);
  tmp = extensionDir.clone();
  tmp.append("transparent.png");
  tmp.copyTo(destDir, null);
}

function test() {
  makeDirectoryTree();
  exportSourceFiles();
  copySkinClassicImages();
}

function prefsForDeveloppers() {
  var p0 = new Matchfox.Prefs("javascript.options.");
  p0.set("showInConsole", true);
  p0.set("strict", true);
  var p1 = new Matchfox.Prefs("browser.dom.window.dump.");
  p1.set("enabled", true);
  var p2 = new Matchfox.Prefs("nglayout.debug.");
  p2.set("disable_xul_cache", true);
}

function cat(aPath, aContent) {
  var localFile=  Cc["@mozilla.org/file/local;1"]
                    .createInstance(Ci.nsILocalFile);
  localFile.initWithPath(aPath);
  var stream = Cc['@mozilla.org/network/file-output-stream;1']
                 .createInstance(Ci.nsIFileOutputStream);
  stream.init(localFile, 0x02 | 0x08 | 0x20, 0664, 0); // write, create, truncate
  stream.write(aContent, aContent.length);
  stream.close();
}

function mkdir(aPath) {
  var localFile=  Cc["@mozilla.org/file/local;1"]
                    .createInstance(Ci.nsILocalFile);
  localFile.initWithPath(aPath);
  if (!localFile.exists() || !localFile.isDirectory()) {
    localFile.create(localFile.DIRECTORY_TYPE, 0775);
  }
}

var EXPORT = [m for (m in new Iterator(this, true))
                          if (m[0] !== "_" && m !== "EXPORT")];
