const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = function(eleventyConfig) {

  // Fonts
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });

  // Watch
  eleventyConfig.addWatchTarget("src/assets/css");
  eleventyConfig.addWatchTarget("src/assets/js");

  // Filters
  eleventyConfig.addFilter("cssmin", code =>
    new CleanCSS({}).minify(code).styles
  );

  eleventyConfig.addFilter("jsmin", code => {
    const minified = Terser.minify(code);
    return minified.error ? code : minified.code;
  });

  // Options
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};