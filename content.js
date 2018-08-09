console.log("content script started");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.time);
    /*var oldTime = parseInt(document.querySelector(".vkTime").innerText);
    document.querySelector("vkTime").innerText = oldTime + 12;*/
}