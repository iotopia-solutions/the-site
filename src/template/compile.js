// Take a text string containing tokens (of type `${name}`) and return
// a function that will replace the tokens with the properties of a given
// object.  If we need to get much more sophisticated, we should
// probably use mustache or similar.
// TODO: allow dev to specify a format for each token?
// TODO: Consider throwing, rather than coercing, if passed a non-string.
export default
    template => mergeParts(partition(String(template)))

// ------------------------------------------------------------

// Given a set of compiled template parts, return a function that merges
// the parts, replacing token parts with properties of the `props` argument.
// Note: this is the function that is the most important to performance, but
// I'm leaving it in this ultra-simple form unless there's a requirement
// for more speed.
const mergeParts
    = parts => props => parts.map(partToText(props)).join('')

// Given an object of properties, return a function to convert a template part
// (text run or token) to text.
const partToText
    = props => part => part.text ? part.text : props[part.propName]

// Find template parts (text runs and tokens) in a template.
const partition
    = template => nextToken(findToken(findTokensRx()), template)

// Recursively find the next token in a text string.
const nextToken
    = (findToken, text, start=0, parts=[]) => {
        const [ name, pos, next ] = findToken(text)
        return name
            ? nextToken(
                findToken, text, next,
                parts.concat([ textPart(text, start, pos), tokenPart(name) ])
            )
            : parts.concat(textPart(text, start))
    }

// Given a regular expression, return a function that accepts a text string
// and returns a triple of token information:
// [name-of-token, position-of-token, position-to-start-next-search].
// If no token is found, an "empty" triple is returned.
const findToken
    = rx => text => {
        const r = rx.exec(text)
        return r ? [ r[1], r.index, rx.lastIndex ] : []
    }

// RegExp to find simple `${name}` tokens.
// We create a new RegExp each time as a "good habit".  If this code were
// async and we reused the same RegExp object for multiple templates,
// we'd suffer from hard-to-find *mutable state* bugs!
const findTokensRx
    = () => /\$\{([^}]*)\}/g

// Create a text part from a slice of a template.
const textPart
    = (text, start, end) => ({ text: text.slice(start, end) })

// Create a token part from a token in a template.
const tokenPart
    = token => ({ propName: token.trim() })
