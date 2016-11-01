import fs from 'fs';
import { getPosts } from '../blog/wordpressApi';
import { renderToStaticMarkup } from 'react-dom/server';
import blogsSection from '../blog/blogsSection';

// TODO: read and process the template index file at load time.
// TODO: Use a React Component to process last blog post and default text ("<p>no blogs</p>").

export const index
  = (req, res) =>
    fs.readFile(
      __dirname + '/../../views/index.html', 'utf8',
      (err, text) => {
        // fail hard if we can't read index.html.
        if (err) throw err;
        // render blog posts from WP data
        getPosts()
          .then(extractPosts)
          .then(addPresentationMeta)
          .then(convertPostsToHtml)
          // Output error into page with details hidden in a comment.
          .catch(err => '<p>Unable to fetch blog posts at this time.</p><!-- ' + err + '-->')
          .then(insertHtml('<!-- blogs-go-here -->', text))
          .then(pageHtml => res.send(pageHtml));
      }
    );

// ------------------------------------------------------------

// Extract the blog posts json data from the wordpress api response.
const extractPosts
  = ([ resp, body ]) => body.posts;

// Add metadata for processing the blog post into html.
const addPresentationMeta
  = posts => {
    if (posts && posts.length > 0) {
      posts[posts.length - 1].isLast = true;
    }
    return posts;
  };

// Convert the posts json to html.
const convertPostsToHtml
  = posts => {
    if (posts && posts.length > 0) {
      return posts.reduce(
        (html, post) => html + renderToStaticMarkup(blogsSection(post)),
        ''
      );
    }
    else {
      return '<p>No blog posts found.</p>';
    }
  };

// Insert the blog html into the page html.
// Splitting the page at a comment is primitive, but works for now.
const insertHtml
  = (token, text) => html => text.replace(token, html);
