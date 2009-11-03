const EXPORT = ["resourcesmodules10Stringsjsm"];

function file() {
  return <file>
const EXPORTED_SYMBOLS = ["Strings", "stringsGetter"];
Components.utils.import("resource://{Template.rootname}/modules/00-utils.jsm");

function Strings(propertiesFile) {"{"}
    this._bundle = StringBundleService.createBundle(propertiesFile);
{"}"}

extend(Strings.prototype, {"{"}
    get: function Strings_get(name, args) {"{"}
        return args
            ? this._bundle.formatStringFromName(name, args, args.length)
            : this._bundle.GetStringFromName(name);
    {"}"}
{"}"});
</file>;
}

function resourcesmodules10Stringsjsm() {
  return {
    path: "resources/modules/10-Strings.jsm",
    content: file().toString()
  };
}
