const EXPORT = ["localeenUSconfigdtd"];

function localeenUSconfigdtd() {
  return {
    path: "chrome/locale/en-US/config.dtd",
    content: "<!ENTITY " + Template.namespace + ".config.title \"Settings for the " + Template.namespace + " Extension\">\n" +
             "<!ENTITY " + Template.namespace + ".config.pane0 \"Pane0\">\n" +
             "<!ENTITY " + Template.namespace + ".config.pane1 \"Pane1\">\n" +
             "<!ENTITY " + Template.namespace + ".config.version \"Version\">\n" +
             "<!ENTITY " + Template.namespace + ".config.versionNumber \"Version number of " + Template.namespace + "\">\n"
  };
}