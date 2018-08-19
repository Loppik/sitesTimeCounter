console.log("asdfasf");

function updateTime(updateTarget, time) {
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;
    var target = document.getElementById(updateTarget);

    var hours = parseInt(target.querySelector(".hours").innerHTML);
    var minutes = parseInt(target.querySelector(".minutes").innerHTML);
    var seconds = parseInt(target.querySelector(".seconds").innerHTML);
    while(time >= oneHour) {
        time -= oneHour;
        hours += 1;
    }

    while(time >= oneMinute) {
        time -= oneMinute;
        minutes += 1
    }
    if (minutes > 59) {
        minutes -= 60;
        hours += 1;
    }

    while(time >= oneSecond) {
        time -= oneSecond;
        seconds += 1;
    }
    if (seconds > 59) {
        seconds -= 60;
        minutes += 1;
    }

    target.querySelector(".hours").innerHTML = hours;
    target.querySelector(".minutes").innerHTML = minutes;
    target.querySelector(".seconds").innerHTML = seconds;
}

function updateTimeInBrowserStorage(updateTarget) {
    var target = document.getElementById(updateTarget);
    var hours = target.querySelector(".hours").innerHTML;
    var minutes = target.querySelector(".minutes").innerHTML;
    var seconds = target.querySelector(".seconds").innerHTML;
    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].forEach(function(object) {
            if (object.name == updateTarget) {
                object.time = {
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                };
            }
        });
        chrome.storage.local.set({"observedObj": result["observedObj"]});
    });
}

var port = chrome.extension.connect({
    name: "Simple Connection"
});

port.onMessage.addListener(function(msg) {
    console.log("message recieved: " + msg.msg + ", target: " + msg.updateTarget + ", time: " + msg.time);
    if (msg.msg == "updateTime") {
        updateTime(msg.updateTarget, msg.time);
        // updateTimeInBrowserStorage(msg.updateTarget);
    }

    response = {
        msg: "Time updated successfully",
        status: "OK"
    }
    port.postMessage(response);
});


