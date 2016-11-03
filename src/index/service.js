import { getPosts } from '../blog/wordpressApi'
import { renderToStaticMarkup } from 'react-dom/server'
import excerptView from '../blog/excerptView'

// TODO: Use a React Component to process last blog post and default text ("<p>no blogs</p>").

// Handles a GET request to the index endpoint.
export default
  render => (req, res) =>
    // render blog posts from WP data
    getPosts()
      .then(extractPosts)
      .then(addPresentationMeta)
      .then(convertPostsToHtml)
      .then(text => { blogPostExcerpts: text })
      .then(render)
      .catch(formatError)
      .then(pageHtml => res.send(pageHtml))

// ------------------------------------------------------------

// Extract the blog posts json data from the wordpress api response.
const extractPosts
  = ([ resp, body ]) => body.posts

// Add metadata for processing the blog post into html.
const addPresentationMeta
  = posts => {
    if (posts && posts.length > 0) {
      posts[posts.length - 1].isLast = true
    }
    return posts
  }

// Convert the posts json to html.
const convertPostsToHtml
  = posts =>
    posts && posts.length > 0
      ? posts.reduce((html, post) => html + postToHtml(post), '')
      : '<p>No blog posts found.</p>'

// TODO: inject render function.
const postToHtml
  = post =>
    renderToStaticMarkup(excerptView(post))

// Output error into page with details hidden in a comment.
const formatError
  = err =>
    '<p>Unable to fetch blog posts at this time.</p><!-- ' + err + '-->'
