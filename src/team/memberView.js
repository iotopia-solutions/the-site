import React from 'react'
import teamMembersObj from './teamMembers'
// A React element that displays all team members

export default (member)  => 
  (
    <div className="col-md-4 col-xs-6 work-item web-design mockups">
      <div className="work-container">
       <a href={"/team/" + member}>
        <div className="work-img">
          <img src="img/project_1.jpg" alt=""/>
        </div>
        </a>
        <div className="work-description">
          <h3><a href={"/team/" + member}>{teamMembersObj[member].memberFullName}</a></h3>
          <span><a href={"/team/" + member}>{teamMembersObj[member].memberRole}</a></span>
        </div>
      </div>
    </div>
  )
