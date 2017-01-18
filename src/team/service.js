// This is a composition plan for the service that handles requests to the
// site's team
import requireText from '../requireText'
import compile from '../template/compile'
import {teamMembersObj} from './teamMembers'
import teamView from './teamView'
import { renderToStaticMarkup} from 'react-dom/server'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const teamPageHtml = requireTemplate('./teamPage.html')
const memberPageHtml = requireTemplate('./memberPage.html')

// Handles a GET request
export const team
  = () => {
    const renderTeam = compile(teamPageHtml)
    return (req, res) =>
      res.send(renderTeam({teamMembers: transformTeam(teamMembersObj)}))
  }

export const member
  = () => {
    const render = compile(memberPageHtml)
    return (req, res) => {
      res.send(render(transformToViewData(req.params.id)))
    }
  }

//TO-DO: create a better way to handle this data---esp for fields where data may not exist (maybe a React element)
const transformToViewData
  = (id) => ({
    memberFullName: teamMembersObj[id].memberFullName,
    memberRole: teamMembersObj[id].memberRole,
    memberBio: teamMembersObj[id].memberBio,
    memberImg: teamMembersObj[id].memberImg,
    linkedInLink: teamMembersObj[id].linkedInLink,
    githubLink: teamMembersObj[id].githubLink,
    githubLinkShow: teamMembersObj[id].githubLink ? "show" : "hide"
  })

//Render React element for team members section
const transformTeam 
  = (teamMembersObj) => {
      return renderToStaticMarkup(teamView(teamMembersObj))
    }