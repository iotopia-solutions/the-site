// This is a composition plan for the service that handles requests to the
// site's index.
import { getPosts } from '../blog/wordpressApi'
import { renderToStaticMarkup } from 'react-dom/server'
import excerptView from '../blog/excerptView'
import compile from '../template/compile'
import requireText from '../requireText'
import teamView from '../team/teamView'
import {teamMembersObj} from '../team/teamMembers'
import {portfolioObj} from '../portfolio/portfolio'
import portfolioView from '../portfolio/portfolioView'


// Load this early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const indexViewHtml = requireTemplate('./index.html')

// TODO: Use a React Component to process last blog post and default text ("<p>no blogs</p>").

// Handles a GET request to the index endpoint.
export default
  ({ wordpress }) => {
    const get = getPosts(wordpress)
    const renderPage = compile(indexViewHtml)
    return (req, res) =>
      get(5)
        .then(extractPosts)
        // .then(x => (console.log(x), x))
        .then(transformToViewData)
        .then(renderViewData)
        .then(text => ({ blogPostExcerpts: text, teamMembers: transformTeam(teamMembersObj), projects: transformPortfolio(portfolioObj)}))
        .then(renderPage)
        .catch(formatError)
        .then(pageHtml => res.send(pageHtml))
  }

// ------------------------------------------------------------

// Extract the blog posts json data from the wordpress api response.
const extractPosts
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

const transformTeam 
  = (teamMembersObj) => {
    return renderToStaticMarkup(teamView(teamMembersObj))
  }

const transformPortfolio 
  = (portfolioObj) => {
    return renderToStaticMarkup(portfolioView(portfolioObj))
  }
