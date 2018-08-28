function updateTimeInBrowserStorage(updateTarget, time) {
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;

    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            if (object.name == updateTarget) {
                while(time >= oneHour) {
                    time -= oneHour;
                    object.hours += 1;
                }
            
                while(time >= oneMinute) {
                    time -= oneMinute;
                    object.minutes += 1
                }
                if (object.minutes > 59) {
                    object.minutes -= 60;
                    object.hours += 1;
                }
            
                while(time >= oneSecond) {
                    time -= oneSecond;
                    object.seconds += 1;
                }
                if (object.seconds > 59) {
                    object.seconds -= 60;
                    object.minutes += 1;
                }
            }
        });
        console.log("Saved: ");
        console.log(result["observedObj"]);
        chrome.storage.local.set({"observedObj": result["observedObj"]});
    });
}

function updateTimeInPopUp(updateTarget) {
    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            if (object.name == updateTarget) {
                console.log(object);
                var target = document.getElementById(updateTarget);
                target.querySelector(".hours").innerHTML = object.hours;
                target.querySelector(".minutes").innerHTML = object.minutes;
                target.querySelector(".seconds").innerHTML = object.seconds;
            }
        });
    });
}

/*
async function checkNeedResetTimeCounter() {
    var res = chrome.storage.local.get("dayOfLastReset", function(result) {
        console.log(result["dayOfLastReset"]);
        if (new Date().getDate() > result["dayOfLastReset"]) {
            return true;
        } 
        return false;
    });
    res.then(function(value) {
        console.log(value);
    }, function(error) {
        console.log(error);
    });
}
*/   

function resetTimeCounter() {
    console.log("time reset");
    var newTime = {
        hours: 0,
        minutes: 0,
        seconds: 0  
    };
    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            object.time = newTime;
        });
    });
}

chrome.storage.local.get("dayOfLastReset", function(result) {
    if (result["dayOfLastReset"]) {
        chrome.storage.local.get("dayOfLastReset", function(result) {
            console.log(result["dayOfLastReset"]);
            if (new Date().getDate() > result["dayOfLastReset"]) {
                resetTimeCounter();
                chrome.storage.local.set({ "dayOfLastReset": new Date().getDate() });
            } 
        });
    } else {
        chrome.storage.local.set({ "dayOfLastReset": new Date().getDate() });
    }
});

var port = chrome.extension.connect({
    name: "Simple Connection"
});

port.onMessage.addListener(function(msg) {
    console.log("message recieved: " + msg.msg + ", target: " + msg.updateTarget + ", time: " + msg.time);
    if (msg.msg == "updateTime") {
        updateTimeInBrowserStorage(msg.updateTarget, msg.time);
        updateTimeInPopUp(msg.updateTarget);
    }

    response = {
        msg: "Time updated successfully",
        status: "OK"
    }
    port.postMessage(response);
});


