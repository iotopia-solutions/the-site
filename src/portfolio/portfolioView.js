import React from 'react'
import projectView from './projectView'

// A React element that displays all portfolio items

export default (portfolioObj)  => 
  <div>
    {Object.keys(portfolioObj).map(project => (projectView(project)))}
  </div>