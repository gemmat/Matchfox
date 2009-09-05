const EXPORT = ["sidebar05foobar1js"];

var file =
<file>
const EXPORT = ['sidebarFoobar1'];

function sidebarFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;

var sidebar05foobar1js = {
  path: "/chrome/content/sidebar/05-foobar1.js",
  content: file.toString()
};
