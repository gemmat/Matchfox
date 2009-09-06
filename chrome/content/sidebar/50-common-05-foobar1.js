const EXPORT = ["common05foobar1js"];

function file() {
  return <file>
const EXPORT = ['commonFoobar1'];

function commonFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;
}

function common05foobar1js() {
  return {
    path: "chrome/content/common/05-foobar1.js",
    content: file().toString()
  };
}