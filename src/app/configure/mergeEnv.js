// Creates a function that merges env vars into a config object.
export default
  (cfg, overrides) => env =>
    Object.keys(cfg).reduce(
      // Caution: mutation!
      (result, key) => {
        result[key] = key in overrides && overrides[key] in env
          ? env[overrides[key]]
          : cfg[key]
        return result
      },
      {}
    )
  
