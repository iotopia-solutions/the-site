// Returns a function that provides the default webserver configuration
// with overrides from env vars.
export const config =
  (port, host) => 
    ({
      port: port || 5001,
      host: host || '0.0.0.0'
    })

// Createa validator for web server configuration.
export const validator =
  assert => cfg => {
    assert(typeof cfg === 'object', `Invalid web config: ${ typeof cfg }.`)
    assert(
      !isNaN(cfg.port) && cfg.port > 0, 
      `Invalid port: ${JSON.stringify(cfg.port)}`)
    assert(cfg.host, `Invalid host: ${JSON.stringify(cfg.host)}`)
    return cfg
  }
