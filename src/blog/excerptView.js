import React from 'react'

// A React element that displays a single blog post excerpt.
export default (blogInfo) =>
    <div className={"blog-col" + (blogInfo.isLast ? ' last' : '')}>
      <div className="entry-img">
        <a href={"blog/" + blogInfo.ID}>
          <img src={blogInfo.featured_image} alt=""/>
        </a>
      </div>
      <div className="entry-box">
        <div className="entry-title">
          <h4><a href={"blog/" + blogInfo.ID}>{blogInfo.title}</a></h4>
        </div>
        <ul className="entry-meta">
          <li>by <a href={"blog/" + blogInfo.ID}>{blogInfo.author.name}</a></li>
          <li>
            <a href={"blog/" + blogInfo.ID}>{formatDate(toDate(blogInfo.date))}</a>
          </li>
        </ul>
        <div className="entry-content">
          <p dangerouslySetInnerHTML={{__html: blogInfo.excerpt}}></p>
          <a href={"blog/" + blogInfo.ID} className="read-more">Read More</a>
        </div>
      </div>
    </div>

// ------------------------------------------------------------

const toDate
  = string => new Date(string)

const formatDate
  = date => date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
