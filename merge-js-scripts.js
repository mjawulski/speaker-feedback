const fs = require("fs-extra");
const concat = require("concat");

(async function build() {
  const files = [
    "./dist/speaker-feedback/runtime.js",
    "./dist/speaker-feedback/polyfills.js",
    "./dist/speaker-feedback/main.js",
    "./dist/speaker-feedback/scripts.js"
  ];

  await fs.ensureDir("elements");

  await concat(files, "elements/feedback.js");
  console.info("Elements created successfully!");
})();
