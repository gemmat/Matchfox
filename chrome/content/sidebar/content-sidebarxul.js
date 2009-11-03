const EXPORT = ["sidebarxul"];

function file() {
  return <file>
  <page xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
        id={Template.namespace + "Sidebar"}
        title={"&" + Template.namespace + ".sidebar.title;"}>
    <script type="application/javascript" src="autoloader.js"></script>
    <script type="application/javascript" src="chrome://browser/content/utilityOverlay.js"></script>
    <button oncommand={Template.namespace + ".sidebarFoobar0();"} label={"&" + Template.namespace + ".sidebar.test;"}/>
  </page>
</file>;
}

function head() {
  return "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
         "<?xml-stylesheet href=\"chrome://global/skin/\" type=\"text/css\" ?>\n" +
         "<?xml-stylesheet href=\"chrome://browser/skin/browser.css\" type=\"text/css\" ?>\n" +
         "<?xml-stylesheet href=\"chrome://" + Template.rootname + "/skin/sidebar.css\" type=\"text/css\" ?>\n" +
         "<!DOCTYPE page SYSTEM \"chrome://" + Template.rootname + "/locale/sidebar.dtd\">\n\n";
}

function sidebarxul() {
  var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
  return {
    path: "chrome/content/sidebar.xul",
    content: head() + file().nsXUL::page.toXMLString().replace(/&amp;/g,"&")
  };
}