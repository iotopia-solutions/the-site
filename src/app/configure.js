// Composition plan for configuration.
import
  { config as configEmail, validator as emailValidator }
  from './configure/email'
import
  { config as configWeb, validator as webValidator }
  from './configure/webserver'
import
  { config as configWp, validate as wpValidator }
  from './configure/wordpress'

export default
  env => 
    ({
      email: configEmail(env.EMAIL_USER, env.EMAIL_PASS),
      webserver: configWeb(env.PORT, env.HOST),
      wordpress: configWp(env.WP_TIMEOUT)
    })

export const validator =
  assert => {
    const validateEmail = emailValidator(assert)
    const validateWeb = webValidator(assert)
    const validateWp = wpValidator(assert)
    return cfg => {
      validateEmail(cfg.email)
      validateWeb(cfg.webserver)
      validateWp(cfg.wordpress)
      return cfg
    }
  }