'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pages = {
  index: function index(req, res) {
    _fs2.default.readFile(__dirname + '/../../views/index.html', 'utf8', function (err, text) {
      res.send(text);
    });
  },
  contact: function contact(req, res) {
    res.render('contact');
  }
};

module.exports = pages;
//# sourceMappingURL=pages.js.map
