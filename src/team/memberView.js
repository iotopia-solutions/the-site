import React from 'react'
import {teamMembersObj} from './teamMembers'

// A React element that displays a team member

export default (member)  => 
  <div className="member-container">
    <div className="work-container">
     <a href={"/team/" + member}>
      <div className="member-img">
        <img src={teamMembersObj[member].memberImg} alt=""/>
      </div>
      </a>
      <div className="work-description">
        <h3><a href={"/team/" + member}>{teamMembersObj[member].memberFullName}</a></h3>
        <span><a href={"/team/" + member}>{teamMembersObj[member].memberRole}</a></span>
      </div>
    </div>
  </div>
