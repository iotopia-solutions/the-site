'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = undefined;

var _url = require('url');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fetches blog posts from wordpress api.
var getPosts = exports.getPosts = function getPosts() {
  return promiseForRequest(createConfig(config, blogPostsUrl, 'GET'));
};

// ------------------------------------------------------------

// Urls.  We might consider moving these to a config file.
var rootUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/';
var postsUrl = (0, _url.resolve)(rootUrl, 'posts');
var filterQueries = { category: 'company', number: 5 };
var blogPostsUrl = (0, _url.format)(Object.assign((0, _url.parse)(postsUrl), { query: filterQueries }));

// Request config. These should be injected into `promiseForRequest` from a config file.
var timeout = 5000; // msecs
var config = { timeout: timeout };

// ------------------------------------------------------------

// Creates a promise for a request.
// Could be useful for other http calls.
var promiseForRequest = function promiseForRequest(config) {
  return new Promise(function (resolve, reject) {
    return (0, _request2.default)(config, resolveRequest(resolve, reject));
  });
};

// Converts request's node-style callback to a Promise's constructor args.
var resolveRequest = function resolveRequest(resolve, reject) {
  return function (err, resp, body) {
    if (err) {
      reject(err);
    } else {
      resolve([resp, JSON.parse(body)]);
    }
  };
};

// Constructs a request config from a common config and specific url and method.
var createConfig = function createConfig(common, url, method) {
  return Object.assign({}, common, { url: url, method: method });
};
//# sourceMappingURL=wordpressApi.js.map
