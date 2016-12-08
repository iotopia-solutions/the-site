"use strict"
import express          from 'express'
import path             from 'path'
import favicon          from 'serve-favicon' // TODO: are we using this?
import logger           from 'morgan'
import cookieParser     from 'cookie-parser'
import bodyParser       from 'body-parser'
import router           from './router'
import
  configure, { show as showConfig }
  from './app/configure'

const config = configure(process.env)

console.log(`App started with configuration: ${showConfig(config)}`)

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../assets')))

app.use('/', router(config))

app.use((req, res, next) => {
  let err = new Error('Not Found: ' + req.url)
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.log(err, err.stack)
    res.status(err.status || 500)
    res.send(err.message + '\n' + JSON.stringify(err.stack))
  })
}

app.use((err, req, res, next) => {
  console.log(err, err.stack)
  res.status(err.status || 500)
  res.send(err.message)
})

const server = app.listen(config.webserver.port, config.webserver.host)
server.on(
  'listening',
  () => {
    console.log(`Express started ${JSON.stringify(server.address())}`)
  }
)

export default app
