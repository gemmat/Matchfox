const EXPORT = ["configxul"];

function file() {
  return <file>
  <prefwindow
      id={Matchfox.template.namespace + "-config"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml"
      title={"&" + Matchfox.template.namespace + ".config.title;"}>
    <prefpane
       id="prefpane0"
       image={"chrome://" + Matchfox.template.rootname + "/skin/images/transparent.png"}
       label={"&" + Matchfox.template.namespace + ".config.pane0;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + Matchfox.template.rootname + ".version"}
           name={"extensions." + Matchfox.template.rootname + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + Matchfox.template.namespace + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + Matchfox.template.namespace + ".config.versionNumber;"}
                     control="versionNumber0"/>
              <textbox id="versionNumber0"
                       preference={"extensions." + Matchfox.template.rootname + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <prefpane
       id="prefpane1"
       image={"chrome://" + Matchfox.template.rootname + "/skin/images/transparent.png"}
       label={"&" + Matchfox.template.namespace + ".config.pane1;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + Matchfox.template.rootname + ".version"}
           name={"extensions." + Matchfox.template.rootname + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + Matchfox.template.namespace + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + Matchfox.template.namespace + ".config.versionNumber;"}
                     control="versionNumber1"/>
              <textbox id="versionNumber1"
                       preference={"extensions." + Matchfox.template.rootname + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <script type="application/x-javascript" src="chrome://browser/content/utilityOverlay.js"></script>
<script type="application/javascript; version=1.8" charset="utf-8" src={"chrome://" + Matchfox.template.rootname + "/content/autoloader.js"}></script>
  </prefwindow>
</file>;
}

function head() {
  return "<?xml version=\"1.0\"?>\n" +
         "<?xml-stylesheet href=\"chrome://global/skin\" type=\"text/css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://mozapps/content/preferences/preferences.css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://browser/skin/preferences/preferences.css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://" + Matchfox.template.rootname + "/skin/config.css\"?>\n" +
         "<!DOCTYPE dialog SYSTEM \"chrome://" + Matchfox.template.rootname + "/locale/config.dtd\">\n\n";
}

function configxul() {
  var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
  return {
    path: "chrome/content/config.xul",
    content: head() + file().nsXUL::prefwindow.toXMLString().replace(/&amp;/g,"&")
  };
}