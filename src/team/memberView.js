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
      <a href={"/team/" + member}>
        <h3>{teamMembersObj[member].memberFullName}</h3>
        <span>{teamMembersObj[member].memberRole}</span>
      </a>
      </div>
    </div>
  </div>
