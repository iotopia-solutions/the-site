import React from 'react'
import {coursesObj} from './courses'

// A React element that displays a course

export default (course)  => 
  <div className="project-container work-item mockups">
    <a href={"/training/" + course}>
      <div className="work-img">
        <img src={coursesObj[course].courseImg} alt="[{coursesObj[course].courseFullName}]"/>
      </div>
    </a>
    <a href={"/training/" + course}>
      <h3>{coursesObj[course].courseFullName}</h3>
      <span>{coursesObj[course].courseBlurb}</span>
    </a>
  </div>
