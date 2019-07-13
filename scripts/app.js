// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker registered');
        })
}

// Add to Home Screen
let deferredPrompt, btnInstall = document.getElementById("btnInstall")
btnNotification = document.querySelectorAll('#btnNotification');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log("beforeinstallprompt");
    // For Chrome 67 or earlier
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.removeAttribute("hidden");
});
btnInstall.addEventListener("click", function() {
    btnInstall.setAttribute("hidden", ""),
    deferredPrompt.prompt(),
    deferredPrompt.userChoice.then(function (t) {
        if ("accepted" === t.outcome) {
            console.log("User accepted the A2HS prompt");
        } else {
            console.log("User denied the A2HS prompt");
        }
        deferredPrompt = null;
    });
});

function askForNotification() {
    Notification.requestPermission(function (result) {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted.');
        } else {
            displayConfirmNotification();
        }
    });
}

function displayConfirmNotification() {
    console.log('Successfully subscribed.');
    let options = {
        body: 'Hello Alap\nHi',
        icon: './images/icons/icon-big.png'
    };
    // For Android Google Chrome
    navigator.serviceWorker.ready.then(function (registeration) {
        registeration.showNotification("Successfully subscribed", options);
    });
    // For Desktop (Google Chrome, Firefox), Mobile (Firefox)
    //new Notification("Successfully subscribed", options);
}

if('Notification' in window) {
    console.log('Notification supported.');
    for (var i = 0; i < btnNotification.length; i++) {
        btnNotification[i].style.display = 'inline-block';
        btnNotification[i].addEventListener('click', askForNotification);
    }
}