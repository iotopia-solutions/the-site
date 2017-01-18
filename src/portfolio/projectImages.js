import React from 'react'

// A React element that displays all images for a project in a carousel

export default (projectImage)  => (
  <div id="owl-slider-one-img" className="owl-carousel owl-theme oh">
    { projectImage.map(image => (           
      <div className="item">
        <img src={image} className="mb-20"/>
      </div>))}
  </div> )