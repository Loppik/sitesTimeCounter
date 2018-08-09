var addictionPage = false;
var startTime = null;
var endTime = null;
var urlOfLastTab;
var observedUrls = ["vk.com", "www.youtube.com"];

/* Listener of messages from content script 
chrome.browserAction.onClicked.addListener(function() {
    alert("suka")
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
            if (url.search(new RegExp(observedUrl)) != -1) {
                alert(observedUrl);
                addictionPage = true;
                urlOfLastTab = observedUrl;
                break;
            }
        });

        if (addictionPage) {
            if (startTime != null) {
                observedUrls.forEach(function(observedUrl) {
                    if (urlOfLastTab == observedUrl) {

                    }
                });
                if (urlOfLastTab == "vk.com") {
                    sendMessage("vkTime", endTime.getTime() - startTime.getTime())
                }
                if (urlOfLastTab == "https://www.youtube.com") {
                    sendMessage("youtubeTime", endTime.getTime() - startTime.getTime())
                }
            }
            startTime = new Date();
        } else {
            if (startTime != null) {
                if (urlOfLastTab == "https://vk.com") {
                    sendMessage("vkTime", endTime.getTime() - startTime.getTime())
                }
                if (urlOfLastTab == "https://www.youtube.com") {
                    sendMessage("youtubeTime", endTime.getTime() - startTime.getTime())
                }
                startTime = null;
            }
        }
    });
});

function sendMessage(updateTarget, time) {
    var msg = {
        msg: "updateTime",
        updateTarget: updateTarget,
        time: time
    }

    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.postMessage(msg);
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
