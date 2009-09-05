const EXPORT = ["common05foobar1js"];

var file =
<file>
const EXPORT = ['commonFoobar1'];

function commonFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;

var common05foobar1js = {
  path: "/chrome/content/common/05-foobar1.js",
  content: file.toString()
};