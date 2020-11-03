const express = require('express');
const app=express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ejs=require('ejs')
app.set('view engine','ejs')
app.use(express.static('public'))
const users={}
io.on('connection',function(socket)
{
    console.log('new user');
    socket.emit('chat-message','hello world')
    socket.on('user-name',(name)=>
    {
        console.log(name)
        users[socket.id]=name;
        socket.broadcast.emit('user-connected',name)

    })
    socket.on('chat-message-sent',function(data)
    {
        console.log(data)//

        socket.broadcast.emit('user-sent-msg',{name:users[socket.id],message:data})
    })

    socket.on('disconnect',()=>
    {

        socket.broadcast.emit('user-disconected',users[socket.id])
        delete users[socket.id]
    })

})



app.get("/",function(req,res)
{

res.render('index');

})
app.listen('3300',function()
{
    
    // console.log("port 3300 is running")
})
server.listen('3000',function()
{
    console.log("server is running")
})