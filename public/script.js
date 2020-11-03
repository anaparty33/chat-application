const socket=io('http://localhost:3000')

socket.on('chat-message',function(msg)
{
    console.log(msg)
})

const personName=prompt("Who is this chatting")
socket.emit('user-name',personName)
const msgFormElement=document.getElementById('send-message-form')
const inputMsg=document.getElementById('send-msg-input')
msgFormElement.addEventListener('submit',function(event)
{
    event.preventDefault()
    const sendmss=inputMsg.value
    socket.emit('chat-message-sent',sendmss) //send  msg to the server
    appendMessaga(`You:${sendmss}`)

})


const msgContainerElement=document.getElementById('message-container')

socket.on('user-sent-msg',function(incomingmsg)
{
    console.log(incomingmsg);
   
    appendMessaga(`${incomingmsg.name}:${incomingmsg.message} `)


})

socket.on('user-connected',(name)=>
{
    appendMessaga(name+" connected")
});
socket.on('user-disconected',(disconnecunser)=>
appendMessaga(`${disconnecunser} left`)
)

function appendMessaga(message)
{

    const msgpara=document.createElement("p");
    msgpara.innerText=message;
    msgContainerElement.append(msgpara)
}