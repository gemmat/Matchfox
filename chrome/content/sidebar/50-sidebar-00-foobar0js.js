const EXPORT = ["sidebar00foobar0js"];

var file =
<file>
const EXPORT = ['sidebarFoobar0'];

function sidebarFoobar0() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;

var sidebar00foobar0js = {
  path: "/chrome/content/sidebar/00-foobar0.js",
  content: file.toString()
};
