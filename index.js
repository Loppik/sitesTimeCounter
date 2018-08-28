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


