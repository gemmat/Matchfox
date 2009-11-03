const EXPORT = ["defprefjs"];

function file() {
  return <file>
pref("{"extensions." + Template.rootname + ".version"}", 1);
</file>;
}

function defprefjs() {
  return {
    path: "defaults/preferences/defpref.js",
    content: file().toString()
  };
}
