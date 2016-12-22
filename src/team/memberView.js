import React from 'react'
// A React element that displays all team members

export default (teamMembersObj)  => 
  (
   <div className="col-md-4 col-xs-6 work-item web-design mockups">
      <div className="work-container">
       <a href="/team/john">
        <div className="work-img">
          <img src="img/project_1.jpg" alt=""/>
        </div>
        </a>
        <div className="work-description">
          <h3><a href="/team/john">{teamMembersObj["john"].memberFullName}</a></h3>
          <span><a href="/team/john">{teamMembersObj["john"].memberRole}</a></span>
        </div>
      </div>
    </div>
  )