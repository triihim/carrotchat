function pingToChat(chatId, username) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText === '0') {
                location.reload(hostUrl);
            };
        };
    };
    xhttp.open('GET', hostUrl + '/ping/chat/' + chatId + '/' + username, true);
    xhttp.send();
};

function joinChat(chatId, username) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText === '0') location.reload(hostUrl + '/lobby');
        };
    };
    xhttp.open('GET', hostUrl + '/chat/join/' + chatId + '/' + username, true);
    xhttp.send();
};

function loadChatData(chatId, username, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText.length > 0) {
                callback(JSON.parse(this.responseText));
            } else {
                location.replace(hostUrl + '/lobby');
            };
        }
    };
    xhttp.open("GET", hostUrl + '/chat/fetch/' + chatId + '/' + username, true);
    xhttp.send(); 
};

function createMessage(msg) {

    // Container.
    let container = document.createElement('div');
    container.className = 'message';

    // Sender.
    let sender = document.createElement('h5');
    sender.innerHTML = msg.sender + ': ';
    let dateTime = document.createElement('span');
    dateTime.innerHTML = msg.sendDate;
    sender.appendChild(dateTime);

    // Message.
    let message = document.createElement('p');
    message.innerHTML = msg.message;
    
    container.appendChild(sender);
    container.appendChild(message);
    
    return container;
    
};

function renderChat(chatData) {
    let topicField = document.querySelector('.topic');
    let creationField = document.querySelector('.creation');
    let chattersField = document.querySelector('.chatters');
    let messageField = document.querySelector('#message-area');

    topicField.innerHTML = chatData.topic;
    creationField.innerHTML = chatData.creationDate;
    chattersField.innerHTML = 'Chatters: ' + chatData.chatters.length;

    chatData.messages.forEach(msg => {
        messageField.appendChild(createMessage(msg));
    });

    showPage(true);
};

function sendMessage(msg, callback) {
    let chatId = document.querySelector('#chat-view').dataset.id;
    let sender = sessionStorage.getItem('username');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            callback()
        };
    };
    xhttp.open('POST', hostUrl + '/chat/msg', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('chatId=' + chatId + '&sender=' + sender + '&msg=' + msg);
};

joinChat(
    document.querySelector('#chat-view').dataset.id,
    sessionStorage.getItem('username')
);

loadChatData(
    document.querySelector('#chat-view').dataset.id,
    sessionStorage.getItem('username'),
    renderChat
);

setInterval(() => {
    pingToChat(
        document.querySelector('#chat-view').dataset.id,
        sessionStorage.getItem('username')
    )
}, pingInterval)

let sendBtn = document.querySelector('.sendBtn');
let msgInput = document.querySelector('.msgInput');
sendBtn.addEventListener('click', function() {
    let msg = msgInput.value;
    if(msg.length > 0 && msg.length <= 100) {
        sendMessage(msg, () => {
            console.log('THIS IS SEND MESSAGE CALLBACK');
        });
    }
});