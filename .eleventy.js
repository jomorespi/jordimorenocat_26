const CleanCSS = require("clean-css");
const Terser = require("terser");
const { DateTime } = require("luxon");
const markdownIt = require('markdown-it');

const md = new markdownIt();

module.exports = function(eleventyConfig) {

  // Fonts
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });

  // Watch
  eleventyConfig.addWatchTarget("src/assets/css");
  eleventyConfig.addWatchTarget("src/assets/js");

  // Minify
  eleventyConfig.addFilter("cssmin", code =>
    new CleanCSS({}).minify(code).styles
  );

  eleventyConfig.addFilter("jsmin", code => {
    const minified = Terser.minify(code);
    return minified.error ? code : minified.code;
  });

  // Dates
  eleventyConfig.addFilter("formatDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd / MM / yyyy");
  });

  // Json markdown format
  eleventyConfig.addFilter('markdown', (content) => {
    return md.render(content);
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