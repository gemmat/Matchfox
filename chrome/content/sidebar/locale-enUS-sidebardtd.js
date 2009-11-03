const EXPORT = ["localeenUSsidebardtd"];

function localeenUSsidebardtd() {
  return {
    path: "chrome/locale/en-US/sidebar.dtd",
    content: "<!ENTITY " + Template.namespace + ".sidebar.title \"" + Template.namespace + " Sidebar\">\n" +
             "<!ENTITY " + Template.namespace + ".sidebar.test \"test\">\n"
  };
}