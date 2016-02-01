'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var blog = {
  index: function index(req, res) {
    var options = {
      uri: 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/posts?category=company',
      method: 'GET'
    };

    (0, _request2.default)(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var blogs = JSON.parse(body);
        var posts = blogs.posts;
        var postArr = posts.map(function (post, idx) {
          var tempObj = {};
          tempObj.excerpt = post.excerpt;
          if (post["featured_image"]) {
            tempObj.img = post["featured_image"];
          }
          tempObj.date = new Date(post.date).toLocaleDateString();
          tempObj.title = post.title;
          tempObj.postUrl = "/blog/" + post.ID;
          tempObj.excerpt = post.excerpt;
          return tempObj;
        });
        res.render('blog', { blogBody: postArr });
      }
    });
  },
  posts: function posts(req, res) {
    var postId = req.params.id;
    console.log(postId);
    var options = {
      uri: 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/posts/' + postId,
      method: 'GET'
    };

    (0, _request2.default)(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var _blog = JSON.parse(body);

        var blogObj = {
          "featured_image": _blog["featured_image"],
          date: new Date(_blog.date).toLocaleDateString(),
          title: _blog.title,
          author: _blog.author.name,
          content: _blog.content
        };

        res.render('blog-single', { blog: blogObj });
      }
    });
  }
};

module.exports = blog;
//# sourceMappingURL=blog.js.map
