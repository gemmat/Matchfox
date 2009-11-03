const EXPORT = ["localejaconfigdtd"];

function localejaconfigdtd() {
  return {
    path: "chrome/locale/ja/config.dtd",
    content: "<!ENTITY " + Template.namespace + ".config.title \"" + Template.namespace + "Setting\">\n" +
             "<!ENTITY " + Template.namespace + ".config.pane0 \"Pane0\">\n" +
             "<!ENTITY " + Template.namespace + ".config.pane1 \"Pane1\">\n" +
             "<!ENTITY " + Template.namespace + ".config.version \"Version\">\n" +
           "  <!ENTITY " + Template.namespace + ".config.versionNumber \"" + Template.namespace + " Version Counter\">\n"
  };
}
