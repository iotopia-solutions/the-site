'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = undefined;

var _url = require('url');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPosts = exports.getPosts = function getPosts() {
  return promiseForRequest(configRequest(config, companyPostsUrl, 'GET'));
};

// ------------------------------------------------------------

// Urls.  We might consider moving these to a config file.
var rootUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/';
var postsUrl = (0, _url.resolve)(rootUrl, 'posts');
var companyQuery = 'category=company';
var companyPostsUrl = (0, _url.format)(Object.assign((0, _url.parse)(postsUrl), { query: companyQuery }));

// Request config. These should be injected into `promiseForRequest` from a config file.
var timeout = 5000; // msecs
var config = { timeout: timeout };

// ------------------------------------------------------------

var promiseForRequest = function promiseForRequest(config) {
  return new Promise(function (resolve, reject) {
    return (0, _request2.default)(config, resolveRequest(resolve, reject));
  });
};

var resolveRequest = function resolveRequest(resolve, reject) {
  return function (err, resp, body) {
    if (err) {
      reject(err);
    } else {
      resolve([resp, body]);
    }
  };
};

var configRequest = function configRequest(config, url, method) {
  return Object.assign({}, config, { url: url, method: method });
};
//# sourceMappingURL=wordpressApi.js.map
