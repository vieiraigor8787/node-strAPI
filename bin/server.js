const app = require('../src/app')

const port = normalizePort(process.env.PORT || '3000')
const debug = require('debug')

app.listen(port)
app.on('listening', onListening)
//no caso de rodar no Azure ou outro servidor..
function normalizePort(val) {
    //converto um valor p/ um inteiro
    const port = parseInt(val, 10)
    
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

function onListening() {
    const addr = server.address()
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr : 'port ' + addr.port
    debug('listening on ' + bind)
}