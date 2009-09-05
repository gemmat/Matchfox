const EXPORT = ["overlayxul"];

var file =
<file>
  <overlay id={Matchfox.template.namespace + "Overlay"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml">
    <script type="application/javascript" src="autoloader.js"></script>
    <menupopup id="viewSidebarMenu">
      <menuitem key={"key_view" + Matchfox.template.namespace + "Sidebar"} observes={"view" + Matchfox.template.namespace + "Sidebar"}/>
    </menupopup>
    <keyset id="mainKeyset">
      <key id={"key_view" + Matchfox.template.namespace + "Sidebar"} command={"view" + Matchfox.template.namespace + "Sidebar"}
           key={"&" + Matchfox.template.namespace + ".sidebar.key;"}
           modifiers={"&" + Matchfox.template.namespace + ".sidebar.modifiers;"}/>
    </keyset>
    <broadcasterset id="mainBroadcasterSet">
      <broadcaster id={"view" + Matchfox.template.namespace + "Sidebar"}
                   label={"&" + Matchfox.template.namespace + ".sidebar.label;"}
                   autoCheck="false"
                   type="checkbox"
                   group="sidebar"
                   sidebarurl={"chrome://" + Matchfox.template.rootname + "/content/sidebar.xul"}
                   sidebartitle={"&" + Matchfox.template.namespace + ".sidebar.label;"}
                   oncommand={"toggleSidebar('view" + Matchfox.template.namespace + "Sidebar');"}/>
    </broadcasterset>
  </overlay>
</file>;


var head =
  "<?xml version=\"1.0\" ?>\n" +
  "<?xml-stylesheet type=\"text/css\" href=\"chrome://" + Matchfox.template.rootname + "/skin/browser.css\"?>\n" +
  "<!DOCTYPE overlay SYSTEM \"chrome://" + Matchfox.template.rootname + "/locale/browser.dtd\">\n\n";

var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
var overlayxul = {
  path: "/chrome/content/overlay.xul",
  content: head + file.nsXUL::overlay.toXMLString().replace(/&amp;/g,"&")
};

