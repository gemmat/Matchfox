const EXPORT = ["chromemanifest"];

var file =
<file>content	  {Matchfox.template.rootname} chrome/content/
overlay   chrome://browser/content/browser.xul chrome://{Matchfox.template.rootname}/content/overlay.xul
resource  {Matchfox.template.rootname}  resources/
skin      {Matchfox.template.rootname}  classic/1.0	chrome/skin/classic/
locale    {Matchfox.template.rootname}  en-US       chrome/locale/en-US/
locale    {Matchfox.template.rootname}  ja          chrome/locale/ja/
</file>;

var chromemanifest = {
  path: "/chrome.manifest",
  content: file.toString()
};
