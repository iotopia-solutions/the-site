// This is a composition plan for the service that handles requests to the
// site's index.
import { getPosts } from '../blog/wordpressApi'
import { renderToStaticMarkup } from 'react-dom/server'
import excerptView from '../blog/excerptView'
import compile from '../template/compile';
import { readFileSync } from 'fs';
import { join } from 'path';

// TODO: Use a React Component to process last blog post and default text ("<p>no blogs</p>").

// Handles a GET request to the index endpoint.
export default
  config => {
    const render = renderPage(config)
    return (req, res) =>
      // render blog posts from WP data
      getPosts()
        .then(extractExcerpts)
        .then(transformToViewData)
        .then(renderViewData)
        .then(text => ({ blogPostExcerpts: text }))
        .then(render)
        .catch(formatError)
        .then(pageHtml => res.send(pageHtml))
  }

// ------------------------------------------------------------

const renderPage
  = config => {
    // TODO: refactor app so this can be async.
    const pageHtml = readFileSync(join(__dirname, 'index.html'), 'utf8')
    return compile(pageHtml)
  }

// Extract the blog posts json data from the wordpress api response.
const extractExcerpts
  = ([ resp, body ]) => body.posts

// Convert the blog excerpts to data that the view expects.
// Add metadata for processing.
const transformToViewData
  = posts => {
    if (posts && posts.length > 0) {
      posts[posts.length - 1].isLast = true
    }
    return posts
  }

// Convert the excerpts json to html.
const renderViewData
  = posts =>
    posts && posts.length > 0
      ? posts.reduce((html, post) => html + excerptToHtml(post), '')
      : '<p>No blog posts found.</p>'

// TODO: inject render function.
const excerptToHtml
  = post =>
    renderToStaticMarkup(excerptView(post))

// Output error into page with details hidden in a comment.
const formatError
  = err =>
    '<p>Unable to fetch blog posts at this time.</p><!-- ' + err + '-->'
