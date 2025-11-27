const CleanCSS = require("clean-css");
const Terser = require("terser");
const { DateTime } = require("luxon");
const markdownIt = require('markdown-it');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

const md = new markdownIt();

require('dotenv').config({
    path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
});

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

  // Navigation
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // RSS
  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blog",
			limit: 0, // 0 means no limit
		},
		metadata: {
			language: "ca",
			title: "jordimoreno.cat",
			subtitle: "Blog de Jordi Moreno Crespi, desenvolupador web i escriptor.",
			base: process.env.URL || "https://jordimoreno.cat",
			author: {
				name: "Jordi Moreno Crespi",
				email: "hola@jordimoreno.cat", // Optional
			}
		}
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