import { resolve, parse, format } from 'url';
import request from 'request';

export const getPosts
  = () =>
    promiseForRequest(
      configRequest(config, companyPostsUrl, 'GET')
    );

// ------------------------------------------------------------

// Urls.  We might consider moving these to a config file.
const rootUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/';
const postsUrl = resolve(rootUrl, 'posts');
const companyQuery = 'category=company';
const companyPostsUrl = format(Object.assign(parse(postsUrl), { query: companyQuery }));

// Request config. These should be injected into `promiseForRequest` from a config file.
const timeout = 5000; // msecs
const config = { timeout };

// ------------------------------------------------------------

const promiseForRequest
  = (config) =>
    new Promise(
      (resolve, reject) => request(config, resolveRequest(resolve, reject))
  );

const resolveRequest
  = (resolve, reject) => (err, resp, body) => {
    if (err) {
      reject(err);
    }
    else {
      resolve([ resp, body ]);
    }
  };

const configRequest
  = (config, url, method) =>
    Object.assign({}, config, { url, method });
