'use strict'

const TwigBot = require('./TwigBot')
const MessageScheduler = require('./MessageScheduler')

const koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = koa()
const port = process.env.PORT || 3000
const token = process.env.SLACK_TOKEN

app.use(bodyParser())

app.use(function * respond () {
  this.body = { hello: 'world!' }
  console.log(this.request.body)
})

app.on('error', err => console.error('server error', err))
app.listen(port)
console.log(`Listening on port ${port}`)

let twigBot = new TwigBot(token)
let messageScheduler = new MessageScheduler(twigBot)
messageScheduler.run()
