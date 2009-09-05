const EXPORT = ["sidebarxul"];

var file =
<file>
  <page xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
        id={Matchfox.template.namespace + "Sidebar"}
        title={"&" + Matchfox.template.namespace + ".sidebar.title;"}>
    <script type="application/javascript" src="autoloader.js"></script>
    <script type="application/javascript" src="chrome://browser/content/utilityOverlay.js"></script>
  </page>
</file>;

var head =
  "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
  "<?xml-stylesheet href=\"chrome://global/skin/\" type=\"text/css\" ?>\n" +
  "<?xml-stylesheet href=\"chrome://browser/skin/browser.css\" type=\"text/css\" ?>\n" +
  "<?xml-stylesheet href=\"chrome://" + Matchfox.template.rootname + "/skin/sidebar.css\" type=\"text/css\" ?>\n" +
  "<!DOCTYPE page SYSTEM \"chrome://" + Matchfox.template.rootname + "/locale/sidebar.dtd\">\n\n";

var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
var sidebarxul = {
  path: "/chrome/content/sidebar.xul",
  content: head + file.nsXUL::page.toXMLString().replace(/&amp;/g,"&")
};