'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _wordpressApi = require('../blog/wordpressApi');

var _server = require('react-dom/server');

var _blogsSection = require('../blog/blogsSection');

var _blogsSection2 = _interopRequireDefault(_blogsSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: read and process the template index file at load time.
// TODO: Use a React Component to process last blog post and default text ("<p>no blogs</p>").

var index = exports.index = function index(req, res) {
  return _fs2.default.readFile(__dirname + '/../../views/index.html', 'utf8', function (err, text) {
    // fail hard if we can't read index.html.
    if (err) throw err;
    // render blog posts from WP data
    (0, _wordpressApi.getPosts)().then(extractPosts).then(addPresentationMeta).then(convertPostsToHtml)
    // Output error into page with details hidden in a comment.
    .catch(function (err) {
      return '<p>Unable to fetch blog posts at this time.</p><!-- ' + err + '-->';
    }).then(insertHtml('<!-- blogs-go-here -->', text)).then(function (pageHtml) {
      return res.send(pageHtml);
    });
  });
};

// ------------------------------------------------------------

// Extract the blog posts json data from the wordpress api response.
var extractPosts = function extractPosts(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      resp = _ref2[0],
      body = _ref2[1];

  return body.posts;
};

// Add metadata for processing the blog post into html.
var addPresentationMeta = function addPresentationMeta(posts) {
  if (posts && posts.length > 0) {
    posts[posts.length - 1].isLast = true;
  }
  return posts;
};

// Convert the posts json to html.
var convertPostsToHtml = function convertPostsToHtml(posts) {
  if (posts && posts.length > 0) {
    return posts.reduce(function (html, post) {
      return html + (0, _server.renderToStaticMarkup)((0, _blogsSection2.default)(post));
    }, '');
  } else {
    return '<p>No blog posts found.</p>';
  }
};

// Insert the blog html into the page html.
// Splitting the page at a comment is primitive, but works for now.
var insertHtml = function insertHtml(token, text) {
  return function (html) {
    return text.replace(token, html);
  };
};
//# sourceMappingURL=pages.js.map
