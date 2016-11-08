// This is a composition plan for the service that handles requests to the
// site's blog posts.
import { getPost, getPosts } from '../blog/wordpressApi'
import compile from '../template/compile'
import requireText from '../requireText'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const singlePageHtml = requireTemplate('./singlePage.html')
const singlePostHtml = requireTemplate('./singlePost.html')
const multiPageHtml = requireTemplate('./multiPage.html')
const multiPostHtml = requireTemplate('./multiPost.html')

// Handles a GET request to single blog post endpoint.
// TODO: containing page needs to be handled separately from blog post since it has different error handling
export const single
  = ({ wordpress }) => {
    const get = getPost(wordpress)
    const renderPage = compile(singlePageHtml)
    const renderPost = compile(singlePostHtml)
    return (req, res) =>
      get(extractId(req))
        .then(extractPost)
        .then(transformToViewData)
        .then(transformToPageData(renderPost))
        .catch(handleError)
        .then(renderPage)
        .then(pageHtml => res.send(pageHtml))
  }

export const multi
  = ({ wordpress }) => {
    const get = getPosts(wordpress)
    const renderPage = compile(multiPageHtml)
    const renderPost = compile(multiPostHtml)
    return (req, res) =>
      get()
        .then(extractPosts)
        .then(map(transformToViewData))
        .then(map(transformToPageData(renderPost)))
        .then(joinBlogs)
        .catch(handleError)
        .then(renderPage)
        .then(pageHtml => res.send(pageHtml))
  }

// ------------------------------------------------------------

// Extract the id from the request.
const extractId
  = req =>
    req.params.id

// Extract the blog posts json data from the wordpress api response.
const extractPost
  = ([ resp, body ]) => body

// Extract the blog posts json data from the wordpress api response.
const extractPosts
  = ([ resp, body ]) => body.posts

const transformToViewData
  = ({ ID, title, author, date, content, excerpt, featured_image }) =>
    ({
      id: ID,
      title,
      author: author.name,
      date: formatDate(toDate(date)),
      content,
      excerpt,
      featuredImage: featured_image
    })

const transformToPageData
  = renderPost => data =>
    ({
      title: data.title,
      blogPost: renderPost(data)
    })

const joinBlogs
  = data =>
    ({
      blogPosts: data && data.length > 0
        ? data.reduce((html, single) => html + single.blogPost, '')
        : '<p>No blog posts found.</p>'
    })

const handleError
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

const map
  = func => array => array.map(func)
