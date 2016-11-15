import mergeEnv from './mergeEnv'

// Returns a function that provides the default wordpress configuration
// with overrides from env vars.
export const config
  = mergeEnv(
    {
      timeout: 5000 // msec
    },
    { timeout: 'WORDPRESS_TIMEOUT' }
  )

export const validate
  = cfg => {
    if (isNaN(cfg.timeout) || cfg.timeout < 0) {
      throw new Error(`Invalid wordpress timeout: ${JSON.stringify(cfg.timeout)}`)
    }
    return cfg
  }

export const show
  = cfg =>
    JSON.stringify(cfg)
