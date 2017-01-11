// This is a composition plan for the service that handles requests to the
// site's team
import requireText from '../requireText'
import compile from '../template/compile'
import { renderToStaticMarkup} from 'react-dom/server'
import portfolioView from './portfolioView'
import {portfolioObj} from './portfolio'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const portfolioPageHtml = requireTemplate('./portfolioPage.html')
const projectPageHtml = requireTemplate('./projectPage.html')


// Handles a GET request
export const portfolio
  = () => {
    const renderPortfolio = compile(portfolioPageHtml)
    return (req, res) =>
      res.send(renderPortfolio({projects: transformProjects(portfolioObj)}))
  }

export const project
  = () => {
    const renderProject = compile(projectPageHtml)
    return (req, res) =>
      res.send(renderProject(transformToViewData(req.params.id)))
  }

  const transformToViewData
  = (id) => ({
    clientName: portfolioObj[id].clientName,
    category: portfolioObj[id].category,
    categoryFilter: portfolioObj[id].categoryFilter,
    projectTitle: portfolioObj[id].projectTitle,
    projectSubtitle: portfolioObj[id].projectSubtitle,
    technologies: portfolioObj[id].technologies,
    projectLink: portfolioObj[id].projectLink,
    projectImage: portfolioObj[id].projectImage,
    description: portfolioObj[id].description,
    problem: portfolioObj[id].details.problem,
    solution: portfolioObj[id].details.solution,
    projects: transformProjects(portfolioObj)
  })

  const transformProjects
    = (portfolioObj) => {
      return renderToStaticMarkup(portfolioView(portfolioObj))
    }