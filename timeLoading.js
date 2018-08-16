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


document.getElementById("youtube").style.backgroundColor = "red";

chrome.storage.local.get("observedObj", function(result) {
    if (!result["observedObj"]) {
        console.log("create array");
        chrome.storage.local.set({ observedObj: [] });
    } else if(result["observedObj"].length > 0) {
        console.log(result["observedObj"][0].name);
    } else {
        console.log("empty array");
    }
});

/*
chrome.storage.local.get(updateTarget, function(result) {
    console.log(result[updateTarget]);
});
*/