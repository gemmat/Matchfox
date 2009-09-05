const EXPORT = ["chromemanifest"];

var addonName = "matchfox";

var file =
<file>content	  {addonName} chrome/content/
overlay   chrome://browser/content/browser.xul chrome://{addonName}/content/overlay.xul
resource  {addonName}  resources/
skin      {addonName}  classic/1.0	chrome/skin/classic/
locale    {addonName}  en-US       chrome/locale/en-US/
locale    {addonName}  ja          chrome/locale/ja/
</file>;

var chromemanifest = {
  path: "/chrome.manifest",
  content: file.toString()
};
