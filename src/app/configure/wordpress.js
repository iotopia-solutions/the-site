// Return a function that provides the default wordpress configuration
// with overrides from env vars.
export const config =
  timeout => 
    ({
      timeout: timeout || 5000 // msec
    })

export const validate =
  assert => cfg => {
    assert(typeof cfg === 'object', `Invalid wp config: ${ typeof cfg }.`)
    assert(
      !isNaN(cfg.timeout) && cfg.timeout > 0,
      `Invalid wordpress timeout: ${JSON.stringify(cfg.timeout)}`
    )
    return cfg
  }
