// Composition plan for configuration.
import
  { config as configEmail, validate as validateEmail, show as showEmail }
  from './configure/email'
import
  { config as configWeb, validate as validateWeb, show as showWeb }
  from './configure/webserver'
import
  { config as configWp, validate as validateWp, show as showWp }
  from './configure/wordpress'

export default
  env => ({
    email: validateEmail(configEmail(env)),
    webserver: validateWeb(configWeb(env)),
    wordpress: validateWp(configWp(env))
  })

export const show
  = ({ email, webserver, wordpress }) =>
    `{
      "email": ${showEmail(email)},
      "webserver": ${showWeb(webserver)},
      "wordpress": ${showWp(wordpress)}
    }`
