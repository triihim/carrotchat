// Join user to chat with ajax.
// Load chat data with ajax 
// -> after remove loader.

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

function renderChat(chatData) {
    let topicField = document.querySelector('.topic');
    let creationField = document.querySelector('.creation');
    let chattersField = document.querySelector('.chatters');
    console.log(chatData);
    showPage(true);
};

loadChatData(
    document.querySelector('#chat-view').dataset.id,
    sessionStorage.getItem('username'),
    renderChat
);