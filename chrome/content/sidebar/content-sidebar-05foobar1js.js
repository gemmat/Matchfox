const EXPORT = ["sidebar05foobar1js"];

function file() {
  return <file>
const EXPORT = ['sidebarFoobar1'];

function sidebarFoobar1() {"{"}
{"}"}

function notExported() {"{"}
{"}"}
</file>;
}

function sidebar05foobar1js() {
  return {
    path: "chrome/content/sidebar/05-foobar1.js",
    content: file().toString()
  };
}
