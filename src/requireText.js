import { readFileSync } from 'fs'
import { join } from 'path'

// Loads a text file that is relative to the current module.
// It'd be nice to turn this into a node `require` extension.
export default
  dir => relName =>
    readFileSync(join(dir, relName), 'utf8')
