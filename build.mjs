/* Inlines the icon sprite into the HTML files, and produces a fully
   self-contained gallery (no external files) for sharing or hosting.
   Run:  node build.mjs   */
import { readFileSync, writeFileSync } from 'node:fs';

const sprite = readFileSync('icons.svg', 'utf8').replace(/^<!--[\s\S]*?-->\s*/, '');
const css    = readFileSync('caliper.css', 'utf8');
const accents= readFileSync('accents.css', 'utf8');
const js     = readFileSync('caliper.js', 'utf8');

for (const f of ['gallery.html', 'starter.html']) {
  const out = readFileSync(f, 'utf8').replace('<!--ICONS-->', sprite);
  writeFileSync(f, out);
  console.log('sprite inlined ->', f);
}

// An inlined <script> ends at the first literal </script> in its text, even
// inside a comment or a string — caliper.js documents its own <script> tag, so
// without this escape the standalone gallery silently loses its JavaScript.
// Same hazard for </style> inside inlined CSS.
const forScript = (s) => s.replace(/<\/script>/gi, '<\\/script>');
const forStyle  = (s) => s.replace(/<\/style>/gi, '<\\/style>');

const standalone = readFileSync('gallery.html', 'utf8')
  .replace('<script src="./caliper.js"></script>', `<script>\n${forScript(js)}\n</script>`)
  .replace('<link rel="stylesheet" href="./caliper.css">', `<style>\n${forStyle(css)}\n</style>`)
  .replace('<link rel="stylesheet" href="./accents.css">', `<style>\n${forStyle(accents)}\n</style>`);
writeFileSync('gallery.standalone.html', standalone);
console.log('wrote gallery.standalone.html', standalone.length, 'bytes');
