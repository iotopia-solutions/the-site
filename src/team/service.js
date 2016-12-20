// This is a composition plan for the service that handles requests to the
// site's team
import requireText from '../requireText'
import compile from '../template/compile'
import TeamMembersObj from './teamMembers'
import testFunction from './memberView'
import { renderToStaticMarkup } from 'react-dom/server'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const teamPageHtml = requireTemplate('./teamPage.html')
const memberPageHtml = requireTemplate('./memberPage.html')

// Handles a GET request
// export const team
//   = () => {
//     return (req, res) =>
//       res.send(teamPageHtml)
//   }

export const team
  = () => {
    const renderTeam = compile(teamPageHtml)
    return (req, res) =>
      res.send(renderTeam(transformTeam(TeamMembersObj)))
  }

export const member
  = () => {
    const render = compile(memberPageHtml)
    return (req, res) => {
      res.send(render(transformToViewData(req.params.id)))
    }
  }

const transformToViewData
  = (id) => ({
    memberFullName: TeamMembersObj[id].memberFullName,
    memberBio: TeamMembersObj[id].memberBio
  })

const transformTeam 
  = (TeamMembersObj) => ({
    teamMembers: renderToStaticMarkup(testFunction(TeamMembersObj))
    })