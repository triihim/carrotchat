// JS code shared with every page.
var hostUrl = 'https://carrot-chat.herokuapp.com'; // 'http://localhost:3000'; 
var pingInterval = 5000; // ms.

if(sessionStorage.getItem('username')) {

    let username = sessionStorage.getItem('username');

    // Initial ping immediately on page arrival.
    // If sessionStorage username has been deleted from db
    // => redirects immediately to the entry page.
    userPing(username);

    // Ping to maintain username.
    setInterval(function() {
        userPing(username);
    }, pingInterval)

};

function userPing(username, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText === '0') {
                console.log('PING RETURNED 0')
                sessionStorage.clear();
                location.replace(hostUrl);
            } else if(typeof callback === 'function') {
                callback();
            }
        }
    };
    xhttp.open("GET", hostUrl + '/ping/user/' + username, true);
    xhttp.send(); 
};

// Page-wide function to toggle between loader and page content.
function showPage(show) {
    let loader = document.querySelector('.page-loader');
    let content = document.querySelector('.page-content');

    if(document.querySelector('#username')) {
        if(sessionStorage.getItem('username')) {
            document.querySelector('#username').innerHTML = sessionStorage.getItem('username');
        };
    };

    if(show === true) {
        loader.style.display = 'none';
        content.style.display = 'block';
    } else {
        loader.style.display = 'block';
        content.style.display = 'none';
    }
};