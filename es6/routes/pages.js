import fs from 'fs';
import { getPosts } from '../blog/wordpressApi';
import { renderToStaticMarkup } from 'react-dom/server';
import blogsSection from '../blog/blogsSection';

// TODO: read and process the template index file at load time.
export const index
  = (req, res) =>
    fs.readFile(
      __dirname + '/../../views/index.html', 'utf8',
      (err, text) => {
        // fail hard
        if (err) throw err;
        // render blog posts
        const parts = text.split('<!-- blogs-go-here -->');
        getPosts()
          .then(extractPosts)
          .then(posts => posts.map(
            // TODO: somehow get an aditional className, "last", onto last post
            post => renderToStaticMarkup(blogsSection(post))
          ))
          .then(sections => res.send(parts[0] + sections + parts[1]))
          // TODO: handle more errors and log this, too.
          .catch(err => res.send('No blog posts found.' + err));
      }
    );

const extractPosts
  = resp => JSON.parse(resp[0].body).posts;
