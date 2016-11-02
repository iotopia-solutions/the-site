"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _expressReactViews = require('express-react-views');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//using let
var app = (0, _express2.default)();

app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'jsx');
app.engine('jsx', (0, _expressReactViews.createEngine)());

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '../assets')));

app.use('/', _index2.default);
// app.use('/portfolio/:name', routes);
// app.use('/email', routes);
// app.use('/blog', routes);
// app.use('/blog/:id', routes);

// using arrow syntax
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server_port = process.env.PORT || 5001;
var server_host = '0.0.0.0';

app.set('port', server_port);
app.set('host', server_host);

var server = app.listen(app.get('port'), app.get('host'), function () {
  return console.log('Express is listening on port ' + server.address().port);
});

exports.default = app;
//# sourceMappingURL=app.js.map
