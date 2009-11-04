const EXPORT = ["localejabrowserdtd"];

function localejabrowserdtd() {
  return {
    path: "chrome/locale/ja/browser.dtd",
    content: "<!ENTITY " + Template.namespace + ".sidebar.label     \"" + Template.namespace + " \u30b5\u30a4\u30c9\u30d0\u30fc\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.key       \"" + Template.key + "\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.modifiers \"" + Template.modifiers + "\">"
  };
}
