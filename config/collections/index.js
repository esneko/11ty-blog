module.exports = {
  getPosts: (collectionApi) => collectionApi.getFilteredByGlob('src/posts/**/*.mdx')
}
