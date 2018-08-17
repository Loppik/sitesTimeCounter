/*
var updateTarget = "youtube";
var target = document.getElementById(updateTarget);
var hours = target.querySelector(".hours").innerHTML;
var minutes = target.querySelector(".minutes").innerHTML;
var seconds = target.querySelector(".seconds").innerHTML;
var obj = {};
obj[updateTarget] = hours + ":" + minutes + ":" + seconds;
chrome.storage.local.set(obj, function() {
    console.log("data was saved");
});
*/

// var observedUrls = ["vk.com", "www.youtube.com"];

/*
var observedObj = [];
var youtube = {
    name: "youtube",
    url: "www.youtube.com",
    time: "0:0:0"
};
observedObj.push(youtube);

chrome.storage.local.set({ observedObj: observedObj });
*/
// chrome.storage.local.remove("observedObj");
// chrome.storage.local.set({ observedObj: [] });

/*
var youtube = {
    name: "youtube",
    url: "www.youtube.com",
    time: "0:0:0"
};
chrome.storage.local.get("observedObj", function(result) {
    result["observedObj"].push(youtube);
    chrome.storage.local.set({ observedObj: result["observedObj"] });
});
*/

chrome.storage.local.get("observedObj", function(result) {
    if(result["observedObj"].length > 0) {
        console.log(result["observedObj"]);
    } else {
        console.log("empty array");
    }
});

/*
chrome.storage.local.get(updateTarget, function(result) {
    console.log(result[updateTarget]);
});
*/