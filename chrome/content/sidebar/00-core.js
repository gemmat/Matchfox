const EXPORT = ["insDir", "template", "browseToInstallDirectory", "createTheScaffold"];

var insDir = null; //nsILocalFlie

var template = {
  key:                         "!",
  modifiers:                   "control",
  rootname:                    "default",
  namespace:                   "Default",
  extensionId:                 "default@mozdev.org",
  extensionVer:                "0.0.0",
  extensionType:               "2",
  descEnName:                  "Default Firefox Extension",
  descEnDesc:                  "Generates a scaffold for the Firefox Add-on",
  descEnCreater:               "Teruaki Gemma",
  descEnHomepageURL:           "http://d.hatena.ne.jp/Gemma",
  descJaName:                  "Default Firefox Extension",
  descJaDesc:                  "Generates a scaffold for the Firefox Add-on",
  descJaCreater:               "Teruaki Gemma",
  descJaHomepageURL:           "http://d.hatena.ne.jp/Gemma",
  targetApplicationId:         "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}",
  targetApplicationMinVersion: "3.0",
  targetApplicationMaxVersion: "3.7a1pre"
};

function browseToInstallDirectory() {
  var filePicker = Cc['@mozilla.org/filepicker;1']
                     .createInstance(Ci.nsIFilePicker);
  filePicker.init(window, "Install to...", Ci.nsIFilePicker.modeGetFolder);
  var result = filePicker.show();
  switch (result) {
  case Ci.nsIFilePicker.returnOK:       //FALLTHROUGH
  case Ci.nsIFilePicker.returnReplace:
    if (filePicker.file) {
      document.getElementById("label-installdir").value = filePicker.file.path;
      Matchfox.insDir = filePicker.file.clone();
    }
    break;
  case Ci.nsIFilePicker.returnCancel:
    break;
  }
}

function checkForm() {
  function checkValue(id) {
    return document.getElementById(id).value.length;
  }
  return Matchfox.insDir &&
         ["textbox-key",
          "textbox-rootname",
          "textbox-namespace",
          "textbox-extensionId",
          "textbox-extensionVer",
          "textbox-extensionType",
          "textbox-descEnName",
          "textbox-descEnDesc",
          "textbox-descEnCreater",
          "textbox-descEnHomepageURL",
          "textbox-descJaName",
          "textbox-descJaDesc",
          "textbox-descJaCreater",
          "textbox-descJaHomepageURL",
          "textbox-targetApplicationId",
          "textbox-targetApplicationMinVersion",
          "textbox-targetApplicationMaxVersion"].every(checkValue);
}

function readForm() {
  function f(id) {
    return document.getElementById(id).value;
  }
  function readmodifires() {
    var res = [];
    ["control", "alt", "meta", "shift", "accel"].forEach(function(x) {
      if (document.getElementById("modifiers-" + x).checked) res.push(x);
    });
    return res.join(" ");
  }
  return {
    key:                         f("textbox-key"),
    modifiers:                   readmodifires(),
    rootname:                    f("textbox-rootname"),
    namespace:                   f("textbox-namespace"),
    extensionId:                 f("textbox-extensionId"),
    extensionVer:                f("textbox-extensionVer"),
    extensionType:               f("textbox-extensionType"),
    descEnName:                  f("textbox-descEnName"),
    descEnDesc:                  f("textbox-descEnDesc"),
    descEnCreater:               f("textbox-descEnCreater"),
    descEnHomepageURL:           f("textbox-descEnHomepageURL"),
    descJaName:                  f("textbox-descJaName"),
    descJaDesc:                  f("textbox-descJaDesc"),
    descJaCreater:               f("textbox-descJaCreater"),
    descJaHomepageURL:           f("textbox-descJaHomepageURL"),
    targetApplicationId:         f("textbox-targetApplicationId"),
    targetApplicationMinVersion: f("textbox-targetApplicationMinVersion"),
    targetApplicationMaxVersion: f("textbox-targetApplicationMaxVersion")
  };
}


function makeDirectoryTree() {
  ["chrome",
   "chrome/content",
   "chrome/content/browser",
   "chrome/content/common",
   "chrome/content/sidebar",
   "chrome/icons",
   "chrome/icons/default",
   "chrome/locale",
   "chrome/locale/en-US",
   "chrome/locale/ja",
   "chrome/skin",
   "chrome/skin/classic",
   "chrome/skin/classic/images",
   "components",
   "defaults",
   "defaults/preferences",
   "resources",
   "resources/modules",
   "tests",
   "tests/javascripts"].forEach(function(x) {
     var f = appendPath(Matchfox.insDir, x);
     if (!f.exists() || !f.isDirectory()) {
       f.create(f.DIRECTORY_TYPE, 0775);
     }
   });
}

function exportSourceFiles() {
  function cat(obj) {
    var f = appendPath(Matchfox.insDir, obj.path);
    var stream = Cc['@mozilla.org/network/file-output-stream;1']
                   .createInstance(Ci.nsIFileOutputStream);
    stream.init(f, 0x02 | 0x08 | 0x20, 0664, 0); // write, create, truncate
    var os = Cc["@mozilla.org/intl/converter-output-stream;1"]
               .createInstance(Ci.nsIConverterOutputStream);
    os.init(stream, "UTF-8", 0, 0x0000);
    os.writeString(obj.content);
    os.close();
  }

  [autoloaderjs(),
   browser00foobar0js(),
   browser05foobar1js(),
   chromemanifest(),
   common02utilsjs(),
   common05foobar1js(),
   configxul(),
   installrdf(),
   localeenUSbrowserdtd(),
   localeenUSconfigdtd(),
   localeenUSsidebardtd(),
   localejabrowserdtd(),
   localejaconfigdtd(),
   localejasidebardtd(),
   overlayxul(),
   resourcesmodules00utilsjsm(),
   resourcesmodules20Prefsjsm(),
   resourcesmodules20Databasejsm(),
   sidebar00foobar0js(),
   sidebar05foobar1js(),
   sidebarxul(),
   {path: "chrome/skin/classic/browser.css", content: ""},
   {path: "chrome/skin/classic/browser.osx.css", content: ""},
   {path: "chrome/skin/classic/config.css", content: ""},
   {path: "chrome/skin/classic/sidebar.css", content: ""}
  ].forEach(cat);
}

// without side-effect.
function appendPath(ansIFile, aPath) {
  var f = ansIFile.clone();
  aPath.split("/").forEach(function(x) {
    f.append(x);
  });
  return f;
}

function copySkinClassicImages() {
  const extensionId = "matchfox@mozdev.org";
  var extensionDir = Cc["@mozilla.org/extensions/manager;1"]
                       .getService(Components.interfaces.nsIExtensionManager)
                       .getInstallLocation(extensionId)
                       .getItemLocation(extensionId);
  var imageDir = appendPath(extensionDir,    "chrome/skin/classic/images");
  var destDir  = appendPath(Matchfox.insDir, "chrome/skin/classic/images");
  ["favicon.ico", "favicon32.png", "transparent.png"].forEach(function(x) {
    appendPath(imageDir, x).copyTo(destDir, null);
  });
}

function createTheScaffold() {
  if (!checkForm()) {
    alert("Please fill in them all.");
    return;
  }
  Matchfox.template = readForm();
  makeDirectoryTree();
  exportSourceFiles();
  copySkinClassicImages();
}
