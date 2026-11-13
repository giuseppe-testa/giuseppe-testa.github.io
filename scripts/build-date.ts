// Pre-render step (run by Quarto with its bundled Deno, no extra dependencies):
// writes today's date to _variables.yml so pages can use {{< var build_date >}}.
//
// The file is only rewritten when the date actually changes, and incremental
// renders done by `quarto preview` while you browse are skipped: rewriting a
// project file on every page render makes the preview re-render in a loop.
const path = "_variables.yml";
const content = `build_date: "${new Date().toISOString().slice(0, 10)}"\n`;

const fullRender = Deno.env.get("QUARTO_PROJECT_RENDER_ALL") === "1";
let current = "";
try { current = await Deno.readTextFile(path); } catch { /* first run */ }

if (current !== content && (fullRender || current === "")) {
  await Deno.writeTextFile(path, content);
}
