console.log("asdfasf");

function updateTime(time) {
    var oneHour = 3600000;
    var oneMinute = 60000;
    var oneSecond = 1000;

    var hours = parseInt(document.querySelector(".hours").innerHTML);
    var minutes = parseInt(document.querySelector(".minutes").innerHTML);
    var seconds = parseInt(document.querySelector(".seconds").innerHTML);
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

    document.querySelector(".hours").innerHTML = hours;
    document.querySelector(".minutes").innerHTML = minutes;
    document.querySelector(".seconds").innerHTML = seconds;
}

var port = chrome.extension.connect({
    name: "Sample Connection"
});

port.onMessage.addListener(function(msg) {
    console.log("message recieved: " + msg.msg + ", time: " + msg.time);
    if (msg.msg == "updateTime") {
        var time = msg.time;
        updateTime(time);
    }

    response = {
        msg: "Time updated successfully",
        status: "OK"
    }
    port.postMessage(response);
});


