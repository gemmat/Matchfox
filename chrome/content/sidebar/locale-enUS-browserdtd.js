const EXPORT = ["localeenUSbrowserdtd"];

function localeenUSbrowserdtd() {
  return {
    path: "chrome/locale/en-US/browser.dtd",
    content: "<!ENTITY " + Matchfox.template.namespace + ".sidebar.label     \"" + Matchfox.template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".sidebar.key       \"" + Matchfox.template.key + "\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".sidebar.modifiers \"" + Matchfox.template.modifiers + "\">"
  };
}