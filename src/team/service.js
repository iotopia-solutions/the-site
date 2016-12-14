// This is a composition plan for the service that handles requests to the
// site's team
import requireText from '../requireText'

// Load these early and sync, just like module dependencies.
const requireTemplate = requireText(__dirname)
const teamPageHtml = requireTemplate('./teamPage.html')

// Handles a GET request
export default
  () => {
    return (req, res) =>
      res.send(teamPageHtml)
  }