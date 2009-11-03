const EXPORT = ["localejabrowserdtd"];

function localejabrowserdtd() {
  return {
    path: "chrome/locale/ja/browser.dtd",
    content: "<!ENTITY " + Template.namespace + ".sidebar.label     \"" + Template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.key       \"" + Template.key + "\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.modifiers \"" + Template.modifiers + "\">"
  };
}
