const EXPORT = ["localejaconfigdtd"];

function localejaconfigdtd() {
  return {
    path: "chrome/locale/ja/config.dtd",
    content: "<!ENTITY " + Matchfox.template.namespace + ".config.title \"" + Matchfox.template.namespace + "Setting\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".config.pane0 \"Pane0\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".config.pane1 \"Pane1\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".config.version \"Version\">\n" +
           "  <!ENTITY " + Matchfox.template.namespace + ".config.versionNumber \"" + Matchfox.template.namespace + " Version Counter\">\n"
  };
}
