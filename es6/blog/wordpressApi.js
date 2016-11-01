import { resolve, parse, format } from 'url';
import request from 'request';

// Fetches blog posts from wordpress api.
export const getPosts
  = () =>
    promiseForRequest(
      createConfig(config, blogPostsUrl, 'GET')
    );

// ------------------------------------------------------------

// Urls.  We might consider moving these to a config file.
const rootUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/';
const postsUrl = resolve(rootUrl, 'posts');
const filterQueries = { category: 'company', number: 5 };
const blogPostsUrl
  = format(Object.assign(parse(postsUrl), { query: filterQueries }));

// Request config. These should be injected into `promiseForRequest` from a config file.
const timeout = 5000; // msecs
const config = { timeout };

// ------------------------------------------------------------

// Creates a promise for a request.
// Could be useful for other http calls.
const promiseForRequest
  = (config) =>
    new Promise(
      (resolve, reject) => request(config, resolveRequest(resolve, reject))
  );

// Converts request's node-style callback to a Promise's constructor args.
const resolveRequest
  = (resolve, reject) => (err, resp, body) => {
    if (err) {
      reject(err);
    }
    else {
      resolve([ resp, JSON.parse(body) ]);
    }
  };

// Constructs a request config from a common config and specific url and method.
const createConfig
  = (common, url, method) =>
    Object.assign({}, common, { url, method });
