module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "_views/assets/fonts": "assets/fonts" });
  eleventyConfig.addWatchTarget("_views/assets/css");
  eleventyConfig.addWatchTarget("_views/assets/js");

  return {
    dir: {
      input: "_views",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};