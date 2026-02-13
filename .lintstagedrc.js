module.exports = {
  '*.{js,jsx,ts,tsx}': ['node ./scripts/terminal/lint.mjs', 'node ./scripts/terminal/prettier.mjs'],
  '*.{json,md,yml,yaml,css,scss}': ['node ./scripts/terminal/prettier.mjs'],
};
