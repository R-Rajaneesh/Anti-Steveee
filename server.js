const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Thanks for waking up Anti-steveee!')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("server running")});
}
module.exports = keepAlive;