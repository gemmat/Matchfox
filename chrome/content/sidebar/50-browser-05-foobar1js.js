const EXPORT = ["browser05foobar1js"];

var file =
<file>
const EXPORT = ['browserFoobar1'];

function browserFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;

var browser05foobar1js = {
  path: "/chrome/content/browser/05-foobar1.js",
  content: file.toString()
};
