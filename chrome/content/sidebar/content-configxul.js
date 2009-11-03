const EXPORT = ["configxul"];

function file() {
  return <file>
  <prefwindow
      id={Template.namespace + "-config"}
      xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
      xmlns:html="http://www.w3.org/1999/xhtml"
      title={"&" + Template.namespace + ".config.title;"}>
    <prefpane
       id="prefpane0"
       image={"chrome://" + Template.rootname + "/skin/images/transparent.png"}
       label={"&" + Template.namespace + ".config.pane0;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + Template.rootname + ".version"}
           name={"extensions." + Template.rootname + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + Template.namespace + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + Template.namespace + ".config.versionNumber;"}
                     control="versionNumber0"/>
              <textbox id="versionNumber0"
                       preference={"extensions." + Template.rootname + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <prefpane
       id="prefpane1"
       image={"chrome://" + Template.rootname + "/skin/images/transparent.png"}
       label={"&" + Template.namespace + ".config.pane1;"} flex="1">
      <preferences>
        <preference
           id={"extensions." + Template.rootname + ".version"}
           name={"extensions." + Template.rootname + ".version"}
           type="int"/>
      </preferences>
      <vbox>
        <groupbox orient="vertical">
          <caption label={"&" + Template.namespace + ".config.version;"} />
          <vbox flex="1">
            <hbox flex="1" align="center">
              <label value={"&" + Template.namespace + ".config.versionNumber;"}
                     control="versionNumber1"/>
              <textbox id="versionNumber1"
                       preference={"extensions." + Template.rootname + ".version"}
                       type="number" min="1" increment="1" max="200"
                       style="width: 5em;"/>
            </hbox>
          </vbox>
        </groupbox>
      </vbox>
    </prefpane>
    <script type="application/x-javascript" src="chrome://browser/content/utilityOverlay.js"></script>
<script type="application/javascript; version=1.8" charset="utf-8" src={"chrome://" + Template.rootname + "/content/autoloader.js"}></script>
  </prefwindow>
</file>;
}

function head() {
  return "<?xml version=\"1.0\"?>\n" +
         "<?xml-stylesheet href=\"chrome://global/skin\" type=\"text/css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://mozapps/content/preferences/preferences.css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://browser/skin/preferences/preferences.css\"?>\n" +
         "<?xml-stylesheet href=\"chrome://" + Template.rootname + "/skin/config.css\"?>\n" +
         "<!DOCTYPE dialog SYSTEM \"chrome://" + Template.rootname + "/locale/config.dtd\">\n\n";
}

function configxul() {
  var nsXUL = new Namespace("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
  return {
    path: "chrome/content/config.xul",
    content: head() + file().nsXUL::prefwindow.toXMLString().replace(/&amp;/g,"&")
  };
}