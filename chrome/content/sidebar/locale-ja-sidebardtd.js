const EXPORT = ["localejasidebardtd"];

function localejasidebardtd() {
  return {
    path: "chrome/locale/ja/sidebar.dtd",
    content: "<!ENTITY " + Template.namespace + ".sidebar.title \"" + Template.namespace + " \u30b5\u30a4\u30c9\u30d0\u30fc\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.test \"\u30C6\u30B9\u30C8\">\n"
  };
}
