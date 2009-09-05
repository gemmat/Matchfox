const EXPORT = ["installrdf"];

var file =
<file>
  <RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:em="http://www.mozilla.org/2004/em-rdf#">
    <Description about="urn:mozilla:install-manifest">
      <em:id>{Matchfox.template.extensionId}</em:id>
      <em:version>{Matchfox.template.extensionVer}</em:version>
      <em:type>{Matchfox.template.extensionType}</em:type>
      <em:optionsURL>chrome://{Matchfox.template.rootname}/content/config.xul</em:optionsURL>
      <em:iconURL>chrome://{Matchfox.template.rootname}/skin/images/favicon32.png</em:iconURL>
      <em:localized>
        <Description>
          <em:name>{Matchfox.template.descEnName}</em:name>
          <em:locale>en-US</em:locale>
          <em:description>{Matchfox.template.descEnDesc}</em:description>
          <em:creator>{Matchfox.template.descEnCreater}</em:creator>
          <em:homepageURL>{Matchfox.template.descEnHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:localized>
        <Description>
          <em:name>{Matchfox.template.descJaName}</em:name>
          <em:locale>ja</em:locale>
          <em:description>{Matchfox.template.descJaDesc}</em:description>
          <em:creator>{Matchfox.template.descJaCreater}</em:creator>
          <em:homepageURL>{Matchfox.template.descJaHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:targetApplication>
        <Description>
          <em:id>{Matchfox.template.targetApplicationId}</em:id>
          <em:minVersion>{Matchfox.template.targetApplicationMinVersion}</em:minVersion>
          <em:maxVersion>{Matchfox.template.targetApplicationMaxVersion}</em:maxVersion>
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
