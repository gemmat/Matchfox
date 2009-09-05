const EXPORT = ["configxul"];

var addonName = "matchfox";
var ns = "Matchfox";

var file =
<file>
  <prefwindow
      id={ns + "-config"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml"
      title={"&" + ns + ".config.title;"}>
    <prefpane
       id="prefpane0"
       image={"chrome://" + addonName + "/skin/images/transparent.png"}
       label={"&" + ns + ".config.pane0;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + addonName + ".version"}
           name={"extensions." + addonName + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + ns + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + ns + ".config.versionNumber;"}
                     control="versionNumber0"/>
              <textbox id="versionNumber0"
                       preference={"extensions." + addonName + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <prefpane
       id="prefpane1"
       image={"chrome://" + addonName + "/skin/images/transparent.png"}
       label={"&" + ns + ".config.pane1;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + addonName + ".version"}
           name={"extensions." + addonName + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + ns + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + ns + ".config.versionNumber;"}
                     control="versionNumber1"/>
              <textbox id="versionNumber1"
                       preference={"extensions." + addonName + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <script type="application/x-javascript" src="chrome://browser/content/utilityOverlay.js"></script>
<script type="application/javascript; version=1.8" charset="utf-8" src={"chrome://" + addonName + "/content/autoloader.js"}></script>
  </prefwindow>
</file>;

var head =
  "<?xml version=\"1.0\"?>\n" +
  "<?xml-stylesheet href=\"chrome://global/skin\" type=\"text/css\"?>\n" +
  "<?xml-stylesheet href=\"chrome://mozapps/content/preferences/preferences.css\"?>\n" +
  "<?xml-stylesheet href=\"chrome://browser/skin/preferences/preferences.css\"?>\n" +
  "<?xml-stylesheet href=\"chrome://" + addonName + "/skin/config.css\"?>\n" +
  "<!DOCTYPE dialog SYSTEM \"chrome://" + addonName + "/locale/config.dtd\">\n\n";

var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
var configxul = {
  path: "/chrome/content/config.xul",
  content: head + file.nsXUL::prefwindow.toXMLString().replace(/&amp;/g,"&")
};