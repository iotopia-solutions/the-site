// This is a composition plan for the service that handles requests to the
// site's team
import requireText from '../requireText'
import compile from '../template/compile'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const portfolioPageHtml = requireTemplate('./portfolioPage.html')

// Handles a GET request
export const portfolio
  = () => {
    return (req, res) =>
      res.send(portfolioPageHtml)
  }