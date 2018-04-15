userPing(sessionStorage.getItem('username'), function() {
    showPage(true);
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
                location.replace(hostUrl + '/chat/' + chatId + sessionStorage.getItem('username'));
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
