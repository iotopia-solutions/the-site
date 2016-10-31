'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _wordpressApi = require('../blog/wordpressApi');

var _server = require('react-dom/server');

var _blogsSection = require('../blog/blogsSection');

var _blogsSection2 = _interopRequireDefault(_blogsSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: read and process the template index file at load time.
var index = exports.index = function index(req, res) {
  return _fs2.default.readFile(__dirname + '/../../views/index.html', 'utf8', function (err, text) {
    // fail hard
    if (err) throw err;
    // render blog posts
    var parts = text.split('<!-- blogs-go-here -->');
    (0, _wordpressApi.getPosts)().then(extractPosts).then(function (posts) {
      return posts.map(
      // TODO: somehow get an aditional className, "last", onto last post
      function (post) {
        return (0, _server.renderToStaticMarkup)((0, _blogsSection2.default)(post));
      });
    }).then(function (sections) {
      return res.send(parts[0] + sections + parts[1]);
    })
    // TODO: handle more errors and log this, too.
    .catch(function (err) {
      return res.send('No blog posts found.' + err);
    });
  });
};

var extractPosts = function extractPosts(resp) {
  return JSON.parse(resp[0].body).posts;
};
//# sourceMappingURL=pages.js.map
