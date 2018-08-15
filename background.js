var addictionPage = false;
var startTime = null;
var endTime = null;
var urlOfLastTab;
var observedUrls = ["vk.com", "www.youtube.com"];

/* Listener of messages from content script 
chrome.browserAction.onClicked.addListener(function() {
    msg = {
        "selector": selector,
        "time": time
    }
    chrome.tabs.sendMessage(tab.id, msg);
})
*/

console.log("back started");

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        endTime = new Date();
        addictionPage = false;
        var url = tabs[0].url;
        observedUrls.forEach(function(observedUrl) {
            if (urlOfLastTab == observedUrl) {
                if (startTime != null) {
                    timeUpdate(urlOfLastTab, startTime, endTime);
                }
            }
        });
        observedUrls.forEach(function(observedUrl) {
            if (url.search(new RegExp(observedUrl)) != -1) {
                alert(observedUrl);
                addictionPage = true;
                urlOfLastTab = observedUrl;
            }
        });

        if (addictionPage) {
            startTime = new Date();
        } else {
            if (startTime != null) {
                timeUpdate(urlOfLastTab, startTime, endTime);
                startTime = null;
            }
        }
    });
});

function timeUpdate(urlOfLastTab, startTime, endTime) {
    if (urlOfLastTab == "vk.com") {
        sendMessage("vk", endTime.getTime() - startTime.getTime())
    }
    if (urlOfLastTab == "www.youtube.com") {
        sendMessage("youtube", endTime.getTime() - startTime.getTime())
    }
}

function sendMessage(target, time) {
    var msg = {
        msg: "updateTime",
        updateTarget: target,
        time: time
    }

    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.postMessage(msg);
        console.log("message sended");
        port.onMessage.addListener(function(msg) {
            console.log(msg.msg + " .... " + msg.status);
        });
    });
    
    /* Send message to content script
    msg = {
        selector: selector,
        time: time
    }
    chrome.tabs.sendMessage(tab.id, msg);
    alert("-")
    */
}
