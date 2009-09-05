const EXPORT = ["installrdf"];

var extensionId = "matchfox@mozdev.org";
var version = "20.0.0";
var type = "2";
var addonName = "matchfox";
var descEnName = "Matchfox";
var descEnDesc = "Generates a scaffold for the Firefox Add-on.";
var descEnCreater = "Teruaki Gemma";
var descEnHomepageURL = "http://d.hatena.ne.jp/Gemma";
var descJaName = "Matchfox";
var descJaDesc = "Firefox拡張の骨組みを生成します。";
var descJaCreater = "源馬照明";
var descJaHomepageURL = "http://d.hatena.ne.jp/Gemma";
var targetApplicationId = "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}";
var targetApplicationMinVersion = "3.0";
var targetApplicationMaxVersion = "3.7a1pre";
var file =
<file>
  <RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:em="http://www.mozilla.org/2004/em-rdf#">
    <Description about="urn:mozilla:install-manifest">
      <em:id>{extensionId}</em:id>
      <em:version>{version}</em:version>
      <em:type>{type}</em:type>
      <em:optionsURL>chrome://{addonName}/content/config.xul</em:optionsURL>
      <em:iconURL>chrome://{addonName}/skin/images/favicon32.png</em:iconURL>
      <em:localized>
        <Description>
          <em:name>{descEnName}</em:name>
          <em:locale>en-US</em:locale>
          <em:description>{descEnDesc}</em:description>
          <em:creator>{descEnCreater}</em:creator>
          <em:homepageURL>{descEnHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:localized>
        <Description>
          <em:name>{descJaName}</em:name>
          <em:locale>ja</em:locale>
          <em:description>{descJaDesc}</em:description>
          <em:creator>{descJaCreater}</em:creator>
          <em:homepageURL>{descJaHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:targetApplication>
        <Description>
          <em:id>{targetApplicationId}</em:id>
          <em:minVersion>{targetApplicationMinVersion}</em:minVersion>
          <em:maxVersion>{targetApplicationMaxVersion}</em:maxVersion>
        </Description>
      </em:targetApplication>
    </Description>
  </RDF>
</file>;

var nsRDF = new Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var installrdf = {
  path: "/install.rdf",
  content: "<?xml version=\"1.0\"?>\n\n" + file.nsRDF::RDF.toXMLString()
};
