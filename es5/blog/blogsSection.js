"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (blogInfo) {
  return _react2.default.createElement(
    "div",
    { className: "blog-col" },
    _react2.default.createElement(
      "div",
      { className: "entry-img" },
      _react2.default.createElement(
        "a",
        { href: "blog-single.html" },
        _react2.default.createElement("img", { src: blogInfo.featured_image, alt: "" })
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "entry-box" },
      _react2.default.createElement(
        "div",
        { className: "entry-title" },
        _react2.default.createElement(
          "h4",
          null,
          _react2.default.createElement(
            "a",
            { href: "blog-single.html" },
            blogInfo.title
          )
        )
      ),
      _react2.default.createElement(
        "ul",
        { className: "entry-meta" },
        _react2.default.createElement(
          "li",
          null,
          "by ",
          _react2.default.createElement(
            "a",
            { href: "blog-single" },
            blogInfo.author.name
          )
        ),
        _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(
            "a",
            { href: "#" },
            formatDate(toDate(blogInfo.date))
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "entry-content" },
        _react2.default.createElement("p", { dangerouslySetInnerHTML: { __html: blogInfo.excerpt } }),
        _react2.default.createElement(
          "a",
          { href: "blog-single.html", className: "read-more" },
          "Read More"
        )
      )
    )
  );
};

var toDate = function toDate(string) {
  return new Date(string);
};

var formatDate = function formatDate(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
//# sourceMappingURL=blogsSection.js.map
