import React from 'react'
import teamMemberView from './memberView'

// A React element that displays all team members

export default (teamMembersObj, styles)  => 
  <div className="team-container">
    {Object.keys(teamMembersObj).map(member => (teamMemberView(member, styles)))}
  </div>