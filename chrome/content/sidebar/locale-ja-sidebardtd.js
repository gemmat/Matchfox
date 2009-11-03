const EXPORT = ["localejasidebardtd"];

function localejasidebardtd() {
  return {
    path: "chrome/locale/ja/sidebar.dtd",
    content: "<!ENTITY " + Matchfox.template.namespace + ".sidebar.title \"" + Matchfox.template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".sidebar.test \"\u30C6\u30B9\u30C8\">\n"
  };
}
