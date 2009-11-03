const EXPORT = ["overlayxul"];

function file() {
  return <file>
  <overlay id={Template.namespace + "Overlay"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml">
    <script type="application/javascript" src="autoloader.js"></script>
    <menupopup id="viewSidebarMenu">
      <menuitem key={"key_view" + Template.namespace + "Sidebar"} observes={"view" + Template.namespace + "Sidebar"}/>
    </menupopup>
    <keyset id="mainKeyset">
      <key id={"key_view" + Template.namespace + "Sidebar"} command={"view" + Template.namespace + "Sidebar"}
           key={"&" + Template.namespace + ".sidebar.key;"}
           modifiers={"&" + Template.namespace + ".sidebar.modifiers;"}/>
    </keyset>
    <broadcasterset id="mainBroadcasterSet">
      <broadcaster id={"view" + Template.namespace + "Sidebar"}
                   label={"&" + Template.namespace + ".sidebar.label;"}
                   autoCheck="false"
                   type="checkbox"
                   group="sidebar"
                   sidebarurl={"chrome://" + Template.rootname + "/content/sidebar.xul"}
                   sidebartitle={"&" + Template.namespace + ".sidebar.label;"}
                   oncommand={"toggleSidebar('view" + Template.namespace + "Sidebar');"}/>
    </broadcasterset>
  </overlay>
</file>;
}

function head() {
  return "<?xml version=\"1.0\" ?>\n" +
         "<?xml-stylesheet type=\"text/css\" href=\"chrome://" + Template.rootname + "/skin/browser.css\"?>\n" +
         "<!DOCTYPE overlay SYSTEM \"chrome://" + Template.rootname + "/locale/browser.dtd\">\n\n";
}

function overlayxul() {
  var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
  return {
    path: "chrome/content/overlay.xul",
    content: head() + file().nsXUL::overlay.toXMLString().replace(/&amp;/g,"&")
  };
}

