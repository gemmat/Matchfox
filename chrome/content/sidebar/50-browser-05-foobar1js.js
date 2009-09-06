const EXPORT = ["browser05foobar1js"];

function file() {
  return <file>
const EXPORT = ['browserFoobar1'];

function browserFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;
}

function browser05foobar1js() {
  return {
    path: "chrome/content/browser/05-foobar1.js",
    content: file().toString()
  };
}
