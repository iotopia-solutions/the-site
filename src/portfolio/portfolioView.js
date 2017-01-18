import React from 'react'
import projectView from './projectView'

// A React element that displays all portfolio items

export default (portfolioObj)  => 
  <div className="works-container">
    {Object.keys(portfolioObj).map(project => (projectView(project)))}
  </div>