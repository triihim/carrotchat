// Entrance page js code.

// If user already has a username given to him -> to lobby.
if(sessionStorage.getItem('username')) {
    //location.replace(hostUrl + '/lobby');
    userPing(sessionStorage.getItem('username'), () => {
        location.replace(hostUrl + '/lobby');
    });
} else {
    showPage(true);
    sessionStorage.clear();
};

let enterBtn = document.querySelector('button');

enterBtn.addEventListener('click', function() {
    // Show loader
    isLoading(true);
    
    // Ajax to fetch username -> save to sessionStorage.
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(this.response === 'ERROR') {
                isLoading(false);
                alert('Name generation error occurred. Try again later');
            } else {
                sessionStorage.setItem('username', this.responseText);
                isLoading(false);
                location.replace(hostUrl + '/lobby');
            }
        }
    };
    xhttp.open("GET", hostUrl + '/utils/generateuser', true);
    xhttp.send();
});

function isLoading(state) {
    let carrot = document.querySelector('svg');
    let enterBtn = document.querySelector('button');
    if(state === true) {
        carrot.classList.add('spin');
        enterBtn.innerHTML = 'Generating name...';
        enterBtn.disabled = true;
    } else {
        carrot.classList.remove('spin');
        enterBtn.innerHTML = 'Enter lobby';
        enterBtn.disabled = false;
    }
};

setTimeout(function() {
    alert('Notice! Test version only works properly on Google Chrome');
}, 500);
