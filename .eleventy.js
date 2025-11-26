module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addWatchTarget("src/assets/css");
  eleventyConfig.addWatchTarget("src/assets/js");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};