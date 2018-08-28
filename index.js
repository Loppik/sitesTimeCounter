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

function updateTimeInPopUp(updateTarget) {
    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            if (object.name == updateTarget) {
                console.log(object);
                var target = document.getElementById(updateTarget);
                target.querySelector(".hours").innerHTML = object.time.hours;
                target.querySelector(".minutes").innerHTML = object.time.minutes;
                target.querySelector(".seconds").innerHTML = object.time.seconds;
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
        chrome.storage.local.set({"observedObj": result["observedObj"]});
    });
}

chrome.storage.local.get("dayOfLastReset", function(result) {
    if (result["dayOfLastReset"]) {
        chrome.storage.local.get("dayOfLastReset", function(result) {
            console.log(new Date().getDate() + " > " + result["dayOfLastReset"]);
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


