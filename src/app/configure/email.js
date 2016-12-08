import mergeEnv from './mergeEnv'

// Returns a function that provides the default email configuration
// with overrides from env vars.
export const config
  = mergeEnv(
    {
      service: 'gmail',
      user: 'hello@iotopia-solutions.com',
      pass: '' // must be provided as env var
    },
    { user: 'EMAIL_USER', pass: 'EMAIL_PASS' }
  )

export const validate
  = cfg => {
    if (!cfg.pass) {
      throw new Error(`Invalid email password: ${JSON.stringify(cfg.pass)}`)
    }
    // TODO: validate email address has correct format
    if (!cfg.user) {
      throw new Error(`Invalid email user name: ${JSON.stringify(cfg.user)}`)
    }
    return cfg
  }

export const show
  = ({ service, user }) =>
    JSON.stringify({ service, user, pass: '(hidden)' })
