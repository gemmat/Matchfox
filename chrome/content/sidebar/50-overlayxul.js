const EXPORT = ["overlayxul"];

var addonName = "matchfox";
var ns = "Matchfox";

var file =
<file>
  <overlay id={ns + "Overlay"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml">
    <script type="application/javascript" src="autoloader.js"></script>
    <menupopup id="viewSidebarMenu">
      <menuitem key={"key_view" + ns + "Sidebar"} observes={"view" + ns + "Sidebar"}/>
    </menupopup>
    <keyset id="mainKeyset">
      <key id={"key_view" + ns + "Sidebar"} command={"view" + ns + "Sidebar"}
           key={"&" + ns + ".sidebar.key;"}
           modifiers={"&" + ns + ".sidebar.modifiers;"}/>
    </keyset>
    <broadcasterset id="mainBroadcasterSet">
      <broadcaster id={"view" + ns + "Sidebar"}
                   label={"&" + ns + ".sidebar.label;"}
                   autoCheck="false"
                   type="checkbox"
                   group="sidebar"
                   sidebarurl={"chrome://" + addonName + "/content/sidebar.xul"}
                   sidebartitle={"&" + ns + ".sidebar.label;"}
                   oncommand={"toggleSidebar('view" + ns + "Sidebar');"}/>
    </broadcasterset>
  </overlay>
</file>;


var head =
  "<?xml version=\"1.0\" ?>\n" +
  "<?xml-stylesheet type=\"text/css\" href=\"chrome://" + addonName + "/skin/browser.css\"?>\n" +
  "<!DOCTYPE overlay SYSTEM \"chrome://" + addonName + "/locale/browser.dtd\">\n\n";

var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
var overlayxul = {
  path: "/chrome/content/overlay.xul",
  content: head + file.nsXUL::overlay.toXMLString().replace(/&amp;/g,"&")
};

