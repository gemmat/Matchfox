const EXPORT = ["chromemanifest"];

function file() {
  return <file>content	  {Template.rootname} chrome/content/
overlay   chrome://browser/content/browser.xul chrome://{Template.rootname}/content/overlay.xul
resource  {Template.rootname}  resources/
skin      {Template.rootname}  classic/1.0	chrome/skin/classic/
locale    {Template.rootname}  en-US       chrome/locale/en-US/
locale    {Template.rootname}  ja          chrome/locale/ja/
</file>;
}

function chromemanifest() {
  return {
    path: "chrome.manifest",
    content: file().toString()
  };
}
