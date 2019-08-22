const server = require('./server')

const port = process.env.PORT ? process.env.PORT : 4000

server.listen(port, () => console.log(`Running on port ${port}`))
