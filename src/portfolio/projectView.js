import React from 'react'
import { portfolioObj } from './portfolio'

// A React element that displays a portfolio item

export default (project)  => 
  <div className={"project-container work-item mockups " + portfolioObj[project].category}>
    <div className="work-container">
      <div className="work-img">
        <img src={portfolioObj[project].projectImage[0]} alt=""/>
        <div className="portfolio-overlay">
          <div className="project-icons">
            <a href={"/portfolio/" + project}>
              <h4 className="title">{portfolioObj[project].projectTitle}</h4>
              <p className="subtitle">{portfolioObj[project].projectSubtitle}</p>
            </a>
          </div>
        </div>
      </div>
      <div className="work-description">
        <h3><a href={"/portfolio/" + project}>{portfolioObj[project].clientName}</a></h3>
        <span>{portfolioObj[project].category}</span>
      </div>
    </div> 
  </div>