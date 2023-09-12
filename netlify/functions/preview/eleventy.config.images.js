const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// EXAMPLE
	// {% image "https://res.cloudinary.com/nrityagram/image/upload/v1643804553/community_card_qpjn0w.jpg",
    //   "Children's Dance Class",
    //   ["425", "768", "1600"], "eager" %}

	eleventyConfig.addAsyncShortcode("image", async function (url, alt, widths, sizes = "(max-width: 800px) 200px, 50vw", loadingOption = "lazy") {

		// loadingOption = lazy / eager

		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let formats = ["avif", "webp", "auto"];
		// let file = relativeToInputPath(this.page.inputPath, url);
		let metadata = await eleventyImage(url, {
			widths: widths || ["auto"],
			formats,
			outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
		});

		// console.log(JSON.stringify(metadata, null, 2));

		// TODO fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			loading: loadingOption,
			decoding: "async",
		};
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
};
