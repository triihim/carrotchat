function fetchChats(callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET", hostUrl + '/chat/fetch', true);
    xhttp.send(); 
};

function renderChats(chats) {
    let container = document.querySelector('#chats');
    if(chats.length < 1) {
        let msg = document.createElement('h2');
        msg.className = 'center-text';
        msg.innerHTML = 'No chats exist at the moment :(<br />Start by creating one!';
        container.appendChild(msg);
    };
    chats.forEach(chat => {
        let chatbox = document.createElement('div');
        chatbox.className = 'chatbox';
        chatbox.dataset.id = chat._id;
        chatbox.addEventListener('click', () => {
            location.replace(hostUrl + '/chat/' + chat._id + '/' + sessionStorage.getItem('username'));
        });
        let topic = document.createElement('h3');
        topic.innerHTML = chat.topic;
        let created = document.createElement('p');
        created.innerHTML = chat.creationDate;
        chatbox.appendChild(topic);
        chatbox.appendChild(created);
        container.appendChild(chatbox);
    });
};

userPing(sessionStorage.getItem('username'), function() {
    fetchChats((chats) => {
        renderChats(chats);
        showPage(true);
    });
});

function validateTopic(topic) {
    if(topic.length > 0 && topic.length <= 30) {
        return true;
    } else {
        return false 
    };
}; 

function createChat(topic, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText !== '0') {
                let chatId = this.responseText;
                callback(true, chatId);
            } else {
                callback(false);
            }
            
        }
    };
    xhttp.open('POST', hostUrl + '/utils/createchat', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('topic=' + topic + '&creator=' + sessionStorage.getItem('username'));
};

function isCreating(creating) {
    if(creating === true) {
        document.querySelector('#topicInput').value = 'Creating...';
        document.querySelector('#topicInput').disabled = true;
        document.querySelector('#okBtn').disabled = true;
    } else {
        document.querySelector('#topicInput').value = '';
        document.querySelector('#topicInput').disabled = false;
        document.querySelector('#okBtn').disabled = false;
    };
};

document.querySelector('#okBtn').addEventListener('click', () => {
    let topic = document.querySelector('#topicInput').value;
    let errorDiv = document.querySelector('#control-error');

    if(validateTopic(topic) === true) {
        isCreating(true);
        errorDiv.style.display = 'none';
        createChat(topic, function(result, chatId) {
            if(result === true) {
                isCreating(false);
                location.replace(hostUrl + '/chat/' + chatId + '/' + sessionStorage.getItem('username'));
            } else {
                isCreating(false);
                console.log('Chatin luonti epäonnistui');
            };
        });
    } else {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = "Invalid topic";
    }
});
