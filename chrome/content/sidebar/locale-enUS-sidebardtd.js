const EXPORT = ["localeenUSsidebardtd"];

function localeenUSsidebardtd() {
  return {
    path: "chrome/locale/en-US/sidebar.dtd",
    content: "<!ENTITY " + Matchfox.template.namespace + ".sidebar.title \"" + Matchfox.template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Matchfox.template.namespace + ".sidebar.test \"test\">\n"
  };
}