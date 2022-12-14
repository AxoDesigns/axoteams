let stompClient
let username
connect();
let docName = document.querySelector('#doc-name')
let groupName = document.querySelector('#group-name');
groupName.innerText = docName.innerText;
 const header = document.querySelector('header');
  const paintCanvas = document.querySelector( '#js-paint' );
  const tools = document.querySelector('.tools');
  const context = paintCanvas.getContext( '2d' );
  const paintCanvas1 = document.querySelector( '#js' );
  const context1 = paintCanvas1.getContext( '2d' );
  const lineWidthRange = document.querySelector( '.js-line-range' );
  const lineWidthLabel = document.querySelector( '.js-range-value' );
  let main = document.querySelector('.main');
  let contextNombres = {}
  const colorPicker = document.querySelector( '.js-color-picker');

function connect(event) {
    username = document.querySelector('#username').innerText.trim();
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}
function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
}
function onError(error) {
    console.log(error);
}
function sendImage(event) {
    let imageContent = paintCanvas.toDataURL()
    if(imageContent && stompClient) {
                    const chatMessage = {
                    sender: username,
                    content: imageContent,
                    type: 'IMAGE',
                    time: new Date().toLocaleTimeString(),
                    imagen: imageContent
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
}
function sendPosition(event) {
    if(stompClient) {
                    const chatMessage = {
                    sender: username,
                    content:'',
                    type: 'POSITION',
                    time: new Date().toLocaleTimeString(),
                    x: event.offsetX,
                    y: event.offsetY,
                    size: lineWidthRange.value,
                    color: colorPicker.value
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
}
function sendMessage(event) {
    var messageContent = document.querySelector('#message').value.trim();
    if(messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT',
            time: new Date().toLocaleTimeString()
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.querySelector('#message').value = '';
    }

}
function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    const messageElement = document.createElement('div');
    console.log(message+" tipooooo "+message.type);
    if(message.type === 'JOIN') {

        //messageElement.classList.add('event-message');
        //message.content = message.sender + ' joined!';
        //messageElement.innerHTML = message.content;
    } else if (message.type === 'LEAVE') {
        let butOnline = document.getElementById(message.sender+"-online");
        if(butOnline){
            butOnline.remove();
        }
    }
    else if(message.type==='IMAGE'){
        let img = new Image();
        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
        img.src = message.imagen;
    }else if(message.type==='POSITION'){

        if(message.sender != username) {
            const online = document.querySelector('.online');
            let personaOnline = document.getElementById(message.sender+"-online");
            if(personaOnline == null){
                personaOnline = document.createElement('div');
                personaOnline.id= message.sender+'-online';
                personaOnline.classList.add('persona-online');
                let personaDiv = document.createElement('div');
                personaDiv.classList.add('persona-img');
                let personaImg = document.createElement('img');
                personaImg.src = message.userImage;
                personaDiv.appendChild(personaImg);
                personaOnline.appendChild(personaDiv);
                let nombrePersona = document.createElement('div');
                nombrePersona.classList.add('nombre-persona');
                let p = document.createElement('p');
                p.innerText = message.name;
                nombrePersona.appendChild(p);
                personaOnline.appendChild(nombrePersona);
                let pointOnline = document.createElement('div');
                nombrePersona.appendChild(pointOnline);
                online.appendChild(personaOnline);
            }
            if(contextNombres[message.sender] == null) {
                let canvasNombre = document.createElement('canvas');
                let contextNombre = canvasNombre.getContext('2d');
                contextNombre.lineCap = 'round';
                contextNombre.globalCompositeOperation = 'destination-atop';
                canvasNombre.id = message.sender;
                canvasNombre.width = paintCanvas1.width;
                canvasNombre.height = paintCanvas1.height;
                main.appendChild(canvasNombre);
                contextNombres[message.sender] = contextNombre;
                console.log("Se a??adi?? LOOOL");
            }
        }
        if(username != message.sender){
            contextNombres[message.sender].globalCompositeOperation = 'destination-atop';
            contextNombres[message.sender].font = "10px Arial";
            contextNombres[message.sender].fillStyle = message.color;
            contextNombres[message.sender].fillText(message.name, message.x, message.y);
        }
    }else {
        if(message.sender === username) {
            messageElement.classList.add('mensaje-enviado');
            const msjTextSend = document.createElement('div');
            msjTextSend.classList.add('mensaje-texto-enviado');
            msjTextSend.innerText = message.content;
            messageElement.appendChild(msjTextSend);
        }else{
            /**/

            /**/
            messageElement.classList.add('mensaje-usuario');
            const otroUsuario = document.createElement('div');
            otroUsuario.classList.add('otro-usuario');
            const imagenUsuario = document.createElement('img');
            imagenUsuario.src = message.userImage;
            console.log(message.userImage);
            console.log("ESTA ES LA IMAGEN DEL USUARIO");
            const msjTextSend = document.createElement('div');
            msjTextSend.classList.add('mensaje-texto-otro');
            msjTextSend.innerText = message.content;
            otroUsuario.appendChild(imagenUsuario);
            messageElement.appendChild(otroUsuario);
            messageElement.appendChild(msjTextSend);
        }
    }

    document.querySelector('#messageList').appendChild(messageElement);
    document.querySelector('#messageList').scrollTop = document.querySelector('#messageList').scrollHeight;
}
const messageControls = document.querySelector('#message-controls')
messageControls.addEventListener('click', sendMessage, true)
const form = document.querySelector('#send')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})
