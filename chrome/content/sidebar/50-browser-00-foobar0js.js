const EXPORT = ["browser00foobar0js"];

var file =
<file>
const EXPORT = ['browserFoobar0'];

function browserFoobar0() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;

var browser00foobar0js = {
  path: "/chrome/content/browser/00-foobar0.js",
  content: file.toString()
};
