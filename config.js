let config = {endpoint: 'http:/locahost:5000/skyfall'}

const ifaces = require('os').networkInterfaces()
const dev_ip = '192.168.11.9'

if(Object.keys(ifaces).length>1){
  if(ifaces[Object.keys(ifaces)[1]][0].address !== dev_ip){
    config={endpoint: 'http://young-ravine-19261.herokuapp.com/skyfall'}
  }
}

export default config
