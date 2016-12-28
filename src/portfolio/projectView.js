import React from 'react'
import { portfolioObj } from './portfolio'

// A React element that displays a portfolio item

export default (project)  => 
  <div className={"col-md-4 col-xs-6 work-item mockups " + portfolioObj[project].category}>
    <div className="work-container">
      <div className="work-img">
        <img src="img/project_1.jpg" alt=""/>
        <div className="portfolio-overlay">
          <div className="project-icons">
            <a href="img/project_1_big.jpg" className="lightbox-gallery" title="Poster Mockup"><i className="fa fa-search"></i></a>
            <a href="portfolio-single.html" className="project-icon"><i className="fa fa-link"></i></a>
        </div>
        </div>
      </div>
      <div className="work-description">
        <h3><a href={"/portfolio/" + project.toLowerCase().replace(/\s+/g, '')}>{project}</a></h3>
        <span><a href="#">{portfolioObj[project].category}</a></span>
      </div>
    </div> 
  </div>