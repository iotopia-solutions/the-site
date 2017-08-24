import React from 'react'
import courseView from './courseView'

// A React element that displays all training courses

export default (coursesObj)  => 
  <div className="works-container">
    {Object.keys(coursesObj).map(course => (courseView(course)))}
  </div>
