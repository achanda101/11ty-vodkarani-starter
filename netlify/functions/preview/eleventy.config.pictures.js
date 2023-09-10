const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = (eleventyConfig) => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Pictures shortcode
	
	// EXAMPLE
	// {% pictures 
    //   {"desk":"https://res.cloudinary.com/nrityagram/image/upload/v1647179355/Space-cat2-desk_rix0hl.jpg", 
    //   "tab":"https://res.cloudinary.com/nrityagram/image/upload/v1620417697/ipad/08-dhruva-ipad_ppl3ra.jpg", 
    //   "mob":"https://res.cloudinary.com/nrityagram/image/upload/v1582614660/mobile/9_s1ma2d.jpg"}, 
    //   "Pictures Shortcode Test", 
    //   {"mob": ["425"], "tab": ["768"], "desk":["1600"]}, {"desk":"65em", "tab":"50em", "mob":"35em"}, 
    //   "eager", "high" %}

	eleventyConfig.addAsyncShortcode(
		"pictures",
		async function (srclist, alt = "Alt Text Req", widthslist, screenwidths, loadingOption, fetchPriorityOption) {
			
			// fetchOption = low / high
			// loadingOption = lazy / eager

			// Warning: Avif can be resource-intensive so take care!
			let formats = ["webp", "auto"];
			
			// If you are loading images from local folder
			// for (const key in srclist) {
			// 	srclist[key] = relativeToInputPath(this.page.inputPath, srclist[key]);
			// }

			let metadatalist = {};
			let metadataKeys = [ "desk", "tab", "mob" ];

			for (const key of metadataKeys) {
				metadatalist[key] = await eleventyImage(srclist[key], {
					widths: widthslist[key] || ["auto"],
					formats,
					outputDir: path.join(eleventyConfig.dir.output, "img"),
				});
			}
			
			// generate 6 source tags
			// TODO: rewrite forEach loop using map() and join()
			let sourceList = ''
			metadataKeys.forEach(key => {
				let formats = Object.keys(metadatalist[ key ])
				formats.forEach(format => {
					let formatDetails = metadatalist[key][format]
					let source = `<source srcset="${formatDetails[ 0 ].url}" width="${formatDetails[0].width}" height="${formatDetails[0].height}" media="(min-width: ${screenwidths[ key ]})" type="image/${formatDetails[ 0 ].format}" />`
					sourceList = sourceList.concat(source)
				})
			})
			
			// create img string with webp from mobile
			let imgData = metadatalist[ metadataKeys.slice(-1) ][formats[0]][0]
			let imgElem = `<img src="${imgData.url}" width="${imgData.width}" height="${imgData.height}" alt="${alt}" fetchPriority="${fetchPriorityOption}" loading="${loadingOption}" />`

			return `<picture>${sourceList}${imgElem}</picture>`
		}
	);
};
