var clicks = 0;
const storageCache = { click_count: 0 };
var cacheLoaded = false;

getStorageAsync();
document.addEventListener("click", (event) => {
    onClick();
});
// If tab is revisited, retreive storage again
document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
        getStorageAsync();
    }
});

let _original_stopPropogation = Event.prototype.stopPropagation;
Event.prototype.stopPropagation = function (...args) {
    onClick();
    return _original_stopPropogation.apply(this, args);
};

async function onClick(){
    clicks++;
    console.log(clicks)
    if (cacheLoaded){
        await browser.storage.local.set({ "click_count" : clicks });
    }
    browser.runtime.sendMessage({updatedClicks : clicks});
    window.postMessage({
        id: "updatedClicks",
        clicks: clicks
    });
}

async function getStorageAsync(){
    var items = await browser.storage.local.get();
    console.log("Initial clicks : " + items.click_count);

    if (items){
        Object.assign(storageCache, items);
    }
    clicks = parseInt(storageCache.click_count);
    browser.runtime.sendMessage({updatedClicks : clicks});
    cacheLoaded = true;

    // In case the website is listening
    window.postMessage({
        id: "updatedClicks",
        clicks: clicks
    });
}

// Listens to the website's request to get click count
window.addEventListener("message", (event) => {
    if (event.data.id == "getClicks"){
        window.postMessage({
            id: "updatedClicks",
            clicks: clicks
        });
    }
});
