const EXPORT = ["autoloaderjs"];

function file() {
  return <file>
if (!{Matchfox.template.namespace})
  var {Matchfox.template.namespace} = {"{}"};

Components.utils.import("resource://{Matchfox.template.rootname}/modules/00-utils.jsm",
                        {Matchfox.template.namespace});

/**
 * load script files at the specified URI.
 *
 * @param {"{"}String{"}"} uri the URI of the script file.
 *                     When it's terminated with "/",
 *                     loads the directory recursively.
 */
{Matchfox.template.namespace}.load = function (uri) {"{"}
  if (uri.charAt(uri.length - 1) === "/") {"{"}
    var load = arguments.callee;
    load.getScriptURIs(uri)
        .forEach(function (uri) load.call(this, uri), this);
    return;
  {"}"}

  var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
                 .getService(Components.interfaces.mozIJSSubScriptLoader);
  var env = {"{"} __proto__: this {"}"};
  loader.loadSubScript(uri, env);
  if (env.EXPORT)
      env.EXPORT.forEach(function (name) this[name] = env[name], this);
{"}"};

{Matchfox.template.namespace}.load.getScriptURIs = function (dirURI) {"{"}
  const Cc = Components.classes;
  const Ci = Components.interfaces;
  const EXTENSION_ID = "{Matchfox.template.extensionId}";
  var uris = [];
  var dirPath = dirURI.replace(/^[\w-]+:\/\/[\w.:-]+\//, "");
  var em = Cc["@mozilla.org/extensions/manager;1"]
             .getService(Ci.nsIExtensionManager);
  var baseURI = 'chrome://{Matchfox.template.rootname}/' + dirPath;
  // XXX if you want to package them in the jar file, the nsIZipReader will be some help.
  var dir = em.getInstallLocation(EXTENSION_ID)
              .getItemFile(EXTENSION_ID, "chrome/" + dirPath);
  if (!dir.exists() || !dir.isDirectory()) return uris;
  var files = dir.directoryEntries;
  while (files.hasMoreElements()) {"{"}
    var file = files.getNext().QueryInterface(Ci.nsIFile);
    if (/\.js$/.test(file.leafName))
      uris.push(baseURI + file.leafName);
  {"}"}
  return uris.sort();
{"}"};

if (!("autoload" in {Matchfox.template.namespace}) || {Matchfox.template.namespace}.autoload) {"{"}
  {Matchfox.template.namespace}.loadModules();
  {Matchfox.template.namespace}.load("chrome://{Matchfox.template.rootname}/content/common/");
  {Matchfox.template.namespace}.load(location.href.replace(/\.\w+$/, "/"));
{"}"}
</file>;
}

function autoloaderjs() {
  return {
    path: "chrome/content/autoloader.js",
    content: file().toString()
  };
}