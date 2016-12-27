import React from 'react'
import teamMemberView from './memberView'

// A React element that displays all team members

export default (teamMembersObj, id, styles)  => 
  (
    <div id={id}>
    {Object.keys(teamMembersObj).map(member => (teamMemberView(member, styles)))}
    </div>
  )