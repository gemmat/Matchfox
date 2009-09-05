const EXPORT = ["localejaconfigdtd"];

var ns = "Matchfox";

var localejaconfigdtd = {
  path: "/chrome/locale/ja/config.dtd",
  content: "<!ENTITY " + ns + ".config.title \"" + ns + "の設定\">\n" +
           "<!ENTITY " + ns + ".config.pane0 \"Pane0\">\n" +
           "<!ENTITY " + ns + ".config.pane1 \"Pane1\">\n" +
           "<!ENTITY " + ns + ".config.version \"バージョン\">\n" +
           "<!ENTITY " + ns + ".config.versionNumber \"" + ns + "のバージョンの数\">\n"
};