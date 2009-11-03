const EXPORT = ["browser00foobar0js"];

function file() {
  return <file>
const EXPORT = ['browserFoobar0'];

function browserFoobar0() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;
}

function browser00foobar0js() {
  return {
    path: "chrome/content/browser/00-foobar0.js",
    content: file().toString()
  };
}
