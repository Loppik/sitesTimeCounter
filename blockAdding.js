chrome.storage.local.get("observedObj", function(result) {
    result["observedObj"].forEach(function(object) {
        addBlock(object.name, object.name);
    });
});

document.getElementById("addbtn").addEventListener("click", function() {
    var id = description = document.getElementById("name_new_block").value;
    addBlock(id, description);
    var url = document.getElementById("url_new_block").value;
    addObservedObj(description, url);
    sendMessageUpdateObservedObj();
});

function addBlock(id, description) {
    var blockContainer = document.getElementById("block_container");
    blockContainer.innerHTML += '<div class="block" id="' + id +'">' +
                                    '<div class="title">' + description + '</div>' +
                                    '<div class="watch">' +
                                        '<p class="hours">0</p>' + 
                                        '<p class="separator">:</p>' +
                                        '<p class="minutes">0</p>' +
                                        '<p class="separator">:</p>' +
                                        '<p class="seconds">0</p>' +
                                    '</div>' +
                                '</div>';
};

function addObservedObj(name, url) {
    var observedObj = {
        name: name,
        url: url,
        time: "0:0:0"
    };
    chrome.storage.local.get("observedObj", function(result) {
        result["observedObj"].push(observedObj);
        chrome.storage.local.set({ observedObj: result["observedObj"] });
    });
}

function sendMessageUpdateObservedObj() {
    var port = chrome.extension.connect({
        name: "Simple Connection"
    });
    var msg = {
        msg: "updateObservedObj"
    }
    port.postMessage(msg);
} 