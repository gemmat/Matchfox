const EXPORT = ["InstallDirectory", "Template", "browseToInstallDirectory", "createTheScaffold"];

const EXTENSION_ID = "matchfox@mozdev.org";

var InstallDirectory = null; //nsILocalFlie

var Template = {
  key:                         "#",
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
  filePicker.displayDirectory = Cc["@mozilla.org/extensions/manager;1"].
                                  getService(Ci.nsIExtensionManager).
                                  getInstallLocation(EXTENSION_ID).location;
  var result = filePicker.show();
  switch (result) {
  case Ci.nsIFilePicker.returnOK:       //FALLTHROUGH
  case Ci.nsIFilePicker.returnReplace:
    if (filePicker.file) {
      document.getElementById("label-installdir").value = filePicker.file.path;
      InstallDirectory = filePicker.file.clone();
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
  return InstallDirectory &&
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
    descJaName:                  f("textbox-descEnName"),
    descJaDesc:                  f("textbox-descEnDesc"),
    descJaCreater:               f("textbox-descEnCreater"),
    descJaHomepageURL:           f("textbox-descEnHomepageURL"),
    targetApplicationId:         f("textbox-targetApplicationId"),
    targetApplicationMinVersion: f("textbox-targetApplicationMinVersion"),
    targetApplicationMaxVersion: f("textbox-targetApplicationMaxVersion")
  };
}

// without side-effect.
function appendPath(ansIFile, aPath) {
  var f = ansIFile.clone();
  aPath.split("/").forEach(function(x) {
    f.append(x);
  });
  return f;
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
     var f = appendPath(InstallDirectory, x);
     if (!f.exists() || !f.isDirectory()) {
       f.create(f.DIRECTORY_TYPE, 0775);
     }
   });
}

function exportSourceFiles() {
  function cat(obj) {
    var f = appendPath(InstallDirectory, obj.path);
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
   defprefjs(),
   installrdf(),
   localeenUSbrowserdtd(),
   localeenUSconfigdtd(),
   localeenUSsidebardtd(),
   localejabrowserdtd(),
   localejaconfigdtd(),
   localejasidebardtd(),
   overlayxul(),
   resourcesmodules00utilsjsm(),
   resourcesmodules10Stringsjsm(),
   resourcesmodules20Prefsjsm(),
   resourcesmodules20Databasejsm(),
   sidebar00foobar0js(),
   sidebar05foobar1js(),
   sidebarxul(),
   {path: "chrome/locale/en-US/browser.properties", content: ""},
   {path: "chrome/locale/en-US/config.properties",  content: ""},
   {path: "chrome/locale/en-US/sidebar.properties", content: ""},
   {path: "chrome/locale/ja/browser.properties",    content: ""},
   {path: "chrome/locale/ja/config.properties",     content: ""},
   {path: "chrome/locale/ja/sidebar.properties",    content: ""},
   {path: "chrome/skin/classic/browser.css",        content: ""},
   {path: "chrome/skin/classic/browser.osx.css",    content: ""},
   {path: "chrome/skin/classic/config.css",         content: ""},
   {path: "chrome/skin/classic/sidebar.css",        content: ""}
  ].forEach(cat);
}

function copySkinClassicImages() {
  var extensionDirectory = Cc["@mozilla.org/extensions/manager;1"]
                             .getService(Ci.nsIExtensionManager)
                             .getInstallLocation(EXTENSION_ID)
                             .getItemLocation(EXTENSION_ID);
  var imageSrcDir  = appendPath(extensionDirectory, "chrome/skin/classic/images");
  var imageDestDir = appendPath(InstallDirectory,   "chrome/skin/classic/images");
  ["favicon.ico", "favicon32.png", "transparent.png"].forEach(function(x) {
    appendPath(imageSrcDir, x).copyTo(imageDestDir, null);
  });
}

function createTheScaffold() {
  if (!checkForm()) {
    alert("Please fill in all.");
    return;
  }
  Matchfox.Template = readForm();
  makeDirectoryTree();
  exportSourceFiles();
  copySkinClassicImages();
  document.getElementById("label-success").style.visibility = "visible";
  var fileURI = IOService.newFileURI(InstallDirectory);
  if (fileURI && fileURI.spec) openTopWin(fileURI.spec);
}
