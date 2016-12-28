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

// Handles a GET request
export const portfolio
  = () => {
    const renderPortfolio = compile(portfolioPageHtml)
    return (req, res) =>
      res.send(renderPortfolio({projects: transformProjects(portfolioObj)}))
  }

  const transformProjects
    = (portfolioObj) => {
      return renderToStaticMarkup(portfolioView(portfolioObj))
    }