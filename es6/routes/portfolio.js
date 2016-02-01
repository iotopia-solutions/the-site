'use strict';

import express    from 'express';
import pages      from './pages';
import fs         from 'fs';
import data       from '../data/portfolio';

let router = express.Router();

let portfolio = {
	index: ((req, res, next) => {
    let name = req.params.name;
    if (name) {
      let portfolioDetail = data[name];
      res.render('portfolio', portfolioDetail);
    } else {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  }),
	detail: ((req, res) => {
    let name = req.params.name;
    let portfolioDetail = data[name];
    res.json(portfolioDetail);
	})
};

module.exports = portfolio;