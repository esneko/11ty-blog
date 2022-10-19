const mdxPlugin = require('@jamshop/eleventy-plugin-mdx')

const EleventyPluginNavigation = require('@11ty/eleventy-navigation')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

const rollupPluginCritical = require('rollup-plugin-critical').default

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyPluginNavigation)
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-blog',

    // equal to vite.config.js inside project root
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true
      },
      appType: 'custom',
      build: {
        mode: 'production',
        sourcemap: 'true',
        manifest: true,
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/main.[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js'
          },
          plugins: [
            rollupPluginCritical({
              criticalUrl: './_site/',
              criticalBase: './_site/',
              criticalPages: [
                { uri: 'index.html', template: 'index' },
                { uri: 'posts/index.html', template: 'posts/index' }
              ],
              criticalConfig: {
                inline: true,
                dimensions: [
                  {
                    height: 900,
                    width: 375
                  },
                  {
                    height: 720,
                    width: 1280
                  },
                  {
                    height: 1080,
                    width: 1920
                  }
                ]
              }
            })
          ]
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
  eleventyConfig.addPassthroughCopy('src/assets/js')

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
