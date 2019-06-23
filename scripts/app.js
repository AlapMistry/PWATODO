// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker registered');
        })
}

// Add to Home Screen
let deferredPrompt, btnInstall = document.getElementById("btnInstall");

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