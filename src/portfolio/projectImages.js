import React from 'react'

// A React element that displays all portfolio items

export default (projectImage)  => (
  <div id="owl-slider-one-img" className="owl-carousel owl-theme oh">
    { projectImage.map(image => (           
      <div className="item">
        <img src={image} />
      </div>))}
  </div> )