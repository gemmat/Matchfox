const EXPORT = ["sidebar00foobar0js"];

function file() {
  return <file>
const EXPORT = ['sidebarFoobar0'];

function sidebarFoobar0() {"{"}
  alert("hello, world");
{"}"}

function notExported() {"{"}
{"}"}
</file>;
}

function sidebar00foobar0js() {
  return {
    path: "chrome/content/sidebar/00-foobar0.js",
    content: file().toString()
  };
}
