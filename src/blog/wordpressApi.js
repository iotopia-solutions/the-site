import { resolve, parse, format } from 'url'
import request from 'request'
import nodeToPromise from '../nodeToPromise'

const requestP = nodeToPromise(request)

// Fetches latest blog posts from the wordpress api.
export const getPosts
  = (count=20) =>
    requestP(createConfig(config, blogPostsUrl(count), 'GET'))
      .then(parseResponse)
      // .then(x => (console.log(x[0].body), x))

// Fetches a single blog post from the wordpress api.
export const getPost
  = id =>
    requestP(createConfig(config, blogPostUrl(id), 'GET'))
      .then(parseResponse)

// ------------------------------------------------------------

// Urls.  We might consider moving these to a config file.
const rootUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/'
const postsUrl = resolve(rootUrl, 'posts/')
const filterQueries = { category: 'company' }

const blogPostsUrl
  = number =>
    format(Object.assign(parse(postsUrl), { query: filterQueries }, { number }))

// Returns the endpoint url for a blog post, given its id.
const blogPostUrl
  = id => resolve(postsUrl, String(id))

// Request config.
// TODO: These should be injected into exported functions from a config file.
const timeout = 5000 // msecs
const config = { timeout }

// ------------------------------------------------------------

// Constructs a request config from a common config and specific url and method.
const createConfig
  = (common, url, method) =>
    Object.assign({}, common, { url, method })

const parseResponse
  = resp =>
    [ resp, JSON.parse(resp.body) ]
