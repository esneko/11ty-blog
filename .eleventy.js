const mdxPlugin = require('@jamshop/eleventy-plugin-mdx')

const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyPluginNavigation)
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '_temp',
    // equal to vite.config.js inside project root
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true
      },
      build: {
        mode: 'production',
        sourcemap: 'true',
        manifest: true,
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/main.[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js'
          }
        }
      }
    }
  })

  // Markdown
  eleventyConfig.addPlugin(mdxPlugin)

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('src/assets/css')
  eleventyConfig.addPassthroughCopy('src/assets/ts')

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
