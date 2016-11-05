// This is a composition plan for the service that handles requests to the
// site's blog posts.
import { getPost } from '../blog/wordpressApi'
import compile from '../template/compile';
import { readFileSync } from 'fs';
import { join } from 'path';

// Handles a GET request to single blog post endpoint.
// TODO: containing page needs to be handled separately from blog post since it has different error handling
export default
  config => {
    const renderPage = compilePage(config)
    const renderPost = compilePost(config)
    return (req, res) =>
    getPost(extractId(req))
      .then(extractPost)
      .then(transformToViewData)
      .then(transformToPageData(renderPost))
      .catch(formatError)
      .then(renderPage)
      .then(pageHtml => res.send(pageHtml))
  }

// ------------------------------------------------------------

const compilePage
  = config => {
    // TODO: refactor app so this can be async.
    const pageHtml = readFileSync(join(__dirname, 'singlePage.html'), 'utf8')
    return compile(pageHtml)
  }

const compilePost
  = config => {
    // TODO: refactor app so this can be async.
    const viewHtml = readFileSync(join(__dirname, 'singlePost.html'), 'utf8')
    return compile(viewHtml)
  }

// Extract the id from the request.
const extractId
  = req =>
    req.params.id

// Extract the blog posts json data from the wordpress api response.
const extractPost
  = ([ resp, body ]) => body

const transformToViewData
  = ({ ID, title, author, date, content }) =>
    ({
      id: ID,
      title,
      author: author.name,
      date: formatDate(toDate(date)),
      content
    })

const transformToPageData
  = renderPost => data =>
  ({
    title: data.title,
    blogPost: renderPost(data)
  })

// Output error into page with details hidden in a comment.
// TODO: reuse this?
const formatError
  = err =>
    ({
      title: 'A problem occurred.',
      blogPost: '<p>Unable to fetch blog post at this time.</p><!-- ' + err + '-->'
    })

// TODO: reuse these
const toDate
  = string => new Date(string)

const formatDate
  = date => date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
