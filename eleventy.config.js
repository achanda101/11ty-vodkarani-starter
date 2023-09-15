const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require("@11ty/eleventy-navigation");

const { EleventyHtmlBasePlugin, EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');

const pluginImages = require('./eleventy.config.images.js');
const pluginPictures = require('./eleventy.config.pictures.js');

module.exports = function (eleventyConfig) {
	// Copy the `img` folder to the output
	eleventyConfig.addPassthroughCopy('img');
	// Copy the `utils` folder to the output
	eleventyConfig.addPassthroughCopy('./src/utils');
	// Copy the `css` folder to the output
	eleventyConfig.addPassthroughCopy('./src/css');

	// Watch CSS files for changes
	// Refresh the browser when your CSS changes,
	// without triggering a rebuild of all your pages by Eleventy
	eleventyConfig.setBrowserSyncConfig({
		files: './_site/css/*.css',
	});

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

	// App plugins
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginPictures);
	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: 'preview', // serverless function name from your permalink object
		functionsDir: './netlify/functions/',
		copy: ['img/'],
    });

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
    });
    eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    // Shortcodes
    // Usage: {% year %}
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	// Filters
	// {{ page.date | readableDate }}
	// output as shown will be Nov 23, 2020
	eleventyConfig.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Customize Markdown library and settings:
	let markdownLibrary = markdownIt({
		html: true,
		linkify: true,
	}).use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			placement: 'after',
			class: 'direct-link',
			symbol: '#',
		}),
		level: [1, 2, 3, 4],
		slugify: eleventyConfig.getFilter('slugify'),
	});
	eleventyConfig.setLibrary('md', markdownLibrary);

	// Override Browsersync defaults (used only with --serve)
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('_site/404.html');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
					res.write(content_404);
					res.end();
				});
			},
		},
		ui: false,
		ghostMode: false,
	});

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ['md', 'njk', 'html', 'liquid'],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: 'njk',

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: 'njk',

		pathPrefix: '/',

		dir: {
			input: 'src',
			includes: '_includes',
			data: '_data',
			output: '_site',
		},
	};
};
