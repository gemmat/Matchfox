const EXPORT = ["installrdf"];

function file() {
  return <file>
  <RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:em="http://www.mozilla.org/2004/em-rdf#">
    <Description about="urn:mozilla:install-manifest">
      <em:id>{Template.extensionId}</em:id>
      <em:version>{Template.extensionVer}</em:version>
      <em:type>{Template.extensionType}</em:type>
      <em:optionsURL>chrome://{Template.rootname}/content/config.xul</em:optionsURL>
      <em:iconURL>chrome://{Template.rootname}/skin/images/favicon32.png</em:iconURL>
      <em:localized>
        <Description>
          <em:name>{Template.descEnName}</em:name>
          <em:locale>en-US</em:locale>
          <em:description>{Template.descEnDesc}</em:description>
          <em:creator>{Template.descEnCreater}</em:creator>
          <em:homepageURL>{Template.descEnHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:localized>
        <Description>
          <em:name>{Template.descJaName}</em:name>
          <em:locale>ja</em:locale>
          <em:description>{Template.descJaDesc}</em:description>
          <em:creator>{Template.descJaCreater}</em:creator>
          <em:homepageURL>{Template.descJaHomepageURL}</em:homepageURL>
        </Description>
      </em:localized>
      <em:targetApplication>
        <Description>
          <em:id>{Template.targetApplicationId}</em:id>
          <em:minVersion>{Template.targetApplicationMinVersion}</em:minVersion>
          <em:maxVersion>{Template.targetApplicationMaxVersion}</em:maxVersion>
        </Description>
      </em:targetApplication>
    </Description>
  </RDF>
</file>;
}

function installrdf() {
  var nsRDF = new Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  return {
    path: "install.rdf",
    content: "<?xml version=\"1.0\"?>\n\n" + file().nsRDF::RDF.toXMLString()
  };
}
