const mdxPlugin = require('@jamshop/eleventy-plugin-mdx')

const EleventyPluginNavigation = require('@11ty/eleventy-navigation')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyPluginNavigation)

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('src/assets/css')

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')

  // Markdown
  eleventyConfig.addPlugin(mdxPlugin)

  return {
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data'
    }
  }
}
