const EXPORT = ["localejasidebardtd"];

function localejasidebardtd() {
  return {
    path: "chrome/locale/ja/sidebar.dtd",
    content: "<!ENTITY " + Template.namespace + ".sidebar.title \"" + Template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.test \"\u30C6\u30B9\u30C8\">\n"
  };
}
