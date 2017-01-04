// Returns a function that provides the default email configuration
// with overrides from env vars.
export const config = 
  (username, password) => 
    Object.create(
      null,
      {
        service: { value: 'gmail', enumerable: true },
        user: { value: username || defaultUsername, enumerable: true }, 
        // protect password from accidental display
        pass: { value: password, enumerable: false }, 
        // display some info about password, instead
        hasPass: { get: function () { return !!this.pass }, enumerable: true }
      }
    )

// Create a validator function for email config.
export const validator =
  assert => cfg => {
    assert(typeof cfg === 'object', `Invalid email config: ${ typeof cfg }.`)
    assert(cfg.pass, `Invalid email password.`)
    assert(cfg.user, `Invalid email user name: ${JSON.stringify(cfg.user)}`)
    assert(cfg.service, `Invalid email service: ${JSON.stringify(cfg.service)}`)
    return cfg
  }

const defaultUsername = 'hello@iotopia-solutions.com'