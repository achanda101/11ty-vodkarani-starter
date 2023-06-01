const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = (eleventyConfig) => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode(
		"pictures",
		async function (srclist, alt = "Alt Text Req", sizes, screenwidths, fetchOption) {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "webp", "auto"];
			// object of images for different screensizes desk, tab, mob - srclist
			
			for (const key in srclist) {
				srclist[key] = relativeToInputPath(this.page.inputPath, srclist[key]);
			}

			let metadatalist = srclist;
			let metadataKeys = Object.keys(srclist)

			for (const key in srclist) {
				metadatalist[key] = await eleventyImage(srclist[key], {
					widths: sizes[key],
					formats,
					outputDir: path.join(eleventyConfig.dir.output, "img"),
				});
			}
			// generate 9 source tags
			// TODO: rewrite forEach loop using map() and join()
			let sourceList = ''
			metadataKeys.forEach(key => {
				let formats = Object.keys(metadatalist[ key ])
				formats.forEach(format => {
					let formatDetails = metadatalist[key][format]
					let source = `<source srcset="${formatDetails[ 0 ].url}" width="${formatDetails[0].width}" height="${formatDetails[0].height}" media="(min-width: ${screenwidths[ key ]}px)" type="image/${formatDetails[ 0 ].format}" />`
					sourceList = sourceList.concat(source)
				})
			})
			
			// create img string with webp from mobile
			let imgData = metadatalist[ metadataKeys.slice(-1) ][formats[0]][0]
			let imgElem = `<img src="${imgData.url}" width="${imgData.width}" height="${imgData.height}" alt="${alt}" fetchPriority="${fetchOption}" />`

			return `<picture>${sourceList}${imgElem}</picture>`

			// TODO loading=eager
		}
	);
};
