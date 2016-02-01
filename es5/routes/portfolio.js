'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pages = require('./pages');

var _pages2 = _interopRequireDefault(_pages);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _portfolio = require('../data/portfolio');

var _portfolio2 = _interopRequireDefault(_portfolio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var portfolio = {
  index: function index(req, res, next) {
    var name = req.params.name;
    if (name) {
      var portfolioDetail = _portfolio2.default[name];
      res.render('portfolio', portfolioDetail);
    } else {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  },
  detail: function detail(req, res) {
    var name = req.params.name;
    var portfolioDetail = _portfolio2.default[name];
    res.json(portfolioDetail);
  }
};

module.exports = portfolio;
//# sourceMappingURL=portfolio.js.map
