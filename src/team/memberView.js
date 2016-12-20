import React from 'react'
// A React element that displays all team members

export default (TeamMembersObj)  => 
  (
   <div className="col-md-4 col-xs-6 work-item web-design mockups">
      <div className="work-container">
       <a href="/team">
        <div className="work-img">
          <img src="img/project_1.jpg" alt=""/>
        </div>
        </a>
        <div className="work-description">
          <h3><a href="#">{TeamMembersObj["john"].memberBio}</a></h3>
          <span><a href="#">{TeamMembersObj["john"].memberFullName}</a></span>
        </div>
      </div>
    </div>
  )