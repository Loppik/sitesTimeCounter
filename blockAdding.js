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

chrome.storage.local.get("observedObj", function(result) {
    result["observedObj"].forEach(function(object) {
        addBlock(object.name, object.name);
    });
});

document.getElementById("addbtn").addEventListener("click", function() {
    var id = "vk";
    var description = "vk";
    addBlock(id, description);
});