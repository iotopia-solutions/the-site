import fs   from 'fs';

let pages = {
  index:  ((req, res) => {
    fs.readFile(__dirname + '/../../views/index.html', 'utf8', (err, text) => {
      res.send(text);
    })
  })
}

module.exports = pages;