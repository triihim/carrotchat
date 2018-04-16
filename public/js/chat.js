function pingToChat(chatId, username) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        };
    };
    xhttp.open('GET', hostUrl + '/ping/chat/' + chatId + '/' + username, true);
    xhttp.send();
};

function joinChat(chatId, username) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        };
    };
    xhttp.open('GET', hostUrl + '/chat/join/' + chatId + '/' + username, true);
    xhttp.send();
};

function loadChatData(chatId, username, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
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
    dateTime.innerHTML = msg.dateTime;
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

joinChat(
    document.querySelector('#chat-view').dataset.id,
    sessionStorage.getItem('username')
);

loadChatData(
    document.querySelector('#chat-view').dataset.id,
    sessionStorage.getItem('username'),
    renderChat
);


