import mergeEnv from './mergeEnv'

// Returns a function that provides the default webserver configuration
// with overrides from env vars.
export const config
  = mergeEnv(
    {
      port: 5001,
      host: '0.0.0.0'
    },
    { port: 'PORT', host: 'HOST' }
  )

// TODO: validate web server configuration.
export const validate
  = cfg => cfg

export const show
  = cfg =>
    JSON.stringify(cfg)
