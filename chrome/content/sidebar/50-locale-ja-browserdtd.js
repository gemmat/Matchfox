const EXPORT = ["localejabrowserdtd"];

var ns = "Matchfox";
var key = "!";
var modifiers = "control";

var localejabrowserdtd = {
  path: "/chrome/locale/ja/browser.dtd",
  content: "<!ENTITY " + ns + ".sidebar.label     \"" + ns + " サイドバー\">\n" +
           "<!ENTITY " + ns + ".sidebar.key       \"" + key + "\">\n" +
           "<!ENTITY " + ns + ".sidebar.modifiers \"" + modifiers + "\">"
};