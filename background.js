var addictionPage = false;
var startTime = null;
var endTime = null;
var urlOfLastTab;
var observedObj = loadObservedObj();

/* Listener of messages from content script 
chrome.browserAction.onClicked.addListener(function() {
    msg = {
        "selector": selector,
        "time": time
    }
    chrome.tabs.sendMessage(tab.id, msg);
})
*/

/* Send message to content script
msg = {
    selector: selector,
    time: time
}
chrome.tabs.sendMessage(tab.id, msg);
alert("-")
*/

console.log("back started");

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        endTime = new Date();
        addictionPage = false;
        var url = tabs[0].url;
        observedObj.forEach(function(object) {
            if (urlOfLastTab == object.url) {
                if (startTime != null) {
                    timeUpdate(urlOfLastTab, startTime, endTime);
                }
            }
        });
        observedObj.forEach(function(object) {
            if (url.search(new RegExp(object.url)) != -1) {
                alert(object.name);
                addictionPage = true;
                urlOfLastTab = object.url;
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
    /* Нрмально, вернуть!
    observedObj.forEach(function(object) {
        if (urlOfLastTab == object.url) {
            
        }
    });
    */
   console.log("last url: " + urlOfLastTab);
    if (urlOfLastTab == "vk.com") {
        updateTimeInBrowserStorage("vk", endTime.getTime() - startTime.getTime())
    }
    if (urlOfLastTab == "www.youtube.com") {
        updateTimeInBrowserStorage("youtube", endTime.getTime() - startTime.getTime())
    }
}


    
    


function loadObservedObj () {
    chrome.storage.local.get("observedObj", function(result) {
        if (!result["observedObj"]) {
            chrome.storage.local.set({ observedObj: [] });
            observedObj = [];
        } else if(result["observedObj"].length > 0) {
            observedObj = result["observedObj"];
        } else {
            observedObj = [];
        }
    });
    return observedObj;
}

function updateTimeInBrowserStorage(updateTarget, time) {
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;

    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            if (object.name == updateTarget) {
                while(time >= oneHour) {
                    time -= oneHour;
                    object.time.hours += 1;
                }
            
                while(time >= oneMinute) {
                    time -= oneMinute;
                    object.time.minutes += 1
                }
                if (object.time.minutes > 59) {
                    object.time.minutes -= 60;
                    object.time.hours += 1;
                }
            
                while(time >= oneSecond) {
                    time -= oneSecond;
                    object.time.seconds += 1;
                }
                if (object.time.seconds > 59) {
                    object.time.seconds -= 60;
                    object.time.minutes += 1;
                }
            }
        });
        console.log("Saved: ");
        console.log(result["observedObj"]);
        chrome.storage.local.set({"observedObj": result["observedObj"]});
    });
    chrome.storage.local.get("observedObj", function(result) {
        console.log("after save: ");
        console.log(result["observedObj"]);
    });
}
