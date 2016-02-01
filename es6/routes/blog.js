'use strict';

import express    from 'express';
import request    from 'request';

let router = express.Router();

let blog = {
  index: ((req, res) => {
    let options = {
      uri: 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/posts?category=company',
      method: 'GET'
    }

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let blogs = JSON.parse(body);
        let posts = blogs.posts;
        let postArr = posts.map((post, idx) => {
          let tempObj = {};
          tempObj.excerpt =  post.excerpt;
          if(post["featured_image"]) {
            tempObj.img = post["featured_image"];
          }
          tempObj.date = new Date(post.date).toLocaleDateString();
          tempObj.title = post.title;
          tempObj.postUrl = "/blog/" + post.ID;
          tempObj.excerpt = post.excerpt;
          return tempObj;
        });
        res.render('blog', {blogBody: postArr});
      }
    })
  }),
  posts: ((req, res) => {
    let postId = req.params.id;
    console.log(postId);
    let options = {
      uri: 'https://public-api.wordpress.com/rest/v1.1/sites/innovatorylife.com/posts/' + postId,
      method: 'GET'
    }

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let blog = JSON.parse(body);

        let blogObj = {
          "featured_image": blog["featured_image"],
          date: new Date(blog.date).toLocaleDateString(),
          title: blog.title,
          author: blog.author.name,
          content: blog.content
        };

        res.render('blog-single', {blog: blogObj});
      }      
    })
  })
}

module.exports = blog;